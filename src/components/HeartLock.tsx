import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeartLockProps {
  onLogout: () => void;
  className?: string;
}

const HeartLock = ({ onLogout, className }: HeartLockProps) => {
  const [isLocking, setIsLocking] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setIsLocking(true);
    
    // Add a dramatic locking animation before logging out
    setTimeout(() => {
      onLogout();
      setIsLocking(false);
      setShowConfirm(false);
    }, 1500);
  };

  const handleClick = () => {
    if (!showConfirm) {
      setShowConfirm(true);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Main heart lock button */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClick}
          disabled={isLocking}
          className="w-12 h-12 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 p-0 group"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              {isLocking ? (
                <motion.div
                  key="locking"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ 
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    ease: "easeInOut"
                  }}
                  className="text-rose-500"
                >
                  <Lock className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="heart"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-rose-500 group-hover:text-rose-600"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated ring for locking state */}
            <AnimatePresence>
              {isLocking && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.4, 0.8],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-rose-400"
                  />
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ 
                      scale: [0.6, 1.2, 0.6],
                      opacity: [0, 0.4, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-pink-400"
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </Button>

        {/* Hover tooltip */}
        <AnimatePresence>
          {!showConfirm && !isLocking && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-14 right-0 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              Lock letters
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirmation dialog */}
      <AnimatePresence>
        {showConfirm && !isLocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-14 right-0 bg-white rounded-2xl shadow-2xl border border-rose-200 p-6 min-w-72 z-50"
          >
            {/* Header */}
            <div className="text-center mb-4">
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
                className="text-3xl mb-2"
              >
                🔒
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Lock Your Letters?
              </h3>
              <p className="text-sm text-gray-600">
                You'll need to enter the code again to access them
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Lock
                </Button>
              </motion.div>
            </div>

            {/* Bottom decoration */}
            <div className="mt-4 text-center">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-lg opacity-60"
              >
                💕
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Locking overlay */}
      <AnimatePresence>
        {isLocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                🔒
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Locking Your Letters
              </h3>
              
              <p className="text-gray-600 mb-4">
                Keeping your love safe and secure...
              </p>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl"
              >
                💖
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartLock;
