import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, BookOpen, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
 toast.error("Could not load journal entries");
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
 toast.success("Your journal entry has been shared");
 } catch (error) {
 console.error('Error adding journal entry:', error);
 toast.error("Could not add journal entry");
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
 <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
 {/* Header */}
 <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-pink-200/30">
 <div className="container mx-auto px-4 py-4">
 <div className="flex items-center justify-between">
 <Button
 variant="ghost"
 size="sm"
 onClick={onBack}
 className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
 >
 <ArrowLeft className="w-4 h-4 mr-2" />
 Back to Letters
 </Button>
 <div className="flex items-center gap-2">
 <BookOpen className="w-5 h-5 text-pink-500" />
 <span className="text-sm font-medium text-pink-600">Shared Journal</span>
 </div>
 </div>
 </div>
 </div>

 <div className="container mx-auto px-4 py-8 max-w-4xl">
 {/* Title */}
 <div className="text-center mb-12">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6">
 <Heart className="w-8 h-8 text-white" />
 </div>
 <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
 Our Shared Journal
 </h1>
 <p className="text-gray-600 max-w-2xl mx-auto">
 A space for us to share thoughts, memories, and moments together
 </p>
 </div>

 {/* Add new entry form */}
 <Card className="mb-8 border-pink-200/50 shadow-lg">
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-pink-600">
 <Send className="w-5 h-5" />
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
 <div className="flex gap-2 mt-2">
 <Button
 type="button"
 variant={authorName === "Shrenik" ? "default" : "outline"}
 onClick={() => setAuthorName("Shrenik")}
 className="flex-1"
 >
 Shrenik
 </Button>
 <Button
 type="button"
 variant={authorName === "Tanya" ? "default" : "outline"}
 onClick={() => setAuthorName("Tanya")}
 className="flex-1"
 >
 Tanya
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
 <Button type="submit" disabled={submitting} className="w-full">
 {submitting ? "Sharing..." : "Share Entry"}
 </Button>
 </form>
 </CardContent>
 </Card>

 {/* Journal entries */}
 <div className="space-y-6">
 {loading ? (
 <Card className="p-8 text-center">
 <p className="text-gray-500">Loading journal entries...</p>
 </Card>
 ) : entries.length === 0 ? (
 <Card className="p-8 text-center">
 <Heart className="w-12 h-12 text-pink-300 mx-auto mb-4" />
 <p className="text-gray-500">
 No entries yet. Be the first to share your thoughts!
 </p>
 </Card>
 ) : (
 entries.map((entry) => (
 <Card key={entry.id} className="border-pink-200/50 shadow-sm hover:shadow-md transition-shadow">
 <CardHeader className="pb-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <User className="w-4 h-4 text-pink-500" />
 <span className="font-medium text-pink-600">
 {entry.author_name}
 </span>
 </div>
 <span className="text-xs text-gray-500">
 {formatDate(entry.created_at)}
 </span>
 </div>
 </CardHeader>
 <CardContent>
 <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
 {entry.content}
 </div>
 </CardContent>
 </Card>
 ))
 )}
 </div>
 </div>
 </div>
 );
};

export default SharedJournal;
