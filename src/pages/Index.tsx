import { useState, useEffect } from "react";
import CodeEntry from "@/components/CodeEntry";
import LettersDashboard from "@/components/LettersDashboard";

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
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!isAuthenticated) {
    return <CodeEntry onAuthenticated={handleAuthenticated} />;
  }

  return <LettersDashboard onLogout={handleLogout} />;
};

export default Index;
