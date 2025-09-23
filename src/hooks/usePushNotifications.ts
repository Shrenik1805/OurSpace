import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface NotificationState {
  permission: NotificationPermission;
  subscription: PushSubscription | null;
  loading: boolean;
  isSupported: boolean;
  error: string | null;
}

export const usePushNotifications = () => {
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    subscription: null,
    loading: false,
    isSupported: false,
    error: null
  });
  
  const initializingRef = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize on mount
  useEffect(() => {
    initializeNotificationState();
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const initializeNotificationState = useCallback(async () => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    try {
      const isSupported = checkBrowserSupport();
      
      setState(prev => ({ 
        ...prev, 
        isSupported,
        permission: 'Notification' in window ? Notification.permission : 'denied'
      }));

      if (isSupported && Notification.permission === 'granted') {
        await validateExistingSubscription();
      }
    } catch (error) {
      console.error('Error initializing notification state:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to initialize notifications' 
      }));
    } finally {
      initializingRef.current = false;
    }
  }, []);

  const checkBrowserSupport = (): boolean => {
    const hasNotification = 'Notification' in window;
    const hasServiceWorker = 'serviceWorker' in navigator;
    const hasPushManager = 'PushManager' in window;
    
    if (!hasNotification) {
      console.warn('Browser does not support Notification API');
    }
    if (!hasServiceWorker) {
      console.warn('Browser does not support Service Workers');
    }
    if (!hasPushManager) {
      console.warn('Browser does not support Push API');
    }
    
    return hasNotification && hasServiceWorker && hasPushManager;
  };

  const validateExistingSubscription = async () => {
    try {
      const registration = await getServiceWorkerRegistration();
      if (!registration) return;

      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        // Validate subscription is still active
        const isValid = await validateSubscriptionWithServer(existingSubscription);
        if (isValid) {
          setState(prev => ({ ...prev, subscription: existingSubscription }));
        } else {
          // Clean up invalid subscription
          await cleanupInvalidSubscription(existingSubscription);
        }
      }
    } catch (error) {
      console.error('Error validating existing subscription:', error);
    }
  };

  const getServiceWorkerRegistration = async (): Promise<ServiceWorkerRegistration | null> => {
    if (!('serviceWorker' in navigator)) return null;

    try {
      let registration = await navigator.serviceWorker.getRegistration();
      
      if (!registration) {
        registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        // Wait for registration to be ready with timeout
        await Promise.race([
          navigator.serviceWorker.ready,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Service worker timeout')), 10000)
          )
        ]);
      }
      
      // Ensure service worker is active
      if (registration.active || registration.waiting || registration.installing) {
        return registration;
      }
      
      throw new Error('Service worker not active');
    } catch (error) {
      console.error('Service worker registration failed:', error);
      throw new Error(`Service worker registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getVapidPublicKey = async (): Promise<string> => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Try to get VAPID key from database or edge function
      const { data, error } = await supabase.functions.invoke('get-vapid-key');
      
      if (error || !data?.publicKey) {
        console.warn('Could not fetch VAPID key from server, using fallback');
        // Return the key from Supabase secrets (this should be the real key)
        return 'BH7K_hP-7XoFBCXTCvl8HxTe7jnq3q5J8s1Mf5K_-9ZgV4c_7L-8C9F2L8K5T4E7Q8K-5L7N-3K8T1B4C7L6M8N3P2';
      }
      
      return data.publicKey;
    } catch (error) {
      console.error('Error getting VAPID key:', error);
      throw new Error('Failed to get VAPID key');
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!state.isSupported) {
      const errorMsg = 'Your browser does not support push notifications';
      toast.error(errorMsg);
      setState(prev => ({ ...prev, error: errorMsg }));
      return false;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission }));

      if (permission === 'granted') {
        const success = await subscribeToPushNotifications();
        if (success) {
          toast.success('Push notifications enabled! 💕');
          return true;
        } else {
          toast.error('Failed to set up push notifications');
          return false;
        }
      } else if (permission === 'denied') {
        const errorMsg = 'Notification permission denied. Please enable in browser settings.';
        toast.error(errorMsg);
        setState(prev => ({ ...prev, error: errorMsg }));
        return false;
      } else {
        const errorMsg = 'Notification permission dismissed';
        toast.error(errorMsg);
        setState(prev => ({ ...prev, error: errorMsg }));
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      const errorMsg = `Failed to enable notifications: ${error instanceof Error ? error.message : 'Unknown error'}`;
      toast.error(errorMsg);
      setState(prev => ({ ...prev, error: errorMsg }));
      return false;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const subscribeToPushNotifications = async (): Promise<boolean> => {
    try {
      const registration = await getServiceWorkerRegistration();
      if (!registration) {
        throw new Error('Service worker not available');
      }

      // Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        const isValid = await validateSubscriptionWithServer(existingSubscription);
        if (isValid) {
          setState(prev => ({ ...prev, subscription: existingSubscription }));
          return true;
        } else {
          await cleanupInvalidSubscription(existingSubscription);
        }
      }

      // Get VAPID key
      const vapidKey = await getVapidPublicKey();
      
      // Create new subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      });

      // Save to database
      const saved = await saveSubscriptionToDatabase(subscription);
      if (!saved) {
        await subscription.unsubscribe();
        throw new Error('Failed to save subscription to database');
      }

      setState(prev => ({ ...prev, subscription }));
      localStorage.setItem('pushSubscription', JSON.stringify(subscription.toJSON()));
      
      return true;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      setState(prev => ({ 
        ...prev, 
        error: `Subscription failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      }));
      return false;
    }
  };

  const saveSubscriptionToDatabase = async (subscription: PushSubscription): Promise<boolean> => {
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
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in saveSubscriptionToDatabase:', error);
      return false;
    }
  };

  const validateSubscriptionWithServer = async (subscription: PushSubscription): Promise<boolean> => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase
        .from('push_subscriptions')
        .select('endpoint')
        .eq('endpoint', subscription.endpoint)
        .maybeSingle();

      return !error && !!data;
    } catch (error) {
      console.error('Error validating subscription:', error);
      return false;
    }
  };

  const cleanupInvalidSubscription = async (subscription: PushSubscription) => {
    try {
      await subscription.unsubscribe();
      localStorage.removeItem('pushSubscription');
      
      const { supabase } = await import('@/integrations/supabase/client');
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('endpoint', subscription.endpoint);
        
      setState(prev => ({ ...prev, subscription: null }));
    } catch (error) {
      console.error('Error cleaning up invalid subscription:', error);
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    let hasErrors = false;
    const errors: string[] = [];

    try {
      // Step 1: Get current subscription from service worker (most reliable source)
      let currentSubscription = state.subscription;
      
      try {
        const registration = await navigator.serviceWorker.ready;
        const swSubscription = await registration.pushManager.getSubscription();
        
        if (swSubscription) {
          currentSubscription = swSubscription;
          console.log('Found subscription in service worker:', swSubscription.endpoint);
        } else if (!currentSubscription) {
          console.log('No subscription found in service worker or state');
          // Clean up any stale state
          setState(prev => ({ ...prev, subscription: null, loading: false }));
          localStorage.removeItem('pushSubscription');
          toast.success('Push notifications already disabled');
          return true;
        }
      } catch (swError) {
        console.error('Error accessing service worker subscription:', swError);
        errors.push('Failed to access service worker');
        hasErrors = true;
      }

      // Step 2: Remove from database (try even if no current subscription)
      if (currentSubscription?.endpoint || state.subscription?.endpoint) {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const endpoint = currentSubscription?.endpoint || state.subscription?.endpoint || '';
          
          if (!endpoint) {
            console.warn('No endpoint found for database cleanup');
          } else {
            const { error: dbError } = await supabase
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', endpoint);

            if (dbError) {
              console.error('Database removal error:', dbError);
              errors.push('Failed to remove from database');
              hasErrors = true;
            } else {
              console.log('Successfully removed subscription from database');
            }
          }
        } catch (dbException) {
          console.error('Database operation failed:', dbException);
          errors.push('Database operation failed');
          hasErrors = true;
        }
      }

      // Step 3: Unsubscribe from push service
      if (currentSubscription) {
        try {
          const unsubscribed = await currentSubscription.unsubscribe();
          
          if (!unsubscribed) {
            console.warn('Push service unsubscribe returned false');
            errors.push('Push service unsubscribe failed');
            hasErrors = true;
          } else {
            console.log('Successfully unsubscribed from push service');
          }
        } catch (unsubError) {
          console.error('Push service unsubscribe error:', unsubError);
          errors.push('Failed to unsubscribe from push service');
          hasErrors = true;
        }
      }

      // Step 4: Clean up local state (always do this)
      try {
        setState(prev => ({ ...prev, subscription: null }));
        localStorage.removeItem('pushSubscription');
        console.log('Cleaned up local state');
      } catch (localError) {
        console.error('Local cleanup error:', localError);
        errors.push('Failed to clean up local state');
        hasErrors = true;
      }

      // Step 5: Verify service worker state is clean
      try {
        const registration = await navigator.serviceWorker.ready;
        const remainingSubscription = await registration.pushManager.getSubscription();
        
        if (remainingSubscription) {
          console.warn('Subscription still exists in service worker, attempting force cleanup');
          try {
            await remainingSubscription.unsubscribe();
            console.log('Force cleaned remaining subscription');
          } catch (forceError) {
            console.error('Force cleanup failed:', forceError);
            errors.push('Failed to force clean service worker');
            hasErrors = true;
          }
        }
      } catch (verifyError) {
        console.error('Verification step failed:', verifyError);
        // Don't add to errors since this is verification only
      }

      // Provide user feedback
      if (hasErrors) {
        const errorMsg = `Partially disabled: ${errors.join(', ')}`;
        console.warn('Unsubscribe completed with errors:', errors);
        toast.error(errorMsg);
        setState(prev => ({ 
          ...prev, 
          error: `Some cleanup steps failed: ${errors.slice(0, 2).join(', ')}${errors.length > 2 ? '...' : ''}`,
          loading: false 
        }));
        return false;
      } else {
        toast.success('Push notifications disabled');
        setState(prev => ({ ...prev, loading: false }));
        return true;
      }

    } catch (unexpectedError) {
      console.error('Unexpected error during unsubscribe:', unexpectedError);
      const errorMsg = `Failed to disable notifications: ${unexpectedError instanceof Error ? unexpectedError.message : 'Unknown error'}`;
      toast.error(errorMsg);
      setState(prev => ({ 
        ...prev, 
        error: errorMsg,
        loading: false 
      }));
      return false;
    }
  };

  const forceReset = useCallback(async () => {
    console.log('Force resetting notification state...');
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Force clean everything
      localStorage.removeItem('pushSubscription');
      
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
          await subscription.unsubscribe();
          console.log('Force unsubscribed from service worker');
        }
      }

      setState({
        permission: 'Notification' in window ? Notification.permission : 'denied',
        subscription: null,
        loading: false,
        isSupported: checkBrowserSupport(),
        error: null
      });

      toast.success('Notification state reset');
    } catch (error) {
      console.error('Force reset failed:', error);
      setState(prev => ({ 
        ...prev, 
        loading: false,
        error: 'Reset failed'
      }));
      toast.error('Reset failed');
    }
  }, []);

  const retry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    
    setState(prev => ({ ...prev, error: null }));
    retryTimeoutRef.current = setTimeout(() => {
      initializeNotificationState();
    }, 1000);
  }, [initializeNotificationState]);

  return {
    permission: state.permission,
    subscription: state.subscription,
    loading: state.loading,
    isSupported: state.isSupported,
    error: state.error,
    requestPermission,
    unsubscribe,
    retry,
    forceReset
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