import { useState, useEffect, useRef } from "react";
import LetterViewer from "./LetterViewer";
import Envelope from "./Envelope";
import HeartLock from "./HeartLock";
import { letterCategories, Letter } from "@/data/letters";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard = ({ onLogout }: LettersDashboardProps) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const scrollPositionRef = useRef(0);

  // Restore scroll position when returning to dashboard
  useEffect(() => {
    if (!selectedLetter) {
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
  }, [selectedLetter]);

  const handleLetterOpen = (letter: Letter) => {
    // Save current scroll position before opening letter
    scrollPositionRef.current = window.scrollY;
    setSelectedLetter(letter);
  };

  const handleBackToDashboard = () => {
    setSelectedLetter(null);
  };

  if (selectedLetter) {
    return (
      <LetterViewer 
        letter={selectedLetter} 
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen love-letters-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <HeartLock onLogout={onLogout} />
        </div>
        <div className="text-center mb-12 px-4">
          <p className="text-base sm:text-lg text-white/90 italic mb-8 font-light leading-relaxed">
            "I'm sorry, I'm not there live, But babe I'm just a click away."
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
           ᕼEᒪᒪO ᒪOᐯE,
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4 max-w-7xl mx-auto px-4">
          {Object.entries(letterCategories).map(([categoryKey, category]) => (
            <Envelope
              key={categoryKey}
              title={category.title}
              tag={category.tag}
              onClick={() => handleLetterOpen(category.letters[0])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LettersDashboard;
