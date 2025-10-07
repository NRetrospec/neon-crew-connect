import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2, Users, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzhCNUI3RSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Floating gaming icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Gamepad2 className="absolute top-20 left-10 h-16 w-16 text-primary/20 animate-float" />
        <Zap className="absolute top-40 right-20 h-12 w-12 text-primary/20 animate-float" style={{ animationDelay: '1s' }} />
        <Users className="absolute bottom-40 left-20 h-14 w-14 text-primary/20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-primary">50K+ Active Gamers Online</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Level Up Your <br />
            <span className="text-primary text-glow">Gaming Community</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Connect with gamers worldwide, share epic moments, and build your squad on PhreshTeamTV
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="text-lg px-8 h-14 glow-primary" asChild>
              <Link to="/signup">
                Join the Community
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14" asChild>
              <Link to="/feed">
                Explore Feed
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="space-y-2">
              <div className="text-4xl font-black text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Posts Shared</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Games</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
