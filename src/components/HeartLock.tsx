import { useState } from "react";
import { Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HeartLockProps {
  onLogout: () => void;
  className?: string;
}

const HeartLock = ({ onLogout, className }: HeartLockProps) => {
  const [isLocking, setIsLocking] = useState(false);

  const handleLogout = () => {
    setIsLocking(true);
    setTimeout(() => {
      onLogout();
      setIsLocking(false);
    }, 2000); // Extended to allow for the complete animation
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-2 text-primary hover:text-primary/80 transition-colors",
        className
      )}
      disabled={isLocking}
    >
      <AnimatePresence mode="wait">
        {isLocking ? (
          <motion.div
            key="locking"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1, 1.1, 1],
                rotate: [0, -10, 10, -5, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {/* Heart breaking animation */}
              <motion.div
                className="text-red-500"
                animate={{
                  opacity: [1, 0.7, 1, 0.5, 0.2]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-5 h-5 fill-current" />
              </motion.div>
              
              {/* Lock appearing animation */}
              <motion.div
                className="absolute inset-0 text-gray-600"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0, 0.5, 1], 
                  scale: [0, 0, 0.8, 1],
                  rotate: [180, 90, 45, 0]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Lock className="w-5 h-5" />
              </motion.div>
            </motion.div>
            
            <motion.span
              className="text-sm font-dancing"
              animate={{
                opacity: [1, 0.5, 1, 0.5, 0.2]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            >
              Locking your letters...
            </motion.span>
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-dancing">Leave</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default HeartLock;
