import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PostCard } from "@/components/feed/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";

const SAMPLE_USER_POSTS = [
  {
    id: "1",
    username: "ProGamer2024",
    game: "Valorant",
    content: "Just hit Radiant! The grind was real but we made it! 🔥",
    likes: 234,
    comments: [],
    timestamp: "2h ago",
    onLike: (id: string) => {},
    onAddComment: (id: string, commentText: string) => {},
    isLiked: false,
  },
];

const Profile = () => {
  const { user } = useUser();

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

  return (
    <div className={bgProps.className} style={bgProps.style} id={bgProps.id}>
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <ProfileHeader
            username={user?.name || "ProGamer2024"}
            avatar={user?.avatar}
            favoriteGame="Valorant"
            themeColor="#CB5E77"
            followers={1234}
            following={567}
            achievements={42}
          />

          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {SAMPLE_USER_POSTS.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </TabsContent>

            <TabsContent value="achievements">
              <div className="text-center py-12 text-muted-foreground">
                Achievements coming soon...
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="text-center py-12 text-muted-foreground">
                Gaming stats coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
