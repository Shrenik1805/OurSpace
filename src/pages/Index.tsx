import { useState, useEffect } from "react";
import CodeEntry from "@/components/CodeEntry";
import LettersDashboard from "@/components/LettersDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("loveLettersAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loveLettersAuth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <CodeEntry onAuthenticated={handleAuthenticated} />;
  }

  return <LettersDashboard onLogout={handleLogout} />;
};

export default Index;
