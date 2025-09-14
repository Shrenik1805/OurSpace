import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Letter {
  title: string;
  content: string;
  date?: string;
  preview: string;
}

interface LetterViewerProps {
  letter: Letter;
  onBack: () => void;
}

const LetterViewer = ({ letter, onBack }: LetterViewerProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  // Automatically scroll to top when the letter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [letter]);

  // Enhanced typewriter effect with paragraph-wise display and breathing effect
  useEffect(() => {
    setDisplayedContent("");
    setCurrentParagraphIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
    setReadingProgress(0);
    
    // Split content into paragraphs
    const paragraphs = letter.content.split('\n\n').filter(p => p.trim());
    
    const typeWriter = () => {
      if (currentParagraphIndex < paragraphs.length) {
        const currentParagraph = paragraphs[currentParagraphIndex];
        
        if (currentCharIndex < currentParagraph.length) {
          // Add character
          const newContent = paragraphs
            .slice(0, currentParagraphIndex)
            .join('\n\n') + 
            (currentParagraphIndex > 0 ? '\n\n' : '') +
            currentParagraph.slice(0, currentCharIndex + 1);
          
          setDisplayedContent(newContent);
          setCurrentCharIndex(prev => prev + 1);
          
          // Update reading progress
          const totalChars = letter.content.length;
          const currentChars = newContent.length;
          setReadingProgress((currentChars / totalChars) * 100);
          
          // Variable speed: slower for punctuation, faster for regular chars
          const currentChar = currentParagraph[currentCharIndex];
          let delay = 30; // Base speed
          
          if (['.', '!', '?'].includes(currentChar)) {
            delay = 400; // Pause after sentences
          } else if ([',', ';', ':'].includes(currentChar)) {
            delay = 200; // Pause after commas
          } else if (currentChar === ' ') {
            delay = 50; // Slightly slower for spaces
          }
          
          setTimeout(typeWriter, delay);
        } else {
          // Finished current paragraph, move to next with breathing pause
          setCurrentParagraphIndex(prev => prev + 1);
          setCurrentCharIndex(0);
          
          if (currentParagraphIndex + 1 < paragraphs.length) {
            // Breathing pause between paragraphs
            setTimeout(typeWriter, 800);
          } else {
            // Finished all paragraphs
            setIsTyping(false);
            setReadingProgress(100);
          }
        }
      }
    };
    
    // Small delay before starting typewriter
    setTimeout(typeWriter, 500);
  }, [letter.content, currentParagraphIndex, currentCharIndex]);

  // Format content with proper paragraph breaks
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <div key={index} className="mb-4 last:mb-0">
        {paragraph.split('\n').map((line, lineIndex) => (
          <div key={lineIndex} className={lineIndex > 0 ? "mt-2" : ""}>
            {line}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="min-h-screen love-letters-bg">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-primary hover:text-primary/80 font-dancing"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Letters
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto letter-paper shadow-letter">
            <CardHeader className="text-center border-b border-primary/10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-3xl font-playfair text-primary mb-2 font-semibold">
                  {letter.title}
                </h1>
                
                {letter.date && (
                  <p className="text-sm text-primary/60 font-dancing italic">
                    Written with love on {letter.date}
                  </p>
                )}
              </motion.div>
            </CardHeader>
            
            <CardContent className="p-8 md:p-12">
              <motion.div
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-primary/90 font-inter leading-relaxed text-lg whitespace-pre-wrap">
                  {formatContent(displayedContent)}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-primary ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      |
                    </motion.span>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                className="text-center mt-12 pt-8 border-t border-primary/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-primary/70 font-dancing text-lg italic">
                  Always yours
                </p>
                <div className="flex justify-center mt-4">
                  <Heart className="w-6 h-6 text-red-500 fill-current animate-heart-beat" />
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reading Progress Indicator */}
        <motion.div
          className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-primary/20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <div className="relative w-12 h-12">
            {/* Background circle */}
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="hsl(var(--primary-soft))"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - readingProgress / 100)}`}
                transition={{ duration: 0.3 }}
              />
            </svg>
            
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {Math.round(readingProgress)}%
              </span>
            </div>
          </div>
          
          {/* Reading indicator label */}
          <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-2 py-1 rounded text-xs font-dancing whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Reading Progress
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LetterViewer;
