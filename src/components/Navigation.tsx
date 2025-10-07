import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, Home, Users, Trophy, Bell } from "lucide-react";

export const Navigation = () => {
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
            <Link to="/leaderboard" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full animate-pulse" />
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="glow-primary">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
