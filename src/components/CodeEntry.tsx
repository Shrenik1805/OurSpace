import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles, Lock, Eye, EyeOff } from "lucide-react";

interface CodeEntryProps {
  onAuthenticated: () => void;
}

const SECRET_CODE = import.meta.env.VITE_SECRET_CODE || "Loveu3000";

const CodeEntry = ({ onAuthenticated }: CodeEntryProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Floating elements animation
  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['💕', '💖', '💗', '💝', '💘', '✨', '🌸', '🦋', '🌙', '⭐'][i % 10],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (code === SECRET_CODE) {
      localStorage.setItem("loveLettersAuth", "true");
      onAuthenticated();
    } else {
      setAttempts(prev => prev + 1);
      setError(attempts >= 2 ? "Take your time, my love. Think of our special moment 💕" : "Not quite right. Try our special code 💕");
      setCode("");
    }
    
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {element.emoji}
          </motion.div>
        ))}
      </div>

      {/* Romantic quotes in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 transform -rotate-12 text-rose-300 font-script text-lg opacity-40"
          variants={itemVariants}
        >
          "Love you to the moon and back"
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-10 transform rotate-12 text-pink-300 font-script text-lg opacity-40"
          variants={itemVariants}
        >
          "Always & Forever ♡"
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 transform -rotate-6 text-purple-300 font-script text-lg opacity-40"
          variants={itemVariants}
        >
          "You are my sunshine"
        </motion.div>
      </div>

      {/* Main card */}
      <motion.div
        variants={cardVariants}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative header gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" />
          
          <CardHeader className="text-center pb-6 pt-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mx-auto mb-4 text-5xl"
            >
              💕
            </motion.div>
            
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              <Heart className="inline-block w-6 h-6 mr-2 text-rose-500" />
              Love Letters
            </CardTitle>
            
            <CardDescription className="text-base text-gray-600 mt-3">
              Enter our special code to unlock your personalized messages
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showCode ? "text" : "password"}
                    placeholder="Enter the secret code..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="text-center text-lg tracking-wider border-rose-200 focus:border-rose-400 focus:ring-rose-400 pr-12 py-6 rounded-xl bg-rose-50/50"
                    autoFocus
                    disabled={isSubmitting}
                    maxLength={20}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCode(!showCode)}
                  >
                    {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-rose-500 text-sm text-center bg-rose-50 p-3 rounded-lg border border-rose-200"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !code.trim()}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Unlocking...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Unlock My Letters
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="text-center space-y-2"
            >
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                Made with love just for you
              </p>
              <p className="text-xs text-gray-400">
                Hint: Think of our special number... 💕
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-4xl opacity-30">💖</div>
      </motion.div>
    </motion.div>
  );
};

export default CodeEntry;
