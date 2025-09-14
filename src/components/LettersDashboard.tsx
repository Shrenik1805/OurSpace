import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LetterViewer from "./LetterViewer";
import SharedJournal from "./SharedJournal";
import Envelope from "./Envelope";
import HeartLock from "./HeartLock";
import { letterCategories, Letter } from "@/data/letters";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Heart, Quote } from "lucide-react";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard = ({ onLogout }: LettersDashboardProps) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const scrollPositionRef = useRef(0);

  // Restore scroll position when returning to dashboard
  useEffect(() => {
    if (!selectedLetter && !showJournal) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPositionRef.current, behavior: 'smooth' });
      }, 100);
    }
  }, [selectedLetter, showJournal]);

  const handleLetterOpen = useCallback((letter: Letter) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedLetter(letter);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedLetter(null);
    setShowJournal(false);
  }, []);

  const handleJournalOpen = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
    setShowJournal(true);
  }, []);

  if (selectedLetter) {
    return (
      <LetterViewer
        letter={selectedLetter}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (showJournal) {
    return (
      <SharedJournal onBack={handleBackToDashboard} />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-pulse">💕</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-bounce">✨</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-10">💖</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-10 animate-pulse">🌸</div>
      </div>

      {/* Header */}
      <motion.header
        variants={headerVariants}
        className="relative z-10 pt-8 pb-6"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Logout button */}
          <div className="absolute top-4 right-6">
            <HeartLock onLogout={onLogout} />
          </div>

          {/* Main title */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Hello Love
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💕
            </motion.div>
          </motion.div>

          {/* Romantic quote */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-200 shadow-lg">
              <Quote className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed italic">
                "I'm sorry, I'm not there live, But babe I'm just a click away."
              </p>
              <div className="mt-3 text-rose-500 font-script text-lg">
                With all my love ♡
              </div>
            </div>
          </motion.div>

          {/* Journal button */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleJournalOpen}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Our Shared Journal
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Letters grid */}
      <motion.main
        variants={itemVariants}
        className="max-w-6xl mx-auto px-6 pb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(letterCategories).map(([categoryKey, category], index) => (
            <motion.div
              key={categoryKey}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredCategory(categoryKey)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="relative"
            >
              <Envelope
                title={category.title}
                tag={category.tag}
                onClick={() => handleLetterOpen(category.letters[0])}
                className={`transition-all duration-300 ${
                  hoveredCategory === categoryKey 
                    ? 'shadow-2xl transform -translate-y-2' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
              />
              
              {/* Hover effect - floating hearts */}
              <AnimatePresence>
                {hoveredCategory === categoryKey && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-rose-400 text-lg"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + (i % 2) * 20}%`,
                        }}
                        animate={{
                          y: [-20, -40, -20],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      >
                        💖
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        variants={itemVariants}
        className="text-center pb-8"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-3xl mb-2"
          >
            💝
          </motion.div>
          <p className="text-gray-600 text-sm">
            Each letter was written with love, just for you
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LettersDashboard;
