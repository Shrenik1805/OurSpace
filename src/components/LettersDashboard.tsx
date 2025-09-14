import { useState, useEffect, useRef } from "react";
import LetterViewer from "./LetterViewer";
import SharedJournal from "./SharedJournal";
import Envelope from "./Envelope";
import HeartLock from "./HeartLock";
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

  // Get mood categories for filtering
  const getMoodCategories = () => {
    const moodMap: Record<string, string[]> = {
      "emotional-support": ["happy", "low", "missme"],
      "daily-life": ["wakeup", "bedtime", "daily"],
      "special-occasions": ["birthday"],
      "tough-times": ["anxious", "stressed", "badday", "period"]
    };
    return moodMap;
  };

  // Filter letters based on search and category
  const filteredCategories = Object.entries(letterCategories).filter(([categoryKey, category]) => {
    const moodCategories = getMoodCategories();
    
    let matchesCategory = selectedCategory === "all";
    
    if (!matchesCategory) {
      const categoryLetters = moodCategories[selectedCategory] || [];
      matchesCategory = categoryLetters.includes(categoryKey);
    }
    
    const matchesSearch = searchQuery === "" || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.letters.some(letter => 
        letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        letter.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Get favorite letters that match current filters
  const favoriteLetters = Object.entries(letterCategories)
    .filter(([categoryKey, category]) => 
      favorites.includes(category.letters[0].title) && 
      filteredCategories.some(([key]) => key === categoryKey)
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
      <motion.div 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-romantic rounded-full flex items-center justify-center animate-sparkle">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-dancing gradient-text font-semibold">
                HelloLove
              </h1>
            </motion.div>
            
            <motion.p 
              className="hidden md:block text-primary/70 font-playfair italic text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              "I'm sorry, I'm not there live, But babe I'm just a click away."
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleJournalOpen}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-dancing text-sm">Journal</span>
              </Button>
              
              <HeartLock onLogout={handleLogoutClick} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Controls */}
      <div className="container mx-auto px-6 py-6">
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40 w-4 h-4" />
            <Input
              placeholder="Search your letters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-primary/20 focus:border-primary"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-64 border-primary/20 focus:border-primary">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary/60" />
                <SelectValue placeholder="Filter by mood" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Moods</SelectItem>
              <SelectItem value="emotional-support">Emotional Support</SelectItem>
              <SelectItem value="daily-life">Daily Life</SelectItem>
              <SelectItem value="special-occasions">Special Occasions</SelectItem>
              <SelectItem value="tough-times">Tough Times</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="text-6xl mb-4 animate-bounce"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ✨
            </motion.div>
            
            <h2 className="text-3xl font-playfair text-primary mb-4 font-semibold">
              Hello Love,
            </h2>
            
            <p className="text-lg text-primary/80 font-dancing leading-relaxed">
              Welcome to our special place. Choose the letter that matches your heart today.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={handleJournalOpen}
              className="bg-gradient-romantic hover:bg-gradient-sunset text-white px-8 py-3 rounded-full shadow-love font-dancing text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Open Our Shared Journal
            </Button>
          </motion.div>

          {/* Favorites Section - Now at the top */}
          {favoriteLetters.length > 0 && selectedCategory === "all" && searchQuery === "" && (
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="text-xl font-playfair text-primary font-semibold">Your Favorite Letters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteLetters.map(([categoryKey, category], index) => (
                  <motion.div
                    key={categoryKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <Envelope
                      category={category}
                      onClick={() => handleLetterOpen(category.letters[0])}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Letters Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {filteredCategories.map(([categoryKey, category], index) => (
              <motion.div
                key={categoryKey}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <Envelope
                  category={category}
                  onClick={() => handleLetterOpen(category.letters[0])}
                />

                {/* Favorite Button - Moved to left */}
                <Button
                  onClick={(e) => toggleFavorite(category.letters[0].title, e)}
                  className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    favorites.includes(category.letters[0].title)
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-white/80 text-gray-400 hover:text-red-500'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredCategories.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-6xl mb-4">💔</div>
              
              <h3 className="text-xl font-playfair text-primary mb-2 font-semibold">
                No letters found
              </h3>
              
              <p className="text-primary/60 font-dancing">
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
