import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
 const location = useLocation();

 useEffect(() => {
 console.error(
 "404 Error: User attempted to access non-existent route:",
 location.pathname
 );
 }, [location.pathname]);

 return (
 <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
 <div className="text-center max-w-md mx-auto px-6">
 {/* 404 Icon */}
 <div className="mb-8">
 <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mb-4">
 <Heart className="w-12 h-12 text-pink-500" />
 </div>
 <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
 <h2 className="text-2xl font-semibold text-gray-600">Page Not Found</h2>
 </div>

 {/* Message */}
 <div className="mb-8">
 <p className="text-gray-500 mb-4">
 Oops! This page seems to have gotten lost in our love letters.
 </p>
 <p className="text-gray-400 text-sm">
 Don't worry, let's get you back to somewhere special.
 </p>
 </div>

 {/* Action Button */}
 <Link to="/">
 <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
 <Home className="w-4 h-4 mr-2" />
 Return to Home
 </Button>
 </Link>

 {/* Decorative Elements */}
 <div className="mt-12 opacity-30">
 <div className="flex justify-center space-x-4">
 {["💕", "💖", "💗"].map((emoji, index) => (
 <span key={index} className="text-2xl animate-pulse" style={{
 animationDelay: `${index * 0.5}s`
 }}>
 {emoji}
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
};

export default NotFound;
