import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Sun, CloudRain, Coffee, Moon, LogOut } from "lucide-react";
import LetterViewer from "./LetterViewer";
import { letterCategories } from "@/data/letters";

interface LettersDashboardProps {
  onLogout: () => void;
}

const LettersDashboard = ({ onLogout }: LettersDashboardProps) => {
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  const categoryIcons = {
    anxiety: CloudRain,
    happy: Sun,
    encouragement: Sparkles,
    daily: Coffee,
    goodnight: Moon,
    random: Heart
  };

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
        <div className="flex justify-between items-center mb-8">
          <div className="text-center mx-auto">
            <h1 className="text-4xl font-serif text-foreground mb-2">
              Letters from Your Love
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose what your heart needs to hear today
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-primary/30 hover:bg-primary/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Lock
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(letterCategories).map(([categoryKey, category]) => {
            const IconComponent = categoryIcons[categoryKey as keyof typeof categoryIcons];
            
            return (
              <Card 
                key={categoryKey} 
                className="bg-gradient-letter border-primary/20 shadow-gentle hover:shadow-letter transition-all duration-300 cursor-pointer group"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif text-foreground">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.letters.map((letter, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-primary/5 group/letter"
                        onClick={() => setSelectedLetter(letter)}
                      >
                        <div>
                          <div className="font-medium text-foreground group-hover/letter:text-primary transition-colors">
                            {letter.title}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {letter.preview}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LettersDashboard;