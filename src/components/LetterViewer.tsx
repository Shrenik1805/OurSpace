import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect } from "react";

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
  // Automatically scroll to top when the letter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [letter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-rose-600 hover:text-rose-800 hover:bg-rose-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Letters
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-rose-200">
          <CardHeader className="text-center border-b border-rose-200 bg-gradient-to-r from-rose-100 to-pink-100">
            <div className="flex justify-center mb-4">
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            </div>
            <h1 className="text-3xl font-bold text-rose-800 mb-2">
              {letter.title}
            </h1>
            {letter.date && (
              <p className="text-rose-600 text-sm italic">
                Written with love on {letter.date}
              </p>
            )}
          </CardHeader>

          <CardContent className="p-8">
            <div 
              className="prose prose-rose max-w-none text-gray-700 leading-relaxed"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {letter.content}
            </div>

            <div className="mt-8 text-center">
              <p className="text-rose-600 italic font-medium">
                Always yours
              </p>
              <div className="flex justify-center mt-2">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LetterViewer;
