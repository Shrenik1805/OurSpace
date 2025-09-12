import { useState, useEffect, useRef } from "react";
import LetterViewer from "./LetterViewer";
import SharedJournal from "./SharedJournal";
import Envelope from "./Envelope";
import { ThemeToggle } from "./theme-toggle";
import { 
  letterCategories, 
  Letter, 
  MoodGroup, 
  moodFilters, 
  getLettersByGroup,
  getAllLetters 
} from "@/data/letters";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, LogOut } from "lucide-react";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard = ({ onLogout }: LettersDashboardProps) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [activeMoodFilter, setActiveMoodFilter] = useState<MoodGroup>("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const scrollPositionRef = useRef(0);
  
  const { toggleFavorite, isFavorite, getFavoriteLetters } = useFavorites();
  const allLetters = getAllLetters();
  const favoriteLetters = getFavoriteLetters(allLetters);

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

  const handleFavoriteToggle = (letterId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(letterId);
  };

  // Get filtered categories based on active mood filter
  const getFilteredCategories = () => {
    if (showFavoritesOnly) {
      // Group favorite letters by their original categories
      const favoriteCategories: { [key: string]: any } = {};
      
      favoriteLetters.forEach(letter => {
        const categoryEntry = Object.entries(letterCategories).find(([, category]) =>
          category.letters.some(l => l.id === letter.id)
        );
        
        if (categoryEntry) {
          const [categoryKey, category] = categoryEntry;
          if (!favoriteCategories[categoryKey]) {
            favoriteCategories[categoryKey] = {
              ...category,
              letters: []
            };
          }
          favoriteCategories[categoryKey].letters.push(letter);
        }
      });
      
      return Object.values(favoriteCategories);
    }

    return getLettersByGroup(activeMoodFilter);
  };

  if (selectedLetter) {
    return (
      <LetterViewer
        letter={selectedLetter}
        onBack={handleBackToDashboard}
        isFavorite={isFavorite(selectedLetter.id)}
        onToggleFavorite={() => toggleFavorite(selectedLetter.id)}
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

  const filteredCategories = getFilteredCategories();

  return (
    <div className="min-h-screen bg-gradient-romantic">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with theme toggle and logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <Button
            onClick={handleJournalOpen}
            className="btn-primary"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Our Shared Journal
          </Button>
        </div>

        {/* Welcome message */}
        <div className="text-center mb-8">
          <div className="text-lg text-muted-foreground mb-4 font-medium italic">
            "I'm sorry, I'm not there live, But babe I'm just a click away."
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
            Hello Love,
          </h1>
        </div>

        {/* Favorites Section - Show at top when there are favorites */}
        {favoriteLetters.length > 0 && !showFavoritesOnly && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                Your Favorite Letters
              </h2>
              <Button
                onClick={() => setShowFavoritesOnly(true)}
                variant="outline"
                size="sm"
              >
                View All Favorites
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteLetters.slice(0, 3).map((letter) => (
                <Card 
                  key={letter.id} 
                  className="letter-paper cursor-pointer envelope-glow relative"
                  onClick={() => handleLetterOpen(letter)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-foreground text-lg leading-tight">
                        {letter.title}
                      </h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="favorite-heart favorited"
                        onClick={(e) => handleFavoriteToggle(letter.id, e)}
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {letter.preview}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Mood Filter Buttons */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {showFavoritesOnly ? "Favorite Letters by Mood" : "Choose Your Mood"}
            </h2>
            {(showFavoritesOnly || favoriteLetters.length > 0) && (
              <Button
                onClick={() => {
                  setShowFavoritesOnly(!showFavoritesOnly);
                  setActiveMoodFilter("all");
                }}
                variant="outline"
                size="sm"
              >
                {showFavoritesOnly ? "Show All Letters" : "Show Favorites Only"}
              </Button>
            )}
          </div>
          
          {!showFavoritesOnly && (
            <div className="flex flex-wrap gap-3">
              {moodFilters.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setActiveMoodFilter(filter.id)}
                  variant={activeMoodFilter === filter.id ? "default" : "outline"}
                  className={`mood-filter ${activeMoodFilter === filter.id ? "active" : ""}`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  {filter.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                {showFavoritesOnly 
                  ? "No favorite letters yet. Start favoriting letters to see them here!" 
                  : "No letters found for this mood."}
              </p>
            </div>
          ) : (
            filteredCategories.map((category, index) => (
              <div key={`${category.title}-${index}`} className="group">
                <Envelope
                  title={category.title}
                  tag={category.tag}
                  onOpen={() => handleLetterOpen(category.letters)}
                  className="envelope-glow"
                />
                {category.letters && (
                  <div className="mt-2 flex justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`favorite-heart ${isFavorite(category.letters.id) ? "favorited" : ""}`}
                      onClick={(e) => handleFavoriteToggle(category.letters.id, e)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          isFavorite(category.letters.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-muted-foreground"
                        }`} 
                      />
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p className="italic">Made with 💖 for our love story</p>
        </div>
      </div>
    </div>
  );
};

export default LettersDashboard;
