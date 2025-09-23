import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, BookOpen, Send, User, Bell, Download, BellOff, Edit, Trash2, X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { usePWAInstall } from "@/hooks/usePWAInstall";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  
  
  const { 
    permission, 
    requestPermission, 
    unsubscribe, 
    isSupported, 
    loading: notificationLoading,
    error: notificationError,
    retry: retryNotifications,
    forceReset: resetNotifications
  } = usePushNotifications();
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  useEffect(() => {
    fetchEntries();
    
    // Store current author name to avoid self-notifications
    const currentAuthor = localStorage.getItem('currentAuthor') || '';
    
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
          const newEntry = payload.new as JournalEntry;
          setEntries(prev => [newEntry, ...prev]);
          
          // Only show notification if it's not from the current user
          if (newEntry.author_name !== currentAuthor && permission === 'granted' && 'serviceWorker' in navigator) {
            // Send message to service worker to show notification
            navigator.serviceWorker.ready.then(registration => {
              if (registration.active) {
                registration.active.postMessage({
                  type: 'SHOW_NOTIFICATION',
                  data: {
                    title: `New entry from ${newEntry.author_name}! 💕`,
                    body: newEntry.content.substring(0, 100) + (newEntry.content.length > 100 ? '...' : ''),
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'journal-entry',
                    data: { url: '/' },
                    requireInteraction: true,
                    actions: [
                      {
                        action: 'open',
                        title: 'Read Entry',
                        icon: '/favicon.ico'
                      }
                    ]
                  }
                });
              }
            }).catch(error => {
              console.error('Error sending notification:', error);
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [permission]);

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
      // Store current author for notification filtering
      localStorage.setItem('currentAuthor', authorName.trim());
      
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) return;
    
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntries(prev => prev.filter(entry => entry.id !== id));
      toast.success("Journal entry deleted");
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast.error("Could not delete journal entry");
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editContent.trim()) return;

    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ content: editContent.trim() })
        .eq('id', id);

      if (error) throw error;

      setEntries(prev => prev.map(entry => 
        entry.id === id 
          ? { ...entry, content: editContent.trim(), updated_at: new Date().toISOString() }
          : entry
      ));
      setEditingId(null);
      setEditContent("");
      toast.success("Journal entry updated");
    } catch (error) {
      console.error('Error updating journal entry:', error);
      toast.error("Could not update journal entry");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-pink-600">Shared Journal</span>
            </div>
            <div className="flex items-center gap-2">
              {isSupported && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={permission === 'granted' ? unsubscribe : requestPermission}
                    disabled={notificationLoading}
                    className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                  >
                    {permission === 'granted' ? (
                      <>
                        <BellOff className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Disable</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Notify</span>
                      </>
                    )}
                  </Button>
                  {notificationError && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={retryNotifications}
                        disabled={notificationLoading}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        title={`Retry notifications: ${notificationError}`}
                      >
                        <Bell className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Retry</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetNotifications}
                        disabled={notificationLoading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Force reset notification state"
                      >
                        <X className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Reset</span>
                      </Button>
                    </>
                  )}
                </>
              )}
              {isInstallable && !isInstalled && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={installApp}
                  className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Install</span>
                </Button>
              )}
            </div>
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {formatDate(entry.created_at)}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(entry)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-pink-600"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingId === entry.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(entry.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {entry.content}
                  </div>
                )}
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
