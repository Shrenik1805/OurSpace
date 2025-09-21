-- Update the notify function to call the edge function instead of just pg_notify
CREATE OR REPLACE FUNCTION public.notify_new_journal_entry()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_payload json;
BEGIN
  -- Prepare notification data
  notification_payload := json_build_object(
    'title', 'HelloLove - New Entry! 💕',
    'body', 'New journal entry from ' || NEW.author_name || ': ' || 
      CASE 
        WHEN length(NEW.content) > 50 
        THEN substring(NEW.content from 1 for 50) || '...'
        ELSE NEW.content
      END,
    'url', '/'
  );

  -- Call edge function to send push notifications
  PERFORM net.http_post(
    url := 'https://mvzfubvshnazndkecuup.supabase.co/functions/v1/send-push-notifications',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('request.jwt.claims')::json->>'role' || '"}'::jsonb,
    body := notification_payload::jsonb
  );
  
  RETURN NEW;
END;
$$;