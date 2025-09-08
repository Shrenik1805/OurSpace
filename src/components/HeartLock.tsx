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
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "group relative bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-300/30 hover:border-pink-400/50 transition-all duration-300 rounded-full px-6 py-3",
        className
      )}
      disabled={isLocking}
    >
      <div className="flex items-center space-x-2">
        {isLocking ? (
          <Lock className="h-4 w-4 text-purple-600 animate-pulse" />
        ) : (
          <Heart className="h-4 w-4 text-pink-600 group-hover:text-pink-700 transition-colors" />
        )}
        {/* Dynamic text sizing using responsive classes */}
        <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-medium group-hover:text-gray-800 transition-colors">
          {isLocking ? "Locking..." : "Lock & Sign Out"}
        </span>
      </div>
    </Button>
  );
};

export default HeartLock;
