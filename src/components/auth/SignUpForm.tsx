import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, setAuthToken } from "@/lib/auth";
import { useUser } from "@/contexts/UserContext";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser, addNotification } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { token, user } = await signUp(formData);
      setAuthToken(token, user);
      setUser(user);
      // Add some sample notifications
      addNotification({ type: 'follow', from: 'GamerX', message: 'GamerX started following you' });
      addNotification({ type: 'like', from: 'ProPlayer', message: 'ProPlayer liked your post' });
      addNotification({ type: 'comment', from: 'StreamerY', message: 'StreamerY commented on your post: "Nice!"' });
      navigate("/feed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="game">Favorite Game</Label>
              <Input
                id="game"
                placeholder="Fortnite, Valorant, COD..."
                value={formData.favoriteGame}
                onChange={(e) => setFormData({ ...formData, favoriteGame: e.target.value })}
                disabled={loading}
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

            <Button type="submit" className="w-full glow-primary" size="lg" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
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
