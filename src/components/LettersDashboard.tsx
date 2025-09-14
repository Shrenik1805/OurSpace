import { useState, useEffect, useRef } from "react";
import LetterViewer from "./LetterViewer";
import SharedJournal from "./SharedJournal";
import Envelope from "./Envelope";
import { letterCategories, Letter } from "@/data/letters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Heart, Sparkles, LogOut, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard: React.FC<LettersDashboardProps> = ({ onLogout }) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const scrollPositionRef = useRef(0);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteLetters");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteLetters", JSON.stringify(favorites));
  }, [favorites]);

  // Restore scroll position when returning to dashboard
  useEffect(() => {
    if (!selectedLetter && !showJournal) {
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
  }, [selectedLetter, showJournal]);

  const handleLetterOpen = (letter: Letter) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedLetter(letter);
  };

  const handleBackToDashboard = () => {
    setSelectedLetter(null);
    setShowJournal(false);
  };

  const handleJournalOpen = () => {
    scrollPositionRef.current = window.scrollY;
    setShowJournal(true);
  };

  const toggleFavorite = (letterTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites(prev => 
      prev.includes(letterTitle) 
        ? prev.filter(title => title !== letterTitle)
        : [...prev, letterTitle]
    );
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("loveLettersAuth");
    localStorage.removeItem("authTimestamp");
    onLogout();
  };

  // Filter letters based on search and category
  const filteredCategories = Object.entries(letterCategories).filter(([categoryKey, category]) => {
    const matchesCategory = selectedCategory === "all" || categoryKey === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.letters.some(letter => 
        letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        letter.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Separate favorites and non-favorites for display order
  const favoriteLetters = filteredCategories.filter(([_, category]) => 
    favorites.includes(category.letters[0].title)
  );
  const nonFavoriteLetters = filteredCategories.filter(([_, category]) => 
    !favorites.includes(category.letters[0].title)
  );

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
      <SharedJournal
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen love-letters-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                💝
              </motion.div>
              <div>
                <h1 className="text-2xl font-playfair font-bold gradient-text">
                  HelloLove
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleJournalOpen}
                variant="outline"
                size="sm"
                className="border-primary/30 hover:border-primary"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Journal
              </Button>

              <Button
                onClick={handleLogoutClick}
                variant="ghost"
                size="sm"
                className="text-primary/70 hover:text-primary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40 w-4 h-4" />
            <Input
              placeholder="Search letters by mood or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-primary/20 focus:border-primary"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 border-primary/20 focus:border-primary">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌟 All Moods</SelectItem>
              <SelectItem value="happy">💝 Emotional Support</SelectItem>
              <SelectItem value="wakeup">☀️ Daily Life</SelectItem>
              <SelectItem value="birthday">🎉 Special Occasions</SelectItem>
              <SelectItem value="anxious">🫂 Tough Times</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-playfair font-bold mb-4 text-primary">
              Hello Love,
            </h2>
            <div className="relative">
              <p className="text-lg text-white font-medium mb-6 drop-shadow-lg">
                Welcome to our special place. Choose the letter that matches your heart today.
              </p>
              {/* Enhanced bouncing sparkles with better visibility */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-300 text-2xl pointer-events-none"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    x: [0, Math.random() * 20 - 10, 0],
                    rotate: [0, 180, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center space-x-4 mb-8">
              <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Made with Love
              </Badge>
            </div>
          </motion.div>

          {/* Favorite Letters Section - Show at Top */}
          {favoriteLetters.length > 0 && selectedCategory === "all" && searchQuery === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                <h3 className="text-xl font-playfair font-semibold text-primary">
                  Your Favorite Letters
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteLetters.map(([categoryKey, category], index) => (
                  <motion.div
                    key={`favorite-${categoryKey}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Envelope
                      category={category}
                      onClick={() => handleLetterOpen(category.letters[0])}
                      className="border-2 border-red-200 bg-red-50"
                    />

                    {/* Favorite Button - Moved to top left */}
                    <Button
                      onClick={(e) => toggleFavorite(category.letters[0].title, e)}
                      className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 bg-red-500 text-white shadow-md hover:bg-red-600"
                      aria-label="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Letters Grid - Non-favorites */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {nonFavoriteLetters.map(([categoryKey, category], index) => (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Envelope
                    category={category}
                    onClick={() => handleLetterOpen(category.letters[0])}
                  />

                  {/* Favorite Button - Moved to top left */}
                  <Button
                    onClick={(e) => toggleFavorite(category.letters[0].title, e)}
                    className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      favorites.includes(category.letters[0].title)
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-white/80 text-gray-400 hover:text-red-500'
                    }`}
                    aria-label="Toggle favorite"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-xl font-playfair font-semibold text-primary mb-2">
                No letters found
              </h3>
              <p className="text-primary/70">
                Try adjusting your search or filter to find the perfect letter.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LettersDashboard;
