import { useEffect } from 'react';

// Performance monitoring for production
export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
            console.log('CLS:', clsValue);
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Monitor memory usage (if available)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('Memory Usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        });
      }
    };

    // Monitor long tasks
    const observeLongTasks = () => {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.warn('Long task detected:', entry.duration + 'ms');
        });
      }).observe({ entryTypes: ['longtask'] });
    };

    // Only run in production
    if (process.env.NODE_ENV === 'production') {
      observeWebVitals();
      monitorMemory();
      observeLongTasks();

      // Monitor every 30 seconds
      const interval = setInterval(monitorMemory, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  return null;
};