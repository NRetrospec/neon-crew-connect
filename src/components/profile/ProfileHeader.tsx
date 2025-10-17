import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Calendar, Camera } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

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
  const { updateProfileBackground, updateProfileAvatar, user } = useUser();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colorOptions = {
    red: ['#DC143C', '#FF6347', '#B22222', '#FA8072'],
    blue: ['#87CEEB', '#4169E1', '#000080', '#1E90FF'],
    yellow: ['#FFD700', '#F0E68C', '#FFFACD', '#FAFAD2']
  };

  const animatedOptions = [
    { name: 'Neon Flow', class: 'neon-flow', preview: 'Gradient animation' },
    { name: 'Aurora', class: 'aurora', preview: 'Soft aurora effect' },
    { name: 'Waves', class: 'waves', preview: 'Floating blobs' },
    { name: 'Particles', class: 'particles', preview: 'Interactive particles' }
  ];

  const handleColorSelect = (color: string) => {
    updateProfileBackground({ type: 'color', value: color });
    setIsEditOpen(false);
  };

  const handleAnimatedSelect = (theme: string) => {
    updateProfileBackground({ type: 'animated', value: theme });
    setIsEditOpen(false);
  };

  const handleReset = () => {
    updateProfileBackground({ type: 'default' });
    setIsEditOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateProfileAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
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
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={avatar || user?.avatar} />
              <AvatarFallback
                className="text-2xl font-black text-white"
                style={{ backgroundColor: themeColor }}
              >
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isHovered && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer transition-opacity duration-200"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

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
                <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>Edit Profile</Button>
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

    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Personalize Your Profile Background</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="colors">Color Picker</TabsTrigger>
            <TabsTrigger value="animated">Animated Themes</TabsTrigger>
          </TabsList>
          <TabsContent value="colors" className="space-y-4">
            {Object.entries(colorOptions).map(([group, colors]) => (
              <div key={group} className="space-y-2">
                <h4 className="capitalize font-medium">{group}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant="ghost"
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="animated" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {animatedOptions.map((theme) => (
                <Card key={theme.name} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleAnimatedSelect(theme.name)}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-full h-16 rounded mb-2 ${theme.class === 'particles' ? 'bg-gray-200' : theme.class}`} style={theme.class === 'particles' ? {} : {}}></div>
                    <h5 className="font-medium">{theme.name}</h5>
                    <p className="text-sm text-muted-foreground">{theme.preview}</p>
                    <Button size="sm" className="mt-2">Apply</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>Reset to Default</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};
