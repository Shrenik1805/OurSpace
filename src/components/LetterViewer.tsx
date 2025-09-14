import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, BookOpen } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentParagraph, setCurrentParagraph] = useState(0);

  // Split content into paragraphs for better typewriter effect
  const paragraphs = useMemo(() => {
    return letter.content.split('\n\n').filter(p => p.trim().length > 0);
  }, [letter.content]);

  // Automatically scroll to top when the letter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [letter]);

  // Enhanced typewriter effect with paragraph-by-paragraph reveal
  useEffect(() => {
    setDisplayedContent("");
    setIsTyping(true);
    setCurrentParagraph(0);
    
    let globalIndex = 0;
    let paragraphIndex = 0;
    const fullContent = paragraphs.join('\n\n');
    
    const typeNextChar = () => {
      if (globalIndex < fullContent.length) {
        setDisplayedContent(fullContent.slice(0, globalIndex + 1));
        globalIndex++;
        
        // Update current paragraph
        const currentContent = fullContent.slice(0, globalIndex);
        const currentParagraphCount = currentContent.split('\n\n').length - 1;
        setCurrentParagraph(currentParagraphCount);
        
        // Variable speed: slower at paragraph ends, faster in middle
        let speed = 25;
        if (fullContent[globalIndex - 1] === '.' || fullContent[globalIndex - 1] === '!' || fullContent[globalIndex - 1] === '?') {
          speed = 400; // Pause at sentence ends
        } else if (fullContent[globalIndex - 1] === '\n') {
          speed = 200; // Pause at line breaks
        }
        
        setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
      }
    };
    
    // Small delay before starting typewriter
    const timer = setTimeout(typeNextChar, 500);
    return () => clearTimeout(timer);
  }, [letter.content, paragraphs]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const letterVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-200/50 px-4 py-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Letters
          </Button>
        </motion.div>
      </div>

      {/* Letter card */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={letterVariants}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/90 backdrop-blur-lg border border-rose-200/50 shadow-2xl">
            {/* Decorative header */}
            <div className="relative">
              <div className="h-3 bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 rounded-t-lg"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </motion.div>
              </div>
            </div>

            <CardHeader className="text-center pt-8 pb-4">
              <motion.h1
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {letter.title}
              </motion.h1>
              
              {letter.date && (
                <motion.p
                  className="text-rose-500/70 text-sm italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Written with love on {letter.date}
                </motion.p>
              )}
            </CardHeader>

            <CardContent className="px-6 md:px-8 pb-8">
              <div className="prose prose-rose max-w-none">
                {displayedContent.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: index <= currentParagraph ? 1 : 0.3,
                      y: 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {paragraph}
                    {index === displayedContent.split('\n\n').length - 1 && isTyping && (
                      <motion.span
                        className="inline-block w-0.5 h-5 bg-rose-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.p>
                ))}
              </div>

              {/* Signature section */}
              <AnimatePresence>
                {!isTyping && (
                  <motion.div
                    className="mt-8 pt-6 border-t border-rose-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="inline-flex items-center gap-2 text-rose-500 mb-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                      >
                        <Heart className="w-4 h-4" fill="currentColor" />
                        <span className="text-lg font-script">Always yours</span>
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </motion.div>
                      
                      <motion.p
                        className="text-rose-400 text-sm italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        With endless love
                      </motion.p>
                      
                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                      >
                        <span className="text-2xl">💕</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Reading progress indicator */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-lg border border-rose-200 rounded-full px-4 py-2 shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 text-rose-600">
              <motion.div
                className="w-2 h-2 bg-rose-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-rose-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-rose-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
              />
              <span className="text-sm ml-2">Reading your letter...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LetterViewer;
