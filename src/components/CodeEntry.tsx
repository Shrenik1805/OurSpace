import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

interface CodeEntryProps {
  onAuthenticated: () => void;
}

// Note: In production, this should be validated server-side
const SECRET_CODE = import.meta.env.VITE_SECRET_CODE || "HelloTanya2024";

const CodeEntry: React.FC<CodeEntryProps> = ({ onAuthenticated }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 3) {
      setError("Too many attempts. Please wait before trying again.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 800));

    if (code === SECRET_CODE) {
      localStorage.setItem("loveLettersAuth", "true");
      localStorage.setItem("authTimestamp", Date.now().toString());
      onAuthenticated();
    } else {
      setAttempts(prev => prev + 1);
      setError(`Incorrect code. Try again, my love 💕 (${3 - attempts - 1} attempts remaining)`);
      setCode("");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen love-letters-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            {["💕", "💖", "💗", "💝", "💘", "✨", "🌸", "🦋", "🌙", "💫"][i % 10]}
          </motion.div>
        ))}

        {/* Love Messages */}
        {["love you", "always ♡", "forever"].map((text, i) => (
          <motion.div
            key={text}
            className="absolute text-lg text-primary/20 font-dancing"
            initial={{ 
              x: Math.random() * window.innerWidth * 0.8,
              y: Math.random() * window.innerHeight * 0.8,
              rotate: -15 + Math.random() * 30
            }}
            animate={{ 
              rotate: [-15, 15, -15],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.5 
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="letter-paper border-primary/20 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Heart className="w-12 h-12 text-primary mx-auto" fill="currentColor" />
            </motion.div>
            <CardTitle className="text-3xl font-playfair text-primary">
              HelloLove
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground font-inter">
              Enter our special code to access your personalized messages
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  placeholder="Enter the magic words..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-lg tracking-wide border-primary/30 focus:border-primary pr-10 font-inter"
                  autoFocus
                  disabled={isLoading}
                  maxLength={20}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowCode(!showCode)}
                  tabIndex={-1}
                >
                  {showCode ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-destructive bg-destructive/10 p-3 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-romantic hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                disabled={!code.trim() || isLoading || attempts >= 3}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Unlocking...
                  </div>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Enter Our World
                  </>
                )}
              </Button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-muted-foreground font-dancing text-lg"
            >
              Made with love just for you ✨
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CodeEntry;
