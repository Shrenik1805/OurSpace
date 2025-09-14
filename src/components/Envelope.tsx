import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EnvelopeProps {
  title: string;
  tag: string;
  onClick: () => void;
  className?: string;
}

const Envelope = ({ title, tag, onClick, className }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
      setIsClicked(false);
    }, 400);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative group cursor-pointer",
        "bg-gradient-to-br from-white via-pink-50/30 to-rose-50/50",
        "rounded-2xl shadow-lg hover:shadow-2xl",
        "transition-all duration-500 ease-out",
        "border border-primary/10 hover:border-primary/30",
        "overflow-hidden",
        className
      )}
      onClick={handleClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <pattern id="hearts" patternUnits="userSpaceOnUse" width="20" height="20">
            <text x="10" y="15" fontSize="8" textAnchor="middle" fill="currentColor" opacity="0.1">💕</text>
          </pattern>
          <rect width="100" height="100" fill="url(#hearts)" />
        </svg>
      </div>

      {/* Floating Hearts Animation - Only on Hover */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/60"
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? {
              scale: [0, 1, 0.8],
              opacity: [0, 1, 0],
              x: [0, Math.cos(i * 90) * 30],
              y: [0, Math.sin(i * 90) * 30],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            💖
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative p-6 h-48 flex flex-col justify-between">
        {/* Header with Sparkle */}
        <div className="flex items-start justify-between">
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-2xl"
          >
            💌
          </motion.div>
          
          <motion.div
            animate={isHovered ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            } : {}}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            className="text-yellow-400/70"
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        </div>

        {/* Title and Tag */}
        <div className="text-center space-y-3">
          <motion.h3 
            className="text-xl font-semibold text-primary font-playfair leading-tight"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-sm text-primary/80 font-medium">{tag}</span>
          </motion.div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center">
          <motion.div
            className="flex gap-1"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-primary/40 rounded-full"
                animate={isHovered ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4]
                } : {}}
                transition={{
                  duration: 0.8,
                  repeat: isHovered ? Infinity : 0,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Envelope Flap with Opening Animation */}
      <motion.div
        className={cn(
          "absolute top-0 left-0 right-0 h-20",
          "bg-gradient-to-b from-primary/20 to-primary/10",
          "rounded-t-2xl",
          "origin-top transition-all duration-500 ease-out",
          isHovered && !isClicked && "transform rotate-x-12",
          isClicked && "transform rotate-x-180"
        )}
        style={{
          transformStyle: "preserve-3d",
          clipPath: isHovered || isClicked 
            ? "polygon(0 0, 100% 0, 50% 100%)" 
            : "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        }}
      >
        {/* Wax Seal Effect */}
        <motion.div
          className={cn(
            "absolute bottom-2 left-1/2 transform -translate-x-1/2",
            "w-8 h-8 bg-gradient-to-br from-red-400 to-red-600",
            "rounded-full shadow-lg",
            "flex items-center justify-center text-white text-xs",
            "transition-all duration-500"
          )}
          animate={isClicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart className="h-3 w-3 fill-current" />
        </motion.div>
      </motion.div>

      {/* Click Ripple Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)"
          }}
        />
      )}

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"
        animate={isHovered ? { 
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2] 
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Bottom Shadow Enhancement */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-primary/10 blur-sm rounded-full opacity-50" />
    </motion.div>
  );
};

export default Envelope;
