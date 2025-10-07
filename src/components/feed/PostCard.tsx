import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  username: string;
  avatar?: string;
  game?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  badge?: string;
}

export const PostCard = ({
  username,
  avatar,
  game,
  content,
  image,
  likes,
  comments,
  timestamp,
  badge,
}: PostCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
            {username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">{username}</h3>
            {badge && (
              <Badge variant="secondary" className="gap-1">
                <Trophy className="h-3 w-3" />
                {badge}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {game && <span className="text-primary font-medium">#{game}</span>}
            <span>•</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">{content}</p>
        {image && (
          <div className="rounded-lg overflow-hidden bg-muted">
            <img src={image} alt="Post content" className="w-full object-cover max-h-96" />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button variant="ghost" size="sm" className="gap-2 flex-1 hover:text-primary">
          <Heart className="h-4 w-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-1 hover:text-primary">
          <MessageCircle className="h-4 w-4" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-1 hover:text-primary">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};
