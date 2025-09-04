import { useState } from "react";
import { Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    }, 1000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLocking}
      className={cn(
        "relative group bg-white/10 backdrop-blur-sm border border-white/20",
        "hover:bg-white/20 text-white transition-all duration-300",
        "rounded-full p-3 shadow-love",
        isLocking && "animate-pulse",
        className
      )}
    >
      {/* Heart Background */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-all duration-500",
        "bg-gradient-to-br from-pink-400/20 to-red-400/20",
        isLocking && "bg-gradient-to-br from-gray-400/30 to-gray-600/30"
      )} />
      
      {/* Main Heart Icon */}
      <div className="relative z-10 flex items-center justify-center">
        <Heart 
          size={20} 
          className={cn(
            "transition-all duration-500 fill-current",
            isLocking ? "text-gray-300 scale-75" : "text-pink-200 group-hover:text-pink-100"
          )} 
        />
        
        {/* Lock Icon Overlay */}
        <Lock 
          size={12} 
          className={cn(
            "absolute transition-all duration-500",
            isLocking 
              ? "opacity-100 scale-100 text-white" 
              : "opacity-0 scale-50 text-transparent"
          )} 
        />
      </div>

      {/* Animated Rings */}
      {isLocking && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border border-pink-300/50 animate-pulse" />
        </>
      )}

      {/* Tooltip */}
      <div className={cn(
        "absolute -bottom-8 left-1/2 transform -translate-x-1/2",
        "text-xs text-white/80 opacity-0 group-hover:opacity-100",
        "transition-opacity duration-300 whitespace-nowrap"
      )}>
        {isLocking ? "Locking..." : "Lock & Sign Out"}
      </div>
    </Button>
  );
};

export default HeartLock;