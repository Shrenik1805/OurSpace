import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundMusicProps {
 playOnLogin?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ playOnLogin = false }) => {
 const audioRef = useRef<HTMLAudioElement>(null);
 const [isMuted, setIsMuted] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 // Start playing ONLY after user logs in (user-triggered event)
 useEffect(() => {
 const audio = audioRef.current;
 if (!audio || !playOnLogin) return;

 const initializeAudio = async () => {
 setIsLoading(true);
 try {
 audio.volume = 0.15; // Slightly lower volume
 audio.muted = isMuted;
 audio.loop = true; // Ensure music loops

 const playPromise = audio.play();
 if (playPromise !== undefined) {
 await playPromise;
 setIsPlaying(true);
 }
 } catch (error) {
 console.log("Auto-play blocked by browser; user can manually start");
 } finally {
 setIsLoading(false);
 }
 };

 initializeAudio();
 }, [playOnLogin, isMuted]);

 // Handle audio events
 useEffect(() => {
 const audio = audioRef.current;
 if (!audio) return;

 const handlePlay = () => setIsPlaying(true);
 const handlePause = () => setIsPlaying(false);
 const handleLoadStart = () => setIsLoading(true);
 const handleCanPlay = () => setIsLoading(false);

 audio.addEventListener('play', handlePlay);
 audio.addEventListener('pause', handlePause);
 audio.addEventListener('loadstart', handleLoadStart);
 audio.addEventListener('canplay', handleCanPlay);

 return () => {
 audio.removeEventListener('play', handlePlay);
 audio.removeEventListener('pause', handlePause);
 audio.removeEventListener('loadstart', handleLoadStart);
 audio.removeEventListener('canplay', handleCanPlay);
 };
 }, []);

 // Toggle play/pause
 const togglePlayPause = () => {
 const audio = audioRef.current;
 if (!audio) return;

 if (isPlaying) {
 audio.pause();
 } else {
 audio.play().catch(() => {
 console.log("Could not play audio");
 });
 }
 };

 // Toggle mute on/off
 const toggleMute = () => {
 const audio = audioRef.current;
 if (!audio) return;

 const newMutedState = !isMuted;
 audio.muted = newMutedState;
 setIsMuted(newMutedState);
 };

 return (
 <div className="fixed bottom-4 right-4 z-50 flex gap-2">
 <audio
 ref={audioRef}
 src="/ambient-music.mp3"
 preload="metadata"
 >
 Your browser does not support the audio element.
 </audio>

 {/* Play/Pause Button */}
 <Button
 variant="outline"
 size="sm"
 onClick={togglePlayPause}
 disabled={isLoading}
 className="bg-white/90 backdrop-blur-sm hover:bg-white/95 border-pink-200/50 text-pink-600 hover:text-pink-700"
 >
 <AnimatePresence mode="wait">
 {isLoading ? (
 <motion.div
 key="loading"
 initial={{ opacity: 0, rotate: 0 }}
 animate={{ opacity: 1, rotate: 360 }}
 exit={{ opacity: 0 }}
 transition={{ repeat: Infinity, duration: 1 }}
 className="w-4 h-4 border-2 border-pink-300 border-t-pink-600 rounded-full"
 />
 ) : isPlaying ? (
 <motion.div
 key="pause"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.8 }}
 >
 <Pause className="w-4 h-4" />
 </motion.div>
 ) : (
 <motion.div
 key="play"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.8 }}
 >
 <Play className="w-4 h-4" />
 </motion.div>
 )}
 </AnimatePresence>
 </Button>

 {/* Mute/Unmute Button */}
 <Button
 variant="outline"
 size="sm"
 onClick={toggleMute}
 className="bg-white/90 backdrop-blur-sm hover:bg-white/95 border-pink-200/50 text-pink-600 hover:text-pink-700"
 >
 <AnimatePresence mode="wait">
 {isMuted ? (
 <motion.div
 key="muted"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.8 }}
 >
 <VolumeX className="w-4 h-4" />
 </motion.div>
 ) : (
 <motion.div
 key="unmuted"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.8 }}
 >
 <Volume2 className="w-4 h-4" />
 </motion.div>
 )}
 </AnimatePresence>
 </Button>
 </div>
 );
};

export default BackgroundMusic;
