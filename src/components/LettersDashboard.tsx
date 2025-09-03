import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import LetterViewer from "./LetterViewer";
import Envelope from "./Envelope";
import { letterCategories, Letter } from "@/data/letters";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard = ({ onLogout }: LettersDashboardProps) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  if (selectedLetter) {
    return (
      <LetterViewer 
        letter={selectedLetter} 
        onBack={() => setSelectedLetter(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen love-letters-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="text-center mb-12">
          <p className="text-lg text-white/90 italic mb-8 font-light">
            "I'm sorry, I'm not there live, But babe I'm always here for you."
          </p>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            READ WHEN YOU
          </h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {Object.entries(letterCategories).map(([categoryKey, category]) => (
            <Envelope
              key={categoryKey}
              title={category.title}
              tag={category.tag}
              onClick={() => setSelectedLetter(category.letters[0])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LettersDashboard;
