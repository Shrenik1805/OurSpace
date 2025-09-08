import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, BookOpen, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface SharedJournalProps {
  onBack: () => void;
}

const SharedJournal = ({ onBack }: SharedJournalProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEntries();
    // Set up real-time subscription
    const channel = supabase
      .channel('journal_entries_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'journal_entries'
        },
        (payload) => {
          setEntries(prev => [payload.new as JournalEntry, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast({
        title: "Error",
        description: "Could not load journal entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim() || !authorName.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('journal_entries')
        .insert([
          {
            author_name: authorName.trim(),
            content: newEntry.trim(),
          }
        ]);

      if (error) throw error;

      setNewEntry("");
      toast({
        title: "Entry Added",
        description: "Your journal entry has been shared",
      });
    } catch (error) {
      console.error('Error adding journal entry:', error);
      toast({
        title: "Error",
        description: "Could not add journal entry",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Letters
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <Heart className="h-6 w-6 text-pink-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Shared Journal</h1>
            <p className="text-lg text-gray-600">
              A space for us to share thoughts, memories, and moments together
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Add new entry form */}
          <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Send className="h-5 w-5 mr-2" />
                Write a New Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="author" className="text-sm font-medium text-gray-700">
                    Choose Your Name
                  </Label>
                  {/* Changed from input field to button selection */}
                  <div className="flex gap-3 mt-2">
                    <Button
                      type="button"
                      variant={authorName === "TANYA" ? "default" : "outline"}
                      onClick={() => setAuthorName("TANYA")}
                      className={`flex-1 ${
                        authorName === "TANYA" 
                          ? "bg-pink-500 hover:bg-pink-600 text-white" 
                          : "border-pink-300 text-pink-600 hover:bg-pink-50"
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      TANYA
                    </Button>
                    <Button
                      type="button"
                      variant={authorName === "SHRENIK" ? "default" : "outline"}
                      onClick={() => setAuthorName("SHRENIK")}
                      className={`flex-1 ${
                        authorName === "SHRENIK" 
                          ? "bg-purple-500 hover:bg-purple-600 text-white" 
                          : "border-purple-300 text-purple-600 hover:bg-purple-50"
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      SHRENIK
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                    Your Thoughts
                  </Label>
                  <Textarea
                    id="content"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="What's on your heart today?"
                    rows={4}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={!newEntry.trim() || !authorName.trim() || submitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitting ? "Adding..." : "Add Entry"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Journal entries */}
          <div className="space-y-4">
            {loading ? (
              <Card className="border-purple-200 bg-white/60 backdrop-blur-sm">
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">Loading journal entries...</p>
                </CardContent>
              </Card>
            ) : entries.length === 0 ? (
              <Card className="border-purple-200 bg-white/60 backdrop-blur-sm">
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No entries yet. Be the first to share your thoughts!
                  </p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="border-purple-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-pink-500 mr-2" />
                        <span className="font-semibold text-purple-800">
                          {entry.author_name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedJournal;
