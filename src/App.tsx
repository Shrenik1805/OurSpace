import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BackgroundMusic from "./components/BackgroundMusic";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const authStatus = localStorage.getItem("loveLettersAuth");
    const authTimestamp = localStorage.getItem("authTimestamp");

    // Check if auth is expired (24 hours)
    if (authStatus === "true" && authTimestamp) {
      const authTime = parseInt(authTimestamp);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - authTime > twentyFourHours) {
        localStorage.removeItem("loveLettersAuth");
        localStorage.removeItem("authTimestamp");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const handleStorageChange = () => {
      const authStatus = localStorage.getItem("loveLettersAuth");
      setIsAuthenticated(authStatus === "true");
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for auth changes within the same tab
    const interval = setInterval(() => {
      const authStatus = localStorage.getItem("loveLettersAuth");
      const currentAuth = authStatus === "true";
      if (currentAuth !== isAuthenticated) {
        setIsAuthenticated(currentAuth);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              {/* Background Music - only show when authenticated */}
              {isAuthenticated && (
                <BackgroundMusic playOnLogin={isAuthenticated} />
              )}

              {/* Toast notifications */}
              <Toaster />
              <Sonner />
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
