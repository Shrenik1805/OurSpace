import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface CodeEntryProps {
  onAuthenticated: () => void;
}

const SECRET_CODE = import.meta.env.VITE_SECRET_CODE || "Loveu3000"; // Use env variable or fallback

const CodeEntry = ({ onAuthenticated }: CodeEntryProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      localStorage.setItem("loveLettersAuth", "true");
      onAuthenticated();
    } else {
      setError("Incorrect code. Try again, my love 💕");
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 relative overflow-hidden">
      {/* Graffiti Designs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Heart shapes scattered */}
        <div className="absolute top-20 left-10 text-primary/20 text-4xl rotate-12">💕</div>
        <div className="absolute top-32 right-16 text-primary/15 text-6xl -rotate-12">💖</div>
        <div className="absolute bottom-40 left-20 text-primary/20 text-3xl rotate-45">💗</div>
        <div className="absolute bottom-20 right-24 text-primary/15 text-5xl -rotate-6">💝</div>
        <div className="absolute top-40 left-1/2 text-primary/10 text-7xl -rotate-12">💘</div>

        {/* Cute doodles */}
        <div className="absolute top-60 right-8 text-primary/20 text-2xl rotate-12">✨</div>
        <div className="absolute bottom-60 left-8 text-primary/15 text-3xl -rotate-12">🌸</div>
        <div className="absolute top-80 left-32 text-primary/20 text-2xl rotate-45">🦋</div>
        <div className="absolute bottom-32 right-32 text-primary/15 text-2xl -rotate-45">🌙</div>

        {/* Love messages in background */}
        <div className="absolute top-16 right-20 text-primary/10 text-sm font-serif rotate-12">love you</div>
        <div className="absolute bottom-16 left-16 text-primary/10 text-sm font-serif -rotate-12">always ♡</div>
        <div className="absolute top-72 right-4 text-primary/10 text-xs font-serif rotate-6">forever</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-love border-primary/20 bg-gradient-letter">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center shadow-gentle">
              <Heart className="h-8 w-8 text-white" fill="currentColor" />
            </div>
            <CardTitle className="text-2xl font-serif text-foreground">
              Love Letters
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Enter our special code to access your personalized messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter the secret code..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-lg tracking-wide border-primary/30 focus:border-primary"
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-romantic hover:opacity-90 text-white font-medium py-6 text-lg shadow-gentle transition-all duration-300"
              >
                Open My Letters
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Made with love just for you ✨
        </p>
      </div>
    </div>
  );
};

export default CodeEntry;
