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
          "relative w-full h-32 p-4 bg-gradient-to-br from-pink-50 to-rose-100",
          "border-2 border-pink-200 hover:border-pink-300",
          "transform transition-all duration-300 ease-out",
          "hover:scale-105 hover:shadow-lg hover:shadow-pink-200/50",
          "rounded-lg overflow-hidden",
          isClicked && "animate-pulse scale-95",
          isHovered && "shadow-xl shadow-pink-200/60"
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
          
          <h3 className="text-sm font-semibold text-pink-800 mb-1 leading-tight">
            {title}
          </h3>
          
          <p className="text-xs text-pink-600 opacity-80 italic">
            Read when you{" "}
            <span className="font-medium lowercase">{tag}</span>
          </p>

          {/* Animated Hearts */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 animate-bounce delay-100">
                <Heart size={8} className="text-pink-400 fill-current" />
              </div>
              <div className="absolute top-3/4 right-1/4 animate-bounce delay-300">
                <Heart size={8} className="text-pink-400 fill-current" />
              </div>
            </div>
          )}
        </div>

        {/* Envelope Flap Effect */}
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 to-rose-300",
            "transform origin-top transition-transform duration-500",
            isClicked && "scale-y-0"
          )}
        />
      </Button>

      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-50" />
    </div>
  );
};

export default Envelope;
