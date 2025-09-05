import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, BookOpen, Send } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Letters
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-3xl font-serif text-foreground">
                Our Shared Journal
              </h1>
            </div>
            <p className="text-muted-foreground">
              A space for us to share thoughts, memories, and moments together
            </p>
          </div>

          {/* Add new entry form */}
          <Card className="bg-gradient-letter border-primary/20 shadow-letter mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-primary mr-2" fill="currentColor" />
                Write a New Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="author">Your Name</Label>
                  <Input
                    id="author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Who is writing this entry?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="entry">Your Thoughts</Label>
                  <Textarea
                    id="entry"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="What's on your heart today?"
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={submitting || !newEntry.trim() || !authorName.trim()}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitting ? "Sharing..." : "Share Entry"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Journal entries */}
          <div className="space-y-6">
            {loading ? (
              <Card className="bg-gradient-letter border-primary/20">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Loading journal entries...</p>
                </CardContent>
              </Card>
            ) : entries.length === 0 ? (
              <Card className="bg-gradient-letter border-primary/20">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No entries yet. Be the first to share your thoughts!
                  </p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="bg-gradient-letter border-primary/20 shadow-letter">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-primary mr-2" fill="currentColor" />
                        <span className="font-medium text-foreground">
                          {entry.author_name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                        {entry.content}
                      </p>
                    </div>
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