import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundMusicProps {
  playOnLogin?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ playOnLogin = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setAudioError(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setAudioError(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsLoading(false);
      setAudioError(true);
      setIsPlaying(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    // Add event listeners
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Set initial properties
    audio.volume = 0.15;
    audio.loop = true;
    audio.preload = 'auto';

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle auto-play after user login (requires user interaction)
  useEffect(() => {
    if (!playOnLogin || !hasUserInteracted || audioError) return;

    const audio = audioRef.current;
    if (!audio) return;

    const attemptAutoPlay = async () => {
      try {
        setIsLoading(true);
        await audio.play();
      } catch (error) {
        console.log("Auto-play blocked by browser - user needs to manually start music");
        setIsLoading(false);
      }
    };

    // Small delay to ensure audio is ready
    const timeoutId = setTimeout(attemptAutoPlay, 500);
    return () => clearTimeout(timeoutId);
  }, [playOnLogin, hasUserInteracted, audioError]);

  // Handle user interaction to enable autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Toggle play/pause
  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    setHasUserInteracted(true);

    try {
      if (isPlaying) {
        await audio.pause();
      } else {
        setIsLoading(true);
        await audio.play();
      }
    } catch (error) {
      console.error("Could not play/pause audio:", error);
      setIsLoading(false);
      setAudioError(true);
    }
  };

  // Toggle mute on/off
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    const newMutedState = !isMuted;
    audio.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // Don't render if there's an audio error
  if (audioError) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <audio ref={audioRef} preload="auto">
        <source src="/ambient-music.mp3" type="audio/mpeg" />
        <source src="/ambient-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -20 }}
          className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-rose-200/50 dark:border-rose-800/50"
        >
          {/* Music Icon */}
          <div className="flex items-center justify-center w-8 h-8">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full"
              />
            ) : (
              <Music className="h-4 w-4 text-rose-500" />
            )}
          </div>

          {/* Play/Pause Button */}
          <Button
            onClick={togglePlayPause}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-full transition-colors"
            disabled={isLoading || audioError}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause className="h-4 w-4 text-rose-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play className="h-4 w-4 text-rose-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Mute/Unmute Button */}
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-full transition-colors"
            disabled={audioError}
          >
            <AnimatePresence mode="wait">
              {isMuted ? (
                <motion.div
                  key="muted"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <VolumeX className="h-4 w-4 text-gray-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="unmuted"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Volume2 className="h-4 w-4 text-rose-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Status indicator */}
          {!hasUserInteracted && playOnLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-500 ml-1 whitespace-nowrap"
            >
              Click to enable music
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundMusic;
