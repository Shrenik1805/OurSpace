import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, BookOpen, Send, User, Sparkles, Quote } from "lucide-react";
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
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchEntries();
    
    // Set up real-time subscription for new entries
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
          toast({
            title: "New Entry Added",
            description: `${payload.new.author_name} shared a new thought`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

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
        title: "Connection Issue",
        description: "Could not load journal entries. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim() || !authorName.trim() || submitting) return;

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
        title: "Entry Added! 💕",
        description: "Your thoughts have been shared with love",
      });
    } catch (error) {
      console.error('Error adding journal entry:', error);
      toast({
        title: "Failed to Save",
        description: "Could not save your entry. Please try again.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-full px-6 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Letters
          </Button>

          <Card className="card-romantic">
            <CardHeader className="text-center pb-6 pt-8">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-5xl mb-4"
              >
                📖
              </motion.div>

              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                <BookOpen className="inline-block w-8 h-8 mr-3 text-purple-500" />
                Our Shared Journal
              </CardTitle>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                A sacred space where we share our thoughts, dreams, and moments together. 
                Every entry is a piece of our story. 💕
              </p>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Add new entry form */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="card-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Share Your Heart
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Author selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-700">
                    Who's writing today?
                  </Label>
                  <div className="flex gap-3">
                    {["Shreya", "Shrenik"].map((name) => (
                      <motion.div
                        key={name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          variant={authorName === name ? "default" : "outline"}
                          onClick={() => setAuthorName(name)}
                          className={`transition-all duration-300 ${
                            authorName === name
                              ? "btn-romantic"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <User className="w-4 h-4 mr-2" />
                          {name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Entry content */}
                <div className="space-y-3">
                  <Label htmlFor="entry-content" className="text-base font-medium text-gray-700">
                    What's in your heart today?
                  </Label>
                  <Textarea
                    id="entry-content"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="Share your thoughts, dreams, or just how you're feeling right now..."
                    rows={4}
                    required
                    disabled={submitting}
                    className="input-romantic text-base leading-relaxed resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    {newEntry.length}/1000 characters
                  </p>
                </div>

                {/* Submit button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={!newEntry.trim() || !authorName.trim() || submitting}
                    className="btn-romantic w-full py-6 text-lg"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sharing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Share This Moment
                        <Heart className="w-5 h-5 fill-current" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journal entries */}
        <motion.div variants={itemVariants} className="space-y-6">
          {loading ? (
            <Card className="card-romantic">
              <CardContent className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-4xl mb-4"
                >
                  📖
                </motion.div>
                <p className="text-gray-600 text-lg">Loading your shared memories...</p>
              </CardContent>
            </Card>
          ) : entries.length === 0 ? (
            <Card className="card-romantic">
              <CardContent className="text-center py-12">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl mb-6"
                >
                  📝
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your Story Starts Here
                </h3>
                <p className="text-gray-600">
                  Be the first to share a thought and begin your beautiful journey together.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
                <Quote className="w-6 h-6 text-purple-500" />
                Our Shared Stories
                <Quote className="w-6 h-6 text-purple-500 scale-x-[-1]" />
              </h3>
              
              <AnimatePresence>
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="card-romantic hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2
                            }}
                            className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                          >
                            {entry.author_name.charAt(0)}
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-lg text-gray-800">
                                {entry.author_name}
                              </h4>
                              <time className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {formatDate(entry.created_at)}
                              </time>
                            </div>
                            
                            <div className="prose prose-lg max-w-none">
                              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {entry.content}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Entry decoration */}
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                          <motion.div
                            animate={{
                              y: [0, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-xl opacity-60"
                          >
                            💕
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SharedJournal;
