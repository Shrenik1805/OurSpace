import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!;
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Push notification request received');

    const { title, body, url = '/', targetEndpoint } = await req.json();

    // Get all push subscriptions or specific one
    let subscriptionsQuery = supabase
      .from('push_subscriptions')
      .select('*');
    
    if (targetEndpoint) {
      subscriptionsQuery = subscriptionsQuery.eq('endpoint', targetEndpoint);
    }

    const { data: subscriptions, error: fetchError } = await subscriptionsQuery;

    if (fetchError) {
      console.error('Error fetching subscriptions:', fetchError);
      throw fetchError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No push subscriptions found');
      return new Response(JSON.stringify({ message: 'No subscriptions found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Sending push notifications to ${subscriptions.length} subscribers`);

    const results = await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        try {
          const notificationPayload = {
            title,
            body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            data: { url },
            actions: [
              {
                action: 'open',
                title: 'Open',
                icon: '/favicon.ico'
              }
            ],
            tag: 'journal-entry',
            renotify: true,
            requireInteraction: true,
            silent: false,
            vibrate: [200, 100, 200]
          };

          // Create the push message
          const pushMessage = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
            payload: JSON.stringify(notificationPayload),
            vapidDetails: {
              subject: 'mailto:support@hellolove.com',
              publicKey: vapidPublicKey,
              privateKey: vapidPrivateKey,
            },
          };

          // Send push notification using web-push protocol
          const response = await sendWebPushNotification(pushMessage);
          
          if (!response.ok) {
            console.error(`Failed to send notification to ${subscription.endpoint}:`, response.status);
            
            // If subscription is invalid (410 Gone), remove it
            if (response.status === 410) {
              await supabase
                .from('push_subscriptions')
                .delete()
                .eq('endpoint', subscription.endpoint);
              console.log(`Removed invalid subscription: ${subscription.endpoint}`);
            }
            
            throw new Error(`Push failed with status: ${response.status}`);
          }

          console.log(`Successfully sent push notification to ${subscription.endpoint}`);
          return { success: true, endpoint: subscription.endpoint };
        } catch (error) {
          console.error(`Failed to send push to ${subscription.endpoint}:`, error);
          return { success: false, endpoint: subscription.endpoint, error: error.message };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`Push notifications sent: ${successful} successful, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        message: 'Push notifications processed',
        successful,
        failed,
        results: results.map(r => r.status === 'fulfilled' ? r.value : { success: false, error: r.reason })
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in send-push-notifications function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to send web push notification
async function sendWebPushNotification(pushMessage: any) {
  const { endpoint, keys, payload, vapidDetails } = pushMessage;

  // Prepare the headers for the push request
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Content-Encoding': 'aes128gcm',
    'TTL': '86400', // 24 hours
  };

  // Add VAPID authentication
  const vapidHeader = await generateVapidAuth(endpoint, vapidDetails);
  if (vapidHeader) {
    headers['Authorization'] = vapidHeader;
  }

  // Send the push notification
  return await fetch(endpoint, {
    method: 'POST',
    headers,
    body: payload,
  });
}

// Helper function to generate VAPID authentication header
async function generateVapidAuth(endpoint: string, vapidDetails: any) {
  try {
    // This is a simplified VAPID implementation
    // In production, you'd want to use a proper VAPID library
    const { subject, publicKey, privateKey } = vapidDetails;
    
    // For now, return a basic auth header
    // In a full implementation, you'd generate a proper JWT token
    return `vapid t=${publicKey}, k=${privateKey}`;
  } catch (error) {
    console.error('Error generating VAPID auth:', error);
    return null;
  }
}