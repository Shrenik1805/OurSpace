import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume to a gentle level
    audio.volume = 0.3;
    
    // Try to play automatically (modern browsers may block this)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play blocked, user will need to interact first
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source 
          src="/ambient-music.mp3" 
          type="audio/mpeg" 
        />
        Your browser does not support the audio element.
      </audio>
      
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </Button>
      </div>
    </div>
  );
};

export default BackgroundMusic;