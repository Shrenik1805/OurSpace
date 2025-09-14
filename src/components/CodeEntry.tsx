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
      setError(
        attempts >= 2
          ? "Take your time, my love. Think of our special moment 💕"
          : "Not quite right. Try our special code 💕"
      );
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {floatingElements.map((element) => (
  <motion.div
    key={element.id}
    className="absolute text-2xl select-none"
    style={{
      opacity: 0.6,
      left: 0,
      top: 0,
    }}
    initial={{
      x: (element.x / 100) * window.innerWidth,
      y: (element.y / 100) * window.innerHeight,
    }}
    animate={{
      x: [
        (element.x / 100) * window.innerWidth,
        (element.x / 100 + 0.2 + Math.random() * 0.3) * window.innerWidth,
        (element.x / 100 - 0.2 - Math.random() * 0.3) * window.innerWidth,
        (element.x / 100) * window.innerWidth,
      ],
      y: [
        (element.y / 100) * window.innerHeight,
        (element.y / 100 + 0.2 + Math.random() * 0.3) * window.innerHeight,
        (element.y / 100 - 0.2 - Math.random() * 0.3) * window.innerHeight,
        (element.y / 100) * window.innerHeight,
      ],
      scale: [1, 1.1, 1, 0.9, 1],
    }}
    transition={{
      duration: 8 + Math.random() * 4, // slower medium pace: 8 to 12 seconds
      delay: element.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {element.emoji}
  </motion.div>
))}


      </div>

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="backdrop-blur-lg bg-white/90 border border-rose-200/50 shadow-2xl">
          {/* Decorative header gradient */}
          <div className="h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 rounded-t-lg"></div>

          <motion.div variants={cardVariants}>
            <CardHeader className="text-center space-y-2 pb-4">
              <motion.div
                className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Love Letters
                </CardTitle>
              </motion.div>

              <motion.div variants={itemVariants}>
                <CardDescription className="text-rose-600/70 text-base">
                  Enter our special code to unlock your personalized messages
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
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
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-400 hover:text-rose-600 transition-colors"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      className="text-rose-500 text-sm text-center bg-rose-50 p-3 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting || !code.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Unlocking...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="unlock"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Lock className="w-5 h-5" />
                          Unlock Letters
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.form>
              <motion.div className="space-y-2 text-center" variants={itemVariants}>
                <p className="text-rose-400 text-sm">Made with love just for you</p>
                {attempts > 0 && (
                  <motion.p
                    className="text-rose-300 text-xs italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Hint: Think of our special number... 💕
                  </motion.p>
                )}
              </motion.div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <Sparkles className="w-6 h-6 text-rose-400/60" />
      </motion.div>
    </div>
  );
};

export default CodeEntry;
