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
      <motion.div className="relative group">
        <Button
          onClick={handleClick}
          variant="outline"
          size="sm"
          className="bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-700 transition-all duration-300 relative overflow-hidden"
          disabled={isLocking}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isLocking ? { rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.5, repeat: isLocking ? Infinity : 0 }}
          >
            <Heart className="w-4 h-4 mr-2" fill="currentColor" />
          </motion.div>
          Lock Letters
        </Button>

        {/* Hover tooltip */}
        <AnimatePresence>
          {!showConfirm && !isLocking && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              Lock letters
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirmation dialog */}
      <AnimatePresence>
        {showConfirm && !isLocking && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative"
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Lock Your Letters?
                </motion.h3>
                
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  You'll need to enter the code again to access them
                </motion.p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Lock
                  </Button>
                </motion.div>
              </div>

              {/* Bottom decoration */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl">💕</div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Locking overlay */}
      <AnimatePresence>
        {isLocking && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center text-white">
              <motion.div
                className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Lock className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h2
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Locking Your Letters
              </motion.h2>
              
              <motion.div
                className="flex items-center justify-center gap-2 text-white/80 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />
                <span className="ml-2">Keeping your love safe and secure...</span>
              </motion.div>

              <motion.div
                className="text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                💖
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartLock;
