import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// This will be replaced with actual VAPID key from server
const PUBLIC_VAPID_KEY = 'BH7K_hP-7XoFBCXTCvl8HxTe7jnq3q5J8s1Mf5K_-9ZgV4c_7L-8C9F2L8K5T4E7Q8K-5L7N-3K8T1B4C7L6M8N3P2';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support notifications');
      return false;
    }

    if (!('serviceWorker' in navigator)) {
      toast.error('This browser does not support service workers');
      return false;
    }

    setLoading(true);

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === 'granted') {
        await subscribeToPushNotifications();
        toast.success('Push notifications enabled! You\'ll be notified of new entries 💕');
        return true;
      } else {
        toast.error('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const subscribeToPushNotifications = async () => {
    try {
      // Register service worker if not already registered
      if ('serviceWorker' in navigator) {
        let registration = await navigator.serviceWorker.getRegistration();
        
        if (!registration) {
          registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
          // Wait for the service worker to be ready
          await navigator.serviceWorker.ready;
        }
      }
      
      const registration = await navigator.serviceWorker.ready;
      
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        setSubscription(existingSubscription);
        await saveSubscriptionToDatabase(existingSubscription);
        console.log('Using existing push subscription');
        return existingSubscription;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      });

      setSubscription(subscription);
      
      // Save subscription to database
      await saveSubscriptionToDatabase(subscription);
      
      // Store subscription in localStorage for the app to use
      localStorage.setItem('pushSubscription', JSON.stringify(subscription));
      console.log('Created new push subscription');
      
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  };

  const saveSubscriptionToDatabase = async (subscription: PushSubscription) => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const subscriptionData = {
        endpoint: subscription.endpoint,
        p256dh: subscription.toJSON().keys?.p256dh || '',
        auth: subscription.toJSON().keys?.auth || '',
        user_agent: navigator.userAgent
      };

      const { error } = await supabase
        .from('push_subscriptions')
        .upsert(subscriptionData, { 
          onConflict: 'endpoint',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving subscription to database:', error);
      } else {
        console.log('Subscription saved to database successfully');
      }
    } catch (error) {
      console.error('Error in saveSubscriptionToDatabase:', error);
    }
  };

  const unsubscribe = async () => {
    if (subscription) {
      // Remove from database
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);
      } catch (error) {
        console.error('Error removing subscription from database:', error);
      }
      
      await subscription.unsubscribe();
      setSubscription(null);
      localStorage.removeItem('pushSubscription');
      toast.success('Push notifications disabled');
    }
  };

  return {
    permission,
    subscription,
    loading,
    requestPermission,
    unsubscribe,
    isSupported: 'Notification' in window && 'serviceWorker' in navigator
  };
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}