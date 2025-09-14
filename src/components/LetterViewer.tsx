import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
  const [isTyping, setIsTyping] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Use refs to avoid dependency issues
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  const contentRef = useRef("");

  // Automatically scroll to top when the letter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [letter]);

  // Simplified typewriter effect - FIXED VERSION
  useEffect(() => {
    // Reset all state when letter changes
    setDisplayedContent("");
    setIsTyping(true);
    setReadingProgress(0);
    currentIndexRef.current = 0;
    contentRef.current = letter.content;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const typeContent = () => {
      if (currentIndexRef.current < contentRef.current.length) {
        const newContent = contentRef.current.slice(0, currentIndexRef.current + 1);
        setDisplayedContent(newContent);
        
        // Update reading progress
        const progress = (currentIndexRef.current / contentRef.current.length) * 100;
        setReadingProgress(progress);
        
        currentIndexRef.current++;

        // Variable speed typing
        const currentChar = contentRef.current[currentIndexRef.current - 1];
        let delay = 40; // Base speed

        if (['.', '!', '?'].includes(currentChar)) {
          delay = 600; // Long pause after sentences
        } else if ([',', ';', ':'].includes(currentChar)) {
          delay = 300; // Medium pause after commas
        } else if (currentChar === '\n') {
          delay = 400; // Pause for line breaks
        } else if (currentChar === ' ') {
          delay = 60; // Slightly slower for spaces
        }

        timeoutRef.current = setTimeout(typeContent, delay);
      } else {
        // Finished typing
        setIsTyping(false);
        setReadingProgress(100);
      }
    };

    // Start typing after a small delay
    timeoutRef.current = setTimeout(typeContent, 800);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [letter.title]); // Only depend on letter.title to avoid loops

  // Format content with proper paragraph breaks
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <div key={index} className="mb-4">
        {paragraph.split('\n').map((line, lineIndex) => (
          <p key={lineIndex} className={lineIndex > 0 ? "mt-2" : ""}>
            {line}
          </p>
        ))}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4">
      {/* Fixed Back Button - Improved positioning */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </motion.div>

      {/* Main Letter Content */}
      <div className="max-w-2xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-rose-100 dark:border-rose-800 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
              >
                {letter.title}
              </motion.h1>
              {letter.date && (
                <p className="text-sm text-muted-foreground mt-2">
                  Written with love on {letter.date}
                </p>
              )}
            </CardHeader>

            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
                {formatContent(displayedContent)}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-rose-500 font-bold text-xl"
                  >
                    |
                  </motion.span>
                )}
              </div>

              {!isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8 pt-6 border-t border-rose-100 dark:border-rose-800"
                >
                  <p className="text-rose-600 dark:text-rose-400 font-medium">
                    Always yours ❤️
                  </p>
                  <Heart className="h-6 w-6 mx-auto mt-2 text-rose-500 fill-rose-500" />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Reading Progress Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="relative w-16 h-16"
        >
          {/* Background circle */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-rose-200 dark:stroke-rose-800"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-rose-500"
              strokeWidth="2"
              strokeDasharray={`${readingProgress}, 100`}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
              {Math.round(readingProgress)}%
            </span>
          </div>

          {/* Reading indicator label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs text-muted-foreground">
              Reading Progress
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LetterViewer;
