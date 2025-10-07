import { Navigation } from "@/components/Navigation";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SAMPLE_POSTS = [
  {
    username: "ProGamer2024",
    game: "Valorant",
    content: "Just hit Radiant! The grind was real but we made it! 🔥",
    likes: 234,
    comments: 45,
    timestamp: "2h ago",
    badge: "Top Ranked",
  },
  {
    username: "StreamQueen",
    game: "Fortnite",
    content: "Epic Victory Royale with the squad! Check out the clip on my profile 🏆",
    likes: 189,
    comments: 32,
    timestamp: "4h ago",
    badge: "Streamer",
  },
  {
    username: "TacticalMind",
    game: "COD",
    content: "New loadout is insane! Who else is loving the new season?",
    likes: 156,
    comments: 28,
    timestamp: "6h ago",
  },
];

const Feed = () => {
  return (
    <div className="min-h-screen bg-background">
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

          <CreatePost />

          <div className="space-y-4">
            {SAMPLE_POSTS.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
