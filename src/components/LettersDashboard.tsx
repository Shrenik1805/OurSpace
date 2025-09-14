import { useState, useEffect, useRef } from "react";
import LetterViewer from "./LetterViewer";
import SharedJournal from "./SharedJournal";
import Envelope from "./Envelope";
import { letterCategories, Letter } from "@/data/letters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Heart, Sparkles, LogOut, Filter, Star, StarOff } from "lucide-react";
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

  // Get category info for display
  const getCategoryInfo = () => {
    const categoryMap: Record<string, { emoji: string; title: string; description: string }> = {
      daily: { emoji: "🌟", title: "All Moods", description: "Letters for everyday moments" },
      happy: { emoji: "💝", title: "Emotional Support", description: "When you need encouragement" },
      low: { emoji: "💪", title: "Lift Your Spirit", description: "For those tough moments" },
      missme: { emoji: "💕", title: "Daily Life", description: "Connecting across distance" },
      wakeup: { emoji: "☀️", title: "Morning Light", description: "Start your day with love" },
      bedtime: { emoji: "🌙", title: "Sweet Dreams", description: "End your day peacefully" },
      birthday: { emoji: "🎉", title: "Special Occasions", description: "Celebrating your milestones" },
      period: { emoji: "🌸", title: "Tender Care", description: "Extra love and support" },
      monthiversary: { emoji: "💎", title: "Monthly Love", description: "Celebrating us every month" },
      anxious: { emoji: "🫂", title: "Calm & Comfort", description: "When anxiety feels overwhelming" },
      stressed: { emoji: "🌊", title: "Find Peace", description: "Breathing through the chaos" },
      badday: { emoji: "🌈", title: "Better Tomorrow", description: "Hope after difficult days" }
    };
    return categoryMap;
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

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen love-letters-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          {/* Floating decoration */}
          <div className="absolute -top-6 -left-6 text-6xl opacity-20 animate-float">💕</div>
          <div className="absolute -top-4 -right-4 text-4xl opacity-30 animate-float" style={{animationDelay: '1s'}}>✨</div>
          
          <motion.div 
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-5xl animate-heart-beat">💝</div>
            <h1 className="text-5xl md:text-6xl font-dancing gradient-text-enhanced">
              HelloLove
            </h1>
          </motion.div>
          
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            Choose the perfect letter that matches your heart today
          </p>
          
          {/* Header Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Button
              onClick={handleJournalOpen}
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Our Journal
            </Button>
            <Button
              onClick={handleLogoutClick}
              variant="ghost"
              size="lg"
              className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for the perfect letter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-primary/20 focus:border-primary bg-white/50 text-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 md:min-w-[240px]">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12 bg-white/50 border-primary/20">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">🌟 All Categories</SelectItem>
                    <SelectItem value="daily">🌟 All Moods</SelectItem>
                    <SelectItem value="happy">💝 Celebrate Joy</SelectItem>
                    <SelectItem value="low">💪 Lift Spirit</SelectItem>
                    <SelectItem value="missme">💕 Missing You</SelectItem>
                    <SelectItem value="wakeup">☀️ Morning Light</SelectItem>
                    <SelectItem value="bedtime">🌙 Sweet Dreams</SelectItem>
                    <SelectItem value="birthday">🎉 Special Days</SelectItem>
                    <SelectItem value="period">🌸 Tender Care</SelectItem>
                    <SelectItem value="monthiversary">💎 Monthly Love</SelectItem>
                    <SelectItem value="anxious">🫂 Calm & Comfort</SelectItem>
                    <SelectItem value="stressed">🌊 Find Peace</SelectItem>
                    <SelectItem value="badday">🌈 Better Tomorrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-4 text-center text-muted-foreground">
                Found {filteredCategories.length} letter{filteredCategories.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </div>
            )}
          </div>
        </motion.div>

        {/* Subtle sparkles - reduced from 12 to 6 */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-yellow-400/40 text-lg"
              style={{
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Favorite Letters Section */}
        <AnimatePresence>
          {favoriteLetters.length > 0 && selectedCategory === "all" && searchQuery === "" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  <h2 className="text-3xl font-dancing gradient-text-enhanced">Your Favorite Letters</h2>
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-muted-foreground">The letters that touched your heart</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteLetters.map(([categoryKey, category], index) => (
                  <motion.div
                    key={categoryKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Envelope
                      title={category.title}
                      tag={category.tag}
                      onClick={() => handleLetterOpen(category.letters[0])}
                      className="border-2 border-yellow-200/60 bg-gradient-to-br from-yellow-50/80 to-orange-50/60 shadow-xl hover:shadow-2xl transition-all duration-500"
                    />

                    {/* Enhanced Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(category.letters[0].title, e)}
                      className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg flex items-center justify-center z-10 hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
                    >
                      <Star className="h-5 w-5 text-white fill-white" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Letters Grid */}
        <div className="relative">
          {nonFavoriteLetters.length > 0 && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-dancing gradient-text-enhanced mb-2">
                  {selectedCategory === "all" ? "All Letters" : 
                   categoryInfo[selectedCategory]?.title || "Letters"}
                </h2>
                {selectedCategory !== "all" && categoryInfo[selectedCategory] && (
                  <p className="text-muted-foreground text-lg">
                    {categoryInfo[selectedCategory].description}
                  </p>
                )}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nonFavoriteLetters.map(([categoryKey, category], index) => (
                  <motion.div
                    key={categoryKey}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5 + (index * 0.1),
                      type: "spring",
                      stiffness: 100 
                    }}
                    className="relative group"
                  >
                    <Envelope
                      title={category.title}
                      tag={category.tag}
                      onClick={() => handleLetterOpen(category.letters[0])}
                      className="hover:scale-105 transition-all duration-300"
                    />

                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(category.letters[0].title, e)}
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10 transition-all duration-300 ${
                        favorites.includes(category.letters[0].title)
                          ? "bg-gradient-to-br from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
                          : "bg-white hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {favorites.includes(category.letters[0].title) ? (
                        <Star className="h-4 w-4 text-white fill-white" />
                      ) : (
                        <StarOff className="h-4 w-4 text-gray-400" />
                      )}
                    </motion.button>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/90 backdrop-blur-sm text-primary font-medium px-2 py-1 text-xs"
                      >
                        {categoryInfo[categoryKey]?.emoji || "💌"} {categoryInfo[categoryKey]?.title || category.title}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* No Results Message */}
        <AnimatePresence>
          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-lg border border-primary/10">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  💔
                </motion.div>
                <h3 className="text-2xl font-dancing gradient-text-enhanced mb-4">
                  No letters found
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Try adjusting your search or filter to find the perfect letter for your heart.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                  className="bg-white/50 border-primary/30 hover:bg-primary/10"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20 pb-8"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
            <span className="text-sm font-inter">Made with endless love for you</span>
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LettersDashboard;
