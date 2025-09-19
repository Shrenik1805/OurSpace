import { useState, useEffect, useRef } from "react";
import LetterViewer from "./LetterViewer";
import SharedJournal from "./SharedJournal";
import Envelope from "./Envelope";
import HeartLock from "./HeartLock";
import { letterCategories, Letter } from "@/data/letters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Heart, Filter } from "lucide-react";
import { motion } from "framer-motion";
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
 try {
 setFavorites(JSON.parse(savedFavorites));
 } catch (error) {
 console.error("Error loading favorites:", error);
 setFavorites([]);
 }
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
 "special-occasions": ["birthday", "montiversary"],
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
 category.letters.some(letter => favorites.includes(letter.title)) && 
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
 <SharedJournal onBack={handleBackToDashboard} />
 );
 }

 return (
 <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
 {/* Header */}
 <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-pink-200/30">
 <div className="container mx-auto px-4 py-4">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
 <Heart className="w-5 h-5 text-white" />
 </div>
 <div>
 <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
 HelloLove
 </h1>
 <p className="text-xs text-gray-500">
 "Iknow I'm not there, But babe I'm just a click away."
 </p>
 </div>
 </div>
 
 <HeartLock onLogout={handleLogoutClick} />
 </div>
 </div>
 </div>

 {/* Search and Filter Controls */}
 <div className="container mx-auto px-4 py-6">
 <div className="flex flex-col sm:flex-row gap-4 mb-8">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
 <Input
 placeholder="Search letters by mood, title, or content..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="pl-10 border-primary/20 focus:border-primary"
 />
 </div>
 
 <div className="flex items-center gap-2">
 <Filter className="w-4 h-4 text-gray-500" />
 <Select value={selectedCategory} onValueChange={setSelectedCategory}>
 <SelectTrigger className="w-48">
 <SelectValue placeholder="Filter by mood" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="all">All Moods</SelectItem>
 <SelectItem value="emotional-support">Emotional Support</SelectItem>
 <SelectItem value="daily-life">Daily Life</SelectItem>
 <SelectItem value="special-occasions">Special Occasions</SelectItem>
 <SelectItem value="tough-times">Tough Times</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 {/* Main Content */}
 <div className="max-w-6xl mx-auto">
 {/* Welcome Section */}
 <div className="text-center mb-12">
 <div className="text-6xl mb-4">
 ✨
 </div>
 <h2 className="text-3xl font-bold text-gray-800 mb-4">
 Hello Love,
 </h2>
 <p className="text-gray-600 max-w-2xl mx-auto">
 Welcome to our special place. Choose the letter that matches your heart today.
 </p>
 </div>

 {/* Quick Actions */}
 <div className="flex justify-center mb-12">
 <Button
 onClick={handleJournalOpen}
 variant="outline"
 className="border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300"
 >
 <BookOpen className="w-4 h-4 mr-2" />
 Our Shared Journal
 </Button>
 </div>

 {/* Favorites Section - Now at the top */}
 {favoriteLetters.length > 0 && selectedCategory === "all" && searchQuery === "" && (
 <div className="mb-12">
 <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
 💖 Your Favorite Letters
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {favoriteLetters.map(([categoryKey, category], index) => (
 <motion.div
 key={`favorite-${categoryKey}`}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.1 }}
 >
 <Envelope
 title={category.title}
 tag={category.tag}
 onClick={() => handleLetterOpen(category.letters[0])}
 />
 </motion.div>
 ))}
 </div>
 </div>
 )}

 {/* Letters Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredCategories.map(([categoryKey, category], index) => (
 <motion.div
 key={categoryKey}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.1 }}
 className="relative"
 >
 <Envelope
 title={category.title}
 tag={category.tag}
 onClick={() => handleLetterOpen(category.letters[0])}
 />

 {/* Favorite Button - Moved to left */}
 <button
 onClick={(e) => toggleFavorite(category.letters[0].title, e)}
 className="absolute top-3 left-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
 >
 <Heart
 className={`w-4 h-4 ${
 favorites.includes(category.letters[0].title)
 ? "text-pink-500 fill-pink-500"
 : "text-gray-400"
 }`}
 />
 </button>
 </motion.div>
 ))}
 </div>

 {/* No Results Message */}
 {filteredCategories.length === 0 && (
 <div className="text-center py-16">
 <div className="text-6xl mb-4">💔</div>
 <h3 className="text-xl font-semibold text-gray-600 mb-2">
 No letters found
 </h3>
 <p className="text-gray-500">
 Try adjusting your search or filter to find the perfect letter.
 </p>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};

export default LettersDashboard;
