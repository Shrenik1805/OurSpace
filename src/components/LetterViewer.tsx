import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Letter {
  id: string;
  title: string;
  content: string;
  date?: string;
  preview: string;
}

interface LetterViewerProps {
  letter: Letter;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const LetterViewer = ({ letter, onBack, isFavorite, onToggleFavorite }: LetterViewerProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Automatically scroll to top when the letter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [letter]);

  // Typewriter effect
  useEffect(() => {
    setDisplayedContent("");
    setIsTyping(true);
    let index = 0;
    const content = letter.content;
    
    const typeWriter = () => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1));
        index++;
        // Adjust speed here - lower = faster, higher = slower
        setTimeout(typeWriter, 30);
      } else {
        setIsTyping(false);
      }
    };
    
    // Small delay before starting typewriter
    setTimeout(typeWriter, 300);
  }, [letter.content]);

  return (
    <div className="min-h-screen bg-gradient-romantic">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with back button and favorite */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Letters
          </Button>
          <Button
            onClick={onToggleFavorite}
            variant="ghost"
            size="sm"
            className={`favorite-heart ${isFavorite ? "favorited" : ""}`}
          >
            <Heart 
              className={`w-5 h-5 ${
                isFavorite 
                  ? "fill-red-500 text-red-500" 
                  : "text-muted-foreground"
              }`} 
            />
            <span className="ml-2 text-sm">
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </span>
          </Button>
        </div>

        {/* Letter Card */}
        <Card className="letter-paper">
          <CardHeader className="text-center border-b border-border/50">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-romantic rounded-full flex items-center justify-center mb-4 shadow-love">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {letter.title}
            </h1>
            {letter.date && (
              <p className="text-muted-foreground italic">
                Written with love on {letter.date}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="letter-content whitespace-pre-line text-foreground/95 leading-relaxed text-lg">
                {displayedContent}
                {isTyping && <span className="animate-pulse">|</span>}
              </div>
            </div>
            
            {!isTyping && (
              <div className="text-center mt-8 pt-8 border-t border-border/50">
                <p className="text-muted-foreground italic font-medium">
                  Always yours ❤️
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation hint */}
        <div className="text-center mt-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Choose Another Letter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterViewer;
