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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Fixed Back Button - Improved positioning */}
      <motion.div 
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm border-pink-200 hover:bg-pink-50 hover:border-pink-300 shadow-lg transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Letters
        </Button>
      </motion.div>

      {/* Main Letter Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {letter.title}
                </h1>
                {letter.date && (
                  <p className="text-sm text-gray-500 italic">
                    Written with love on {letter.date}
                  </p>
                )}
              </motion.div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              >
                {formatContent(displayedContent)}
                {isTyping && (
                  <span className="inline-block w-0.5 h-5 bg-pink-400 animate-pulse ml-1">
                    |
                  </span>
                )}
              </motion.div>

              {!isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center mt-8"
                >
                  <p className="text-sm text-gray-500 italic">
                    Always yours
                  </p>
                  <Heart className="h-4 w-4 text-pink-400 mx-auto mt-2" />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Reading Progress Indicator */}
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          {/* Background circle */}
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-pink-200"></div>

          {/* Progress circle */}
          <svg className="absolute top-0 left-0 w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-pink-300"
              strokeDasharray={`${(readingProgress / 100) * 175.92} 175.92`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.3s ease' }}
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {Math.round(readingProgress)}%
            </span>
          </div>
        </div>

        {/* Reading indicator label */}
        <p className="text-xs text-gray-500 text-center mt-1">
          Reading Progress
        </p>
      </div>
    </div>
  );
};

export default LetterViewer;
