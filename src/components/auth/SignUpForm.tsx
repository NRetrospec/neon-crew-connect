import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const THEME_COLORS = [
  { name: "Rose Pink", value: "#CB5E77" },
  { name: "Neon Purple", value: "#A855F7" },
  { name: "Cyber Blue", value: "#3B82F6" },
  { name: "Lime Green", value: "#84CC16" },
  { name: "Orange Blaze", value: "#F97316" },
  { name: "Hot Pink", value: "#EC4899" },
];

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    favoriteGame: "",
    themeColor: THEME_COLORS[0].value,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your backend JWT auth
    console.log("Sign up data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 glow-primary">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black">Join PhreshTeamTV</CardTitle>
          <CardDescription>Create your gamer profile and connect with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="xXProGamerXx"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="gamer@phreshteam.tv"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="game">Favorite Game</Label>
              <Input
                id="game"
                placeholder="Fortnite, Valorant, COD..."
                value={formData.favoriteGame}
                onChange={(e) => setFormData({ ...formData, favoriteGame: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Your Theme Color</Label>
              <div className="grid grid-cols-6 gap-2">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, themeColor: color.value })}
                    className={`h-10 w-10 rounded-full border-2 transition-all hover:scale-110 ${
                      formData.themeColor === color.value
                        ? "border-foreground scale-110 shadow-lg"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">This will personalize your UI experience</p>
            </div>

            <Button type="submit" className="w-full glow-primary" size="lg">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
