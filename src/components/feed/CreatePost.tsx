import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Image, Video, Trophy } from "lucide-react";

export const CreatePost = () => {
  return (
    <Card className="glow-primary">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Share your epic gaming moment..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Image className="h-4 w-4" />
                  Image
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Video className="h-4 w-4" />
                  Clip
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Achievement
                </Button>
              </div>
              <Button className="glow-primary">Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
