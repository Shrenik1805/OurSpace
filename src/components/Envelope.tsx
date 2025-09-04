import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

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
    }, 300);
  };

  return (
    <div className={cn("relative group", className)}>
      <Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full h-36 sm:h-32 p-4 bg-gradient-to-br from-pink-50 to-rose-100",
          "border-2 border-pink-200 hover:border-pink-300",
          "transform transition-all duration-300 ease-out",
          "hover:scale-105 hover:shadow-xl hover:shadow-pink-200/60",
          "rounded-xl overflow-visible",
          "active:scale-95 touch-manipulation",
          isClicked && "animate-envelope-open scale-95",
          isHovered && "shadow-2xl shadow-pink-300/40 -translate-y-1"
        )}
        variant="ghost"
      >
        {/* Envelope Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 text-pink-300">
            <Heart size={16} />
          </div>
          <div className="absolute top-2 right-2 text-pink-300">
            <Heart size={12} />
          </div>
          <div className="absolute bottom-2 left-2 text-pink-300">
            <Heart size={14} />
          </div>
          <div className="absolute bottom-2 right-2 text-pink-300">
            <Heart size={10} />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="mb-2">
            <Mail 
              size={24} 
              className={cn(
                "text-pink-600 transition-transform duration-300",
                isHovered && "scale-110 rotate-3"
              )} 
            />
          </div>
          
          <h3 className="text-sm font-semibold text-pink-800 mb-2 leading-tight">
            {title}
          </h3>
          
          <p className="text-xs text-pink-600/90 font-medium">
            {tag}
          </p>
        </div>
      </Button>

      {/* Floating Hearts Around Envelope */}
      {isHovered && (
        <div className="absolute -inset-4 pointer-events-none">
          <div className="absolute -top-2 -left-2 animate-bounce delay-100">
            <Heart size={10} className="text-pink-300 fill-current opacity-70" />
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce delay-200">
            <Heart size={8} className="text-rose-300 fill-current opacity-80" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
            <Heart size={9} className="text-pink-400 fill-current opacity-60" />
          </div>
          <div className="absolute -bottom-2 -right-2 animate-bounce delay-400">
            <Heart size={7} className="text-rose-400 fill-current opacity-75" />
          </div>
          <div className="absolute top-1/2 -left-3 animate-bounce delay-500">
            <Heart size={6} className="text-pink-200 fill-current opacity-50" />
          </div>
          <div className="absolute top-1/2 -right-3 animate-bounce delay-600">
            <Heart size={8} className="text-rose-200 fill-current opacity-65" />
          </div>
        </div>
      )}

      {/* Enhanced Envelope Flap with Opening Animation */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 to-rose-300",
          "transform origin-top transition-all duration-700 ease-out rounded-t-xl",
          isClicked && "scale-y-0 -rotate-x-90",
          isHovered && "shadow-md"
        )}
      />

      {/* Wax Seal Effect */}
      <div className={cn(
        "absolute top-1 right-2 w-3 h-3 rounded-full",
        "bg-gradient-to-br from-rose-400 to-pink-500",
        "transition-all duration-500 shadow-sm",
        isClicked && "scale-0 opacity-0"
      )}>
        <div className="absolute inset-0.5 rounded-full bg-rose-300/50" />
      </div>

      {/* Bottom Shadow */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-50" />
    </div>
  );
};

export default Envelope;