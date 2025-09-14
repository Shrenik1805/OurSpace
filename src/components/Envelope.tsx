import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Mail, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnvelopeProps {
  title: string;
  tag: string;
  onClick: () => void;
  className?: string;
}

const Envelope = ({ title, tag, onClick, className }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setShowContent(true);
    
    // Simulate envelope opening animation before calling onClick
    setTimeout(() => {
      onClick();
    }, 800);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isOpening) {
      setShowContent(false);
    }
  };

  return (
    <motion.div
      className={cn("relative group cursor-pointer", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Magical particles around envelope when hovered */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 10)}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [-20, -40, -60],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative w-80 h-52 mx-auto perspective-1000">
        {/* Envelope body */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white via-rose-50 to-pink-100 rounded-lg shadow-lg border border-rose-200"
          animate={{
            rotateX: isHovered ? 2 : 0,
            rotateY: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 origin-bottom"
            style={{
              borderLeft: "160px solid transparent",
              borderRight: "160px solid transparent",
              borderTop: "80px solid #f9a8d4",
            }}
            animate={{
              rotateX: isOpening ? -120 : (showContent || isHovered ? -45 : 0),
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Wax seal */}
          <motion.div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-md flex items-center justify-center z-10"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isOpening ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="w-4 h-4 text-white fill-current" />
          </motion.div>

          {/* Letter content preview */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-8 left-4 right-4 bg-white rounded-md shadow-sm border p-3"
              >
                <div className="text-xs text-gray-600 leading-relaxed">
                  My dearest love, I wrote this letter thinking of you...
                </div>
                <div className="mt-2 text-xs text-rose-500 font-medium">
                  Click to read more 💕
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content card */}
        <motion.div
          className="absolute inset-4 bg-white rounded-md shadow-inner border border-gray-100 p-6 flex flex-col justify-center"
          animate={{
            y: showContent ? -10 : 0,
            opacity: showContent ? 0.3 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <Mail className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            
            <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
              {title}
            </h3>
            
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-full px-3 py-1 inline-block mb-3">
              <span className="text-xs font-medium text-rose-700">
                {tag}
              </span>
            </div>
            
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-2xl"
            >
              💕
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hover glow effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-lg blur-xl -z-10"
            />
          )}
        </AnimatePresence>

        {/* Bottom shadow */}
        <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/10 rounded-full blur-sm transform scale-95" />
      </div>

      {/* Lock indicator for special envelopes */}
      <motion.div
        className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          rotate: isHovered ? [0, 10, -10, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <Lock className="w-3 h-3 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default Envelope;
