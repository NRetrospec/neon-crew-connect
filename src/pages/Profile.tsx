import { Navigation } from "@/components/Navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PostCard } from "@/components/feed/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SAMPLE_USER_POSTS = [
  {
    username: "ProGamer2024",
    game: "Valorant",
    content: "Just hit Radiant! The grind was real but we made it! 🔥",
    likes: 234,
    comments: 45,
    timestamp: "2h ago",
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <ProfileHeader
            username="ProGamer2024"
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
