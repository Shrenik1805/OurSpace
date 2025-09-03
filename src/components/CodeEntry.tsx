import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface CodeEntryProps {
  onAuthenticated: () => void;
}

const CodeEntry = ({ onAuthenticated }: CodeEntryProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can change this secret code to whatever you both decide on
    const SECRET_CODE = "OurLoveStory2024"; // Change this to your special code
    
    if (code === SECRET_CODE) {
      localStorage.setItem("loveLettersAuth", "true");
      onAuthenticated();
    } else {
      setError("Incorrect code. Try again, my love 💕");
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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