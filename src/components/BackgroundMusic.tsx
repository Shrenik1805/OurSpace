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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-love">
        <audio
          ref={audioRef}
          preload="auto"
          src="/ambient-music.mp3"
          aria-label="Background ambient music"
        >
          Your browser does not support the audio element.
        </audio>

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlayPause}
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          disabled={isLoading}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
              />
            ) : isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Pause className="w-4 h-4 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Play className="w-4 h-4 text-primary ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Mute/Unmute Button */}
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          <motion.div
            animate={{ scale: isMuted ? 0.8 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-primary" />
            ) : (
              <Volume2 className="w-4 h-4 text-primary" />
            )}
          </motion.div>
        </Button>
      </div>
    </motion.div>
  );
};

export default BackgroundMusic;
