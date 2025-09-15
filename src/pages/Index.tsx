import { useState, useEffect } from "react";
import CodeEntry from "@/components/CodeEntry";
import LettersDashboard from "@/components/LettersDashboard";
import LoadingSpinner from "@/components/LoadingSpinner";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } else {
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loveLettersAuth");
    localStorage.removeItem("authTimestamp");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <CodeEntry onAuthenticated={handleAuthenticated} />;
  }

  return <LettersDashboard onLogout={handleLogout} />;
};

export default Index;
