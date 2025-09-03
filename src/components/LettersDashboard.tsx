import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import LetterViewer from "./LetterViewer";
import Envelope from "./Envelope";
import { letterCategories } from "@/data/letters";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard = ({ onLogout }: LettersDashboardProps) => {
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  if (selectedLetter) {
    return (
      <LetterViewer 
        letter={selectedLetter} 
        onBack={() => setSelectedLetter(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="text-center mb-6">
              <p className="text-lg text-muted-foreground mb-4 font-serif italic">
                "I'm sorry, I'm not there live, But babe I'm always here for you."
              </p>
              <h1 className="text-5xl font-serif text-foreground mb-2 bg-gradient-romantic bg-clip-text text-transparent">
                READ WHEN YOU
              </h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-primary/30 hover:bg-primary/10 absolute top-4 right-4"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Lock
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Object.entries(letterCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="flex flex-col items-center space-y-2">
              <Envelope 
                tag={category.tag}
                onClick={() => setSelectedLetter(category.letters[0])}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LettersDashboard;