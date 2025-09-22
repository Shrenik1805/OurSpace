import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAccessibility } from './AccessibilityProvider';

const LoadingSpinner = () => {
  const { reducedMotion } = useAccessibility();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={!reducedMotion ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          } : {}}
          transition={!reducedMotion ? { 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
          className="mb-4"
        >
          <Heart className="h-12 w-12 text-rose-500 fill-rose-500 mx-auto" />
        </motion.div>

        <motion.h2 
          animate={!reducedMotion ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={!reducedMotion ? { 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
          className="text-2xl font-bold text-rose-800 mb-2"
        >
          Loading Your Love Letters
        </motion.h2>

        <p className="text-rose-600 text-sm">
          Preparing something special just for you...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;