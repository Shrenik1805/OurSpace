import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundMusicProps {
  playOnLogin?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ playOnLogin = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
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
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="/ambient-music.mp3"
        preload="auto"
        loop
      >
        Your browser does not support the audio element.
      </audio>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-rose-200"
      >
        {/* Music Icon */}
        <div className="flex items-center">
          {isLoading ? (
            <Music className="h-4 w-4 text-rose-500 animate-pulse" />
          ) : (
            <Music className="h-4 w-4 text-rose-500" />
          )}
        </div>

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlayPause}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-rose-600 hover:text-rose-800 hover:bg-rose-100"
          disabled={isLoading}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        {/* Mute/Unmute Button */}
        <Button
          onClick={toggleMute}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-rose-600 hover:text-rose-800 hover:bg-rose-100"
          disabled={audioError}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        {/* Status indicator */}
        {!hasUserInteracted && playOnLogin && (
          <span className="text-xs text-rose-600 ml-2">
            Click to enable music
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default BackgroundMusic;
