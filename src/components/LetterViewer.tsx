import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, BookOpen, Download, Share } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [showFullContent, setShowFullContent] = useState(false);

  // Automatically scroll to top when the letter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [letter]);

  // Enhanced typewriter effect with better performance
  useEffect(() => {
    setDisplayedContent("");
    setIsTyping(true);
    setShowFullContent(false);
    
    let index = 0;
    const content = letter.content;
    let timeoutId: NodeJS.Timeout;
    
    const typeWriter = () => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1));
        index++;
        // Adjust speed based on character type for more natural feel
        const char = content[index - 1];
        const delay = char === '.' || char === '!' || char === '?' ? 150 : 
                     char === ',' || char === ';' ? 100 : 
                     char === ' ' ? 30 : 25;
        timeoutId = setTimeout(typeWriter, delay);
      } else {
        setIsTyping(false);
        setShowFullContent(true);
      }
    };
    
    // Small delay before starting typewriter
    const initialTimeout = setTimeout(typeWriter, 500);
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [letter.content]);

  const handleSkipAnimation = () => {
    setDisplayedContent(letter.content);
    setIsTyping(false);
    setShowFullContent(true);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle signature lines (lines that start with specific patterns)
      if (paragraph.includes('With all my love') || 
          paragraph.includes('Always yours') || 
          paragraph.includes('Your devoted') ||
          paragraph.includes('Loving you') ||
          paragraph.includes('Forever yours')) {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: showFullContent ? 0.3 : 0 }}
            className="text-right mt-8 font-dancing text-lg text-primary/80 italic"
          >
            {paragraph}
          </motion.div>
        );
      }
      
      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: showFullContent ? index * 0.1 : 0 }}
          className="mb-4 leading-relaxed text-foreground/90 font-inter"
        >
          {paragraph}
        </motion.p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen love-letters-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Enhanced Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="bg-white/90 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Letters
          </Button>

          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              💌
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="letter-paper shadow-2xl border-0 overflow-hidden">
            {/* Decorative Header */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30"></div>
            
            <CardHeader className="text-center relative pb-6">
              {/* Floating decoration */}
              <div className="absolute -top-4 -left-4 text-4xl opacity-20 animate-float">💕</div>
              <div className="absolute -top-2 -right-2 text-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}>✨</div>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-5xl font-dancing gradient-text-enhanced mb-4"
              >
                {letter.title}
              </motion.h1>
              
              {letter.date && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-muted-foreground italic font-playfair"
                >
                  Written with love on {letter.date}
                </motion.p>
              )}

              {/* Skip Animation Button - Only show while typing */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 right-4"
                  >
                    <Button
                      onClick={handleSkipAnimation}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      Skip Animation
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {/* Letter Content */}
              <div className="relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent"></div>
                </div>
                
                <div className="relative text-lg md:text-xl font-playfair leading-relaxed">
                  {displayedContent ? (
                    <div>
                      {formatContent(displayedContent)}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-0.5 h-6 bg-primary ml-1"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="inline-block text-2xl text-primary/60"
                      >
                        💖
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Footer */}
              <AnimatePresence>
                {showFullContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-12 pt-8 border-t border-primary/20"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center gap-2 text-primary/80 font-dancing text-xl mb-6"
                      >
                        <Heart className="h-5 w-5 fill-current" />
                        <span>Always yours</span>
                        <Heart className="h-5 w-5 fill-current" />
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300"
                          onClick={() => window.print()}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Save Letter
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: letter.title,
                                text: letter.preview,
                                url: window.location.href
                              });
                            } else {
                              navigator.clipboard.writeText(`${letter.title}\n\n${letter.content}`);
                            }
                          }}
                        >
                          <Share className="mr-2 h-4 w-4" />
                          Share Love
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            {/* Decorative Footer */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30"></div>
          </Card>
        </motion.div>

        {/* Floating Hearts */}
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -100],
                x: [0, Math.random() * 200 - 100]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeOut"
              }}
              className="absolute text-2xl text-primary/30"
              style={{
                left: `${Math.random() * 90 + 5}%`,
                bottom: '10%',
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterViewer;
