// BackgroundMusic.js
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Props:
 *   playOnLogin (boolean): Pass true to start music after login.
 */
const BackgroundMusic = ({ playOnLogin }) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // Start playing ONLY after user logs in (user-triggered event)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playOnLogin) return;
    audio.volume = 0.2;
    audio.muted = isMuted;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // In rare cases, auto-play may still fail if no user gesture is detected
        console.log("Auto-play blocked by browser; wait for further interaction");
      });
    }
  }, [playOnLogin, isMuted]);

  // Toggle mute on/off
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} loop>
        <source src="/ambient-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default BackgroundMusic;
