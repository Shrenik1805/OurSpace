import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full bg-white/80 backdrop-blur-sm shadow-xl border-rose-200">
        <CardHeader className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center mb-4"
          >
            <Heart className="h-16 w-16 text-rose-500 fill-rose-500" />
          </motion.div>

          <CardTitle className="text-4xl font-bold text-rose-800 mb-2">
            404
          </CardTitle>

          <h2 className="text-2xl font-semibold text-rose-700">
            Love Letter Not Found
          </h2>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <p className="text-gray-600 text-lg">
            Oops! It seems like this love letter got lost in the mail. 
            Don't worry though - there are plenty more waiting for you at home.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate("/")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Love Letters
            </Button>
          </motion.div>

          <p className="text-rose-600 text-sm italic">
            "Distance means nothing when someone means everything" 💕
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
