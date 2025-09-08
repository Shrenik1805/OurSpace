import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume to a gentle level
    audio.volume = 0.2;
    
    // Auto-play music always (removed play/pause functionality)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play blocked, but will still attempt to play
        console.log("Auto-play blocked by browser");
      });
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        loop
        autoPlay
        onPlay={() => {}}
        onPause={() => {}}
      >
        <source src="/ambient-music.mp3" type="audio/mpeg" />
        {/* Add your own ambient music file named 'ambient-music.mp3' to the public folder */}
        Your browser does not support the audio element.
      </audio>
      
      {/* Only mute button remains - play/pause button removed */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default BackgroundMusic;
