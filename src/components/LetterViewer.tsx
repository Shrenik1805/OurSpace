import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

interface Letter {
  title: string;
  content: string;
  date?: string;
  preview: string;
}

interface LetterViewerProps {
  letter: Letter;
  onBack: () => void;
}

const LetterViewer = ({ letter, onBack }: LetterViewerProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Letters
          </Button>

          <Card className="bg-gradient-letter border-primary/20 shadow-letter">
            <CardHeader className="text-center border-b border-primary/10">
              <div className="flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary mr-2" fill="currentColor" />
                <h1 className="text-2xl font-serif text-foreground">
                  {letter.title}
                </h1>
              </div>
              {letter.date && (
                <p className="text-sm text-muted-foreground">
                  Written with love on {letter.date}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed font-serif text-lg">
                  {letter.content}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-primary/10 text-center">
                <div className="flex items-center justify-center text-primary">
                  <Heart className="h-5 w-5 mr-2" fill="currentColor" />
                  <span className="text-sm font-medium">Always yours</span>
                  <Heart className="h-5 w-5 ml-2" fill="currentColor" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LetterViewer;