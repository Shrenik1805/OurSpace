import { useState } from "react";
import { Card } from "@/components/ui/card";

interface EnvelopeProps {
  tag: string;
  onClick: () => void;
  className?: string;
}

const Envelope = ({ tag, onClick, className = "" }: EnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onClick();
      setIsOpening(false);
    }, 600);
  };

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-letter ${className}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-32 bg-gradient-letter border border-primary/20">
        {/* Envelope back */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-soft/20" />
        
        {/* Envelope flap */}
        <div 
          className={`absolute top-0 left-0 w-full h-16 bg-gradient-romantic origin-top transition-transform duration-500 ${
            isOpening ? 'rotate-x-180' : ''
          }`}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d',
          }}
        />
        
        {/* Envelope opening animation */}
        <div 
          className={`absolute inset-0 bg-white/90 transition-opacity duration-300 ${
            isOpening ? 'opacity-0' : 'opacity-0 hover:opacity-10'
          }`}
        />
        
        {/* Heart seal */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        
        {/* Tag text */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <span className="text-sm font-medium text-foreground px-2 py-1 bg-white/80 rounded-full">
            {tag}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Envelope;