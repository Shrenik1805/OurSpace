import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="hellolove-theme">
        <AccessibilityProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <PerformanceMonitor />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Background Music moved to Index to match auth state */}

                {/* Toast notifications */}
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </ErrorBoundary>
          </TooltipProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
