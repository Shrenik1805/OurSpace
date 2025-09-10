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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const scrollPositionRef = useRef(0);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteLetter");
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-primary/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              >
                <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-playfair text-primary font-bold">
                  HelloLove
                </h1>
                <p className="text-sm text-muted-foreground font-dancing">
                  "I'm sorry, I'm not there live, But babe I'm just a click away."
                </p>
              </div>
            </motion.div>

            <Button
              onClick={handleLogoutClick}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Leave
            </Button>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search letters by mood, title, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 border-primary/20">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Moods</SelectItem>
                {Object.entries(letterCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          </motion.div>
          <h2 className="text-4xl font-playfair text-primary mb-4 font-bold">
            Hello Love,
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            Welcome to our special place. Choose the letter that matches your heart today.
          </p>
        </motion.div> 

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <Button
            onClick={handleJournalOpen}
            className="bg-gradient-romantic hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-love"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Open Our Shared Journal
          </Button>
        </motion.div>

        {/* Letters Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredCategories.map(([categoryKey, category], index) => (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative"
              >
                <Envelope
                  title={category.title}
                  tag={category.tag}
                  preview={category.letters[0].preview}
                  onClick={() => handleLetterOpen(category.letters[0])}
                />

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => toggleFavorite(category.letters[0].title, e)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    favorites.includes(category.letters[0].title)
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-white/80 text-gray-400 hover:text-red-500'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart 
                    className="w-4 h-4" 
                    fill={favorites.includes(category.letters[0].title) ? "currentColor" : "none"}
                  />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-playfair text-muted-foreground mb-2">
              No letters found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find the perfect letter.
            </p>
          </motion.div>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && selectedCategory === "all" && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              <h3 className="text-2xl font-playfair text-primary font-bold">
                Your Favorite Letters
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {favorites.map((title) => (
                <Badge
                  key={title}
                  variant="secondary"
                  className="px-3 py-1 bg-red-50 text-red-700 border border-red-200"
                >
                  {title}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LettersDashboard;
