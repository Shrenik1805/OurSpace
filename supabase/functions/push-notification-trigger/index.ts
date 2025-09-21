import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Push notification trigger received');

    // This function will be called by database notifications
    // Listen for pg_notify messages from the database
    const { title, body, url } = await req.json();

    console.log('Triggering push notifications:', { title, body, url });

    // Call the send-push-notifications function
    const response = await supabase.functions.invoke('send-push-notifications', {
      body: { title, body, url }
    });

    if (response.error) {
      console.error('Error calling send-push-notifications:', response.error);
      throw response.error;
    }

    console.log('Push notifications triggered successfully:', response.data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Push notifications triggered',
      data: response.data 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in push-notification-trigger function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});