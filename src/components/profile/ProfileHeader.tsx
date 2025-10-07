import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
  avatar?: string;
  favoriteGame?: string;
  themeColor?: string;
  joinDate?: string;
  followers?: number;
  following?: number;
  achievements?: number;
}

export const ProfileHeader = ({
  username,
  avatar,
  favoriteGame,
  themeColor = "#CB5E77",
  joinDate = "January 2024",
  followers = 0,
  following = 0,
  achievements = 0,
}: ProfileHeaderProps) => {
  return (
    <Card className="overflow-hidden">
      {/* Cover Banner */}
      <div
        className="h-32 relative"
        style={{
          background: `linear-gradient(135deg, ${themeColor}40, ${themeColor}20)`,
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzhCNUI3RSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-30" />
      </div>

      <CardContent className="relative pb-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 relative z-10">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={avatar} />
            <AvatarFallback
              className="text-2xl font-black text-white"
              style={{ backgroundColor: themeColor }}
            >
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 sm:pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl font-black">{username}</h1>
                {favoriteGame && (
                  <Badge
                    variant="secondary"
                    className="mt-1"
                    style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                  >
                    {favoriteGame} Player
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit Profile</Button>
                <Button size="sm" style={{ backgroundColor: themeColor }}>
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{followers}</div>
            </div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{following}</div>
            </div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{achievements}</div>
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Joined {joinDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};
