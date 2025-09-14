import { useState, useEffect } from "react";
import CodeEntry from "@/components/CodeEntry";
import LettersDashboard from "@/components/LettersDashboard";
import LoadingSpinner from "@/components/LoadingSpinner";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("loveLettersAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loveLettersAuth");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen love-letters-bg flex items-center justify-center">
        <LoadingSpinner message="Preparing your letters..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <CodeEntry onAuthenticated={handleAuthenticated} />;
  }

  return <LettersDashboard onLogout={handleLogout} />;
};

export default Index;
