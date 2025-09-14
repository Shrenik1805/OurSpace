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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-full px-6 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Letters
          </Button>
        </motion.div>

        {/* Letter card */}
        <motion.div variants={letterVariants}>
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            {/* Decorative header */}
            <div className="h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" />
            
            <CardHeader className="text-center pb-6 pt-8 bg-gradient-to-b from-white to-rose-50/30">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-4xl mb-4"
              >
                💕
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                {letter.title}
              </motion.h1>
              
              {letter.date && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-gray-500 text-sm font-medium bg-white/60 rounded-full px-4 py-2 inline-block"
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Written with love on {letter.date}
                </motion.p>
              )}
            </CardHeader>

            <CardContent className="px-8 md:px-12 py-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed space-y-6 font-medium text-lg">
                  {displayedContent.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: index <= currentParagraph ? 1 : 0.3,
                        y: index <= currentParagraph ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      className={`${
                        index <= currentParagraph ? 'text-gray-700' : 'text-gray-400'
                      } transition-all duration-500`}
                    >
                      {paragraph}
                      {index === displayedContent.split('\n\n').length - 1 && isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block ml-1 w-3 h-6 bg-gradient-to-b from-rose-500 to-pink-500 rounded-sm"
                        />
                      )}
                    </motion.p>
                  ))}
                </div>

                {/* Signature section */}
                <AnimatePresence>
                  {!isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-12 pt-8 border-t border-rose-200"
                    >
                      <div className="text-center space-y-4">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-3xl"
                        >
                          💖
                        </motion.div>
                        <p className="text-rose-600 font-script text-xl italic">
                          Always yours
                        </p>
                        <div className="flex justify-center items-center gap-2 text-gray-500">
                          <Heart className="w-4 h-4 fill-current text-rose-400" />
                          <span className="text-sm">With endless love</span>
                          <Heart className="w-4 h-4 fill-current text-rose-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reading progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isTyping ? 1 : 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-rose-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-rose-300 border-t-rose-600 rounded-full"
              />
              Reading your letter...
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LetterViewer;
