-- Fix security warnings by setting search_path for functions

-- Update send_push_notification function with proper search_path
CREATE OR REPLACE FUNCTION public.send_push_notification(
  p_title TEXT,
  p_body TEXT,
  p_url TEXT DEFAULT '/'
) 
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function will be called by the database trigger
  -- The actual push sending will be handled by the edge function
  PERFORM pg_notify('push_notification', json_build_object(
    'title', p_title,
    'body', p_body,
    'url', p_url
  )::text);
END;
$$;

-- Update notify_new_journal_entry function with proper search_path
CREATE OR REPLACE FUNCTION public.notify_new_journal_entry()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;