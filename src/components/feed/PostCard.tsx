import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CommentModal } from "@/components/feed/CommentModal";

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

interface PostCardProps {
  id: string;
  username: string;
  avatar?: string;
  game?: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  badge?: string;
  onLike: (id: string) => void;
  onAddComment: (id: string, commentText: string) => void;
  isLiked: boolean;
}

export const PostCard = ({
  id,
  username,
  avatar,
  game,
  content,
  image,
  likes,
  comments,
  timestamp,
  badge,
  onLike,
  onAddComment,
  isLiked,
}: PostCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmitComment = (commentText: string) => {
    onAddComment(id, commentText);
  };

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
        {comments.length > 0 && (
          <div className="space-y-2 mt-4 border-t pt-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-2 text-sm">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{comment.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div>
                    <span className="font-medium">{comment.username}</span> {comment.content}
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button variant="ghost" size="sm" className="gap-2 flex-1 hover:text-primary" onClick={() => onLike(id)} disabled={isLiked}>
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-1 hover:text-primary" onClick={openModal}>
          <MessageCircle className="h-4 w-4" />
          {comments.length}
        </Button>
        <CommentModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmitComment} />
      </CardFooter>
    </Card>
  );
};
