// Simple analytics utility for tracking user interactions
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean;

  constructor() {
    // Disable analytics in development or if user opts out
    this.isEnabled = process.env.NODE_ENV === 'production' && 
                     localStorage.getItem('analytics-enabled') !== 'false';
  }

  track(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...properties
      }
    };

    // In a real app, you'd send this to your analytics service
    console.log('Analytics Event:', event);
    
    // Store locally for debugging (remove in production)
    const events = JSON.parse(localStorage.getItem('analytics-events') || '[]');
    events.push(event);
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    localStorage.setItem('analytics-events', JSON.stringify(events));
  }

  page(pageName: string, properties?: Record<string, any>) {
    this.track('page_view', {
      page: pageName,
      ...properties
    });
  }

  setUserProperties(properties: Record<string, any>) {
    if (!this.isEnabled) return;
    
    const userProps = JSON.parse(localStorage.getItem('user-properties') || '{}');
    const updatedProps = { ...userProps, ...properties };
    localStorage.setItem('user-properties', JSON.stringify(updatedProps));
  }

  optOut() {
    this.isEnabled = false;
    localStorage.setItem('analytics-enabled', 'false');
    localStorage.removeItem('analytics-events');
    localStorage.removeItem('user-properties');
  }

  optIn() {
    this.isEnabled = true;
    localStorage.setItem('analytics-enabled', 'true');
  }
}

export const analytics = new Analytics();
