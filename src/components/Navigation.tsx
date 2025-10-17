import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, Home, Users, User, Bell, LogOut, Heart, MessageCircle, UserPlus } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { removeAuthToken } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const { user, setUser, notifications, markNotificationsAsRead } = useUser();

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Gamepad2 className="h-8 w-8 text-primary group-hover:animate-pulse-glow transition-all" />
            <span className="text-2xl font-black tracking-tight">
              Phresh<span className="text-primary">Team</span>TV
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/feed" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Users className="h-4 w-4" />
              Feed
            </Link>
            {user && (
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <User className="h-4 w-4" />
                Profile
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu onOpenChange={(open) => { if (open) markNotificationsAsRead(); }}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {hasUnread && <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full animate-pulse" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.length === 0 ? (
                  <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                ) : (
                  notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex items-start gap-2">
                      {notif.type === 'like' && <Heart className="h-4 w-4 text-red-500 mt-0.5" />}
                      {notif.type === 'comment' && <MessageCircle className="h-4 w-4 text-blue-500 mt-0.5" />}
                      {notif.type === 'follow' && <UserPlus className="h-4 w-4 text-green-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground">{notif.timestamp.toLocaleString()}</p>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {user ? (
              <>
                <span className="text-sm font-medium">{user.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild className="glow-primary">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
