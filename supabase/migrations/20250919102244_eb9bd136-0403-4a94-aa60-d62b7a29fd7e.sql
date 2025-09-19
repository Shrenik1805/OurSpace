-- Create push_subscriptions table to store user notification subscriptions
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for push_subscriptions
CREATE POLICY "Anyone can insert push subscriptions" 
ON public.push_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view push subscriptions" 
ON public.push_subscriptions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can delete push subscriptions" 
ON public.push_subscriptions 
FOR DELETE 
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_push_subscriptions_updated_at
BEFORE UPDATE ON public.push_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to send push notifications
CREATE OR REPLACE FUNCTION public.send_push_notification(
  p_title TEXT,
  p_body TEXT,
  p_url TEXT DEFAULT '/'
) RETURNS void AS $$
BEGIN
  -- This function will be called by the database trigger
  -- The actual push sending will be handled by the edge function
  PERFORM pg_notify('push_notification', json_build_object(
    'title', p_title,
    'body', p_body,
    'url', p_url
  )::text);
END;
$$ LANGUAGE plpgsql;

-- Create trigger function to send notifications when new journal entries are added
CREATE OR REPLACE FUNCTION public.notify_new_journal_entry()
RETURNS TRIGGER AS $$
BEGIN
  -- Send push notification for new journal entry
  PERFORM public.send_push_notification(
    'HelloLove - New Entry! 💕',
    'New journal entry from ' || NEW.author_name || ': ' || 
    CASE 
      WHEN length(NEW.content) > 50 
      THEN substring(NEW.content from 1 for 50) || '...'
      ELSE NEW.content
    END,
    '/'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically send notifications on new journal entries
CREATE TRIGGER trigger_notify_new_journal_entry
  AFTER INSERT ON public.journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_journal_entry();