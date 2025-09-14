import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react";

interface BackgroundMusicProps {
  playOnLogin?: boolean;
}

const BackgroundMusic = ({ playOnLogin = false }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Start playing after user login
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playOnLogin) return;

    const startPlayback = async () => {
      try {
        audio.volume = volume;
        audio.muted = isMuted;
        audio.loop = true;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.warn("Auto-play blocked by browser:", error);
        setShowControls(true); // Show controls if auto-play fails
      }
    };

    startPlayback();
  }, [playOnLogin, volume, isMuted]);

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newMutedState = !isMuted;
    audio.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(newVolume);
    audio.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
      audio.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = 0;
    if (!isPlaying) {
      audio.play().catch(console.error);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src="/ambient-music.mp3"
        loop
        preload="auto"
        aria-label="Background ambient music"
      />

      {/* Floating music controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: playOnLogin ? 1 : 0,
          scale: playOnLogin ? 1 : 0.8
        }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="relative">
          {/* Main control button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer group"
            onClick={togglePlayPause}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause className="w-6 h-6 text-white fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play className="w-6 h-6 text-white fill-current ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Animated ring for playing state */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.3 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-white"
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Extended controls panel */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-200 p-4 min-w-64"
              >
                {/* Title */}
                <div className="text-center mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Ambient Love Music
                  </h4>
                  <div className="text-xs text-gray-500">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={restart}
                    className="w-8 h-8 p-0 hover:bg-rose-100"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMute}
                    className="w-8 h-8 p-0 hover:bg-rose-100"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Volume control */}
                <div className="flex items-center gap-2">
                  <VolumeX className="w-3 h-3 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f472b6 0%, #f472b6 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <Volume2 className="w-3 h-3 text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default BackgroundMusic;
