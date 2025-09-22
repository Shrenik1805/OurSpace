import { useState, useEffect } from "react";
import CodeEntry from "@/components/CodeEntry";
import LettersDashboard from "@/components/LettersDashboard";
import LoadingSpinner from "@/components/LoadingSpinner";
import BackgroundMusic from "@/components/BackgroundMusic";
import { analytics } from "@/utils/analytics";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analytics.page('home');
    
    const authStatus = localStorage.getItem("loveLettersAuth");
    const authTimestamp = localStorage.getItem("authTimestamp");

    if (authStatus === "true" && authTimestamp) {
      const authTime = parseInt(authTimestamp);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - authTime > twentyFourHours) {
        localStorage.removeItem("loveLettersAuth");
        localStorage.removeItem("authTimestamp");
        setIsAuthenticated(false);
        analytics.track('session_expired');
      } else {
        setIsAuthenticated(true);
        analytics.track('session_resumed');
      }
    }
    setLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    analytics.track('login_success');
  };

  const handleLogout = () => {
    localStorage.removeItem("loveLettersAuth");
    localStorage.removeItem("authTimestamp");
    setIsAuthenticated(false);
    analytics.track('logout');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <CodeEntry onAuthenticated={handleAuthenticated} />;
  }

  return (
    <>
      <LettersDashboard onLogout={handleLogout} />
      <BackgroundMusic playOnLogin={true} />
    </>
  );
};

export default Index;
