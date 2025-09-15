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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            animate={{
              x: ["-10vw", "110vw"],
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
            style={{
              left: Math.random() * 100 + "vw",
              top: Math.random() * 100 + "vh"
            }}
          >
            {["💕", "💖", "💗", "💝", "💘", "✨", "🌸", "🦋", "🌙", "💫"][i % 10]}
          </motion.div>
        ))}

        {/* Love Messages */}
        {["love you", "always ♡", "forever"].map((text, i) => (
          <motion.div
            key={text}
            className="absolute text-rose-300 text-lg font-script opacity-30"
            animate={{
              x: ["-20vw", "120vw"],
              y: ["20vh", "80vh"]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: i * 8
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-rose-200">
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
              <Heart className="h-16 w-16 text-rose-500 fill-rose-500 mx-auto" />
            </motion.div>

            <CardTitle className="text-3xl font-bold text-rose-800 font-script">
              HelloLove
            </CardTitle>

            <CardDescription className="text-rose-600">
              Enter our special code to access your personalized messages
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  placeholder="Enter secret code"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500 hover:text-rose-700"
                  onClick={() => setShowCode(!showCode)}
                >
                  {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center font-medium">
                  {error}
                </p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg font-semibold"
                disabled={isLoading || !code.trim()}
              >
                {isLoading ? "Unlocking..." : "Open My Heart"}
              </Button>
            </form>

            <p className="text-center text-sm text-rose-600 italic">
              Made with love just for you ✨
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeEntry;
