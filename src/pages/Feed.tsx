import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

const Feed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(() => JSON.parse(localStorage.getItem("likedPosts") || "[]"));

  const getBackgroundStyle = () => {
    if (!user?.profileBackground || user.profileBackground.type === 'default') {
      return { className: "min-h-screen bg-background", style: {}, id: undefined };
    }
    if (user.profileBackground.type === 'color') {
      return { className: "min-h-screen", style: { backgroundColor: user.profileBackground.value, minHeight: '100vh' }, id: undefined };
    }
    if (user.profileBackground.type === 'animated') {
      const classMap: Record<string, string> = {
        'Neon Flow': 'neon-flow',
        'Aurora': 'aurora',
        'Waves': 'waves',
        'Particles': 'particles'
      };
      const id = user.profileBackground.value === 'Particles' ? 'particles-js' : undefined;
      return { className: `min-h-screen ${classMap[user.profileBackground.value!] || ''}`, style: {}, id };
    }
    return { className: "min-h-screen bg-background", style: {}, id: undefined };
  };

  const bgProps = getBackgroundStyle();

  useEffect(() => {
    if (user?.profileBackground?.type === 'animated' && user.profileBackground.value === 'Particles') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = () => {
        if ((window as any).particlesJS) {
          (window as any).particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: '#ffffff' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: false },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
              move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
              detect_on: 'canvas',
              events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
              modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
          });
        }
      };
      document.head.appendChild(script);
      return () => {
        if (document.head.contains(script)) document.head.removeChild(script);
        const canvas = document.getElementById('particles-js');
        if (canvas) canvas.innerHTML = '';
      };
    }
  }, [user?.profileBackground]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const addPost = (content) => {
    if (!user) return;
    const newPost = {
      username: user.name,
      content,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };
    fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((createdPost) => setPosts((prev) => [createdPost, ...prev]))
      .catch((err) => console.error("Failed to create post:", err));
  };

  const handleLike = async (id) => {
    try {
      if (likedPosts.includes(id)) {
        console.log("Already liked this post");
        return;
      }

      const res = await fetch(`http://localhost:3001/api/posts/${id}/like`, {
        method: "PATCH",
      });
      const updatedPost = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));

      // Save liked post id to localStorage and state
      const newLikedPosts = [...likedPosts, id];
      setLikedPosts(newLikedPosts);
      localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleAddComment = async (id, commentText) => {
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.name, content: commentText }),
      });
      const newComment = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comments: [...p.comments, newComment] } : p)));
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className={bgProps.className} style={bgProps.style} id={bgProps.id}>
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black">Community Feed</h1>
            <Tabs defaultValue="trending">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {user && <CreatePost addPost={addPost} />}

          <div className="space-y-4">
            {posts.map((post, index) => {
              const timeAgo = getTimeAgo(new Date(post.timestamp));
              return <PostCard key={post.id || index} {...post} comments={post.comments} timestamp={timeAgo} onLike={handleLike} onAddComment={handleAddComment} isLiked={likedPosts.includes(post.id)} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
