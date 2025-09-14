import { useState } from "react";
import { Heart, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HeartLockProps {
 onLogout: () => void;
 className?: string;
}

const HeartLock = ({ onLogout, className }: HeartLockProps) => {
 const [isLocking, setIsLocking] = useState(false);

 const handleLogout = () => {
 setIsLocking(true);
 setTimeout(() => {
 onLogout();
 setIsLocking(false);
 }, 2000); // Extended to allow for the complete animation
 };

 return (
 <div className={cn("relative", className)}>
 <AnimatePresence>
 {isLocking && (
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.5 }}
 className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg"
 >
 <div className="text-center">
 <motion.div
 animate={{ 
 rotate: [0, -10, 10, -10, 0],
 scale: [1, 1.1, 1]
 }}
 transition={{ 
 duration: 1.5,
 repeat: 1,
 ease: "easeInOut"
 }}
 className="mx-auto mb-4"
 >
 <Heart className="w-12 h-12 text-pink-500 fill-pink-200" />
 </motion.div>
 <motion.p
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5 }}
 className="text-pink-600 font-medium"
 >
 Locking our special place...
 </motion.p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 <Button
 variant="ghost"
 size="sm"
 onClick={handleLogout}
 disabled={isLocking}
 className={cn(
 "group relative overflow-hidden transition-all duration-300",
 "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200",
 "focus:ring-2 focus:ring-pink-200 focus:outline-none",
 "disabled:opacity-50 disabled:cursor-not-allowed",
 className
 )}
 >
 <motion.div
 className="flex items-center gap-2"
 whileTap={{ scale: 0.95 }}
 >
 <div className="relative">
 <Lock className="w-4 h-4 transition-transform group-hover:scale-110" />
 <motion.div
 className="absolute -top-1 -right-1"
 initial={{ scale: 0 }}
 animate={{ scale: isLocking ? 0 : 1 }}
 transition={{ delay: 0.1 }}
 >
 <Heart className="w-2 h-2 text-pink-400 fill-pink-400" />
 </motion.div>
 </div>
 
 <span className="text-sm font-medium">
 {isLocking ? "Locking..." : "Lock"}
 </span>
 
 <LogOut className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
 </motion.div>

 {/* Subtle gradient overlay on hover */}
 <motion.div
 className="absolute inset-0 bg-gradient-to-r from-pink-100/0 via-pink-100/50 to-pink-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
 initial={false}
 />
 </Button>
 </div>
 );
};

export default HeartLock;
