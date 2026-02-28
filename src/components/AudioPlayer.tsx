import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  isPlaying: boolean;
  name: string;
  playGreeting: boolean;
}

export default function AudioPlayer({ isPlaying, name, playGreeting }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedGreeting = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.volume = 0.6;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.error("Audio play failed:", e);
            // If autoplay fails, mute the audio so the user can manually start it
            setIsMuted(true);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  useEffect(() => {
    if (playGreeting && !hasPlayedGreeting.current && !isMuted) {
      hasPlayedGreeting.current = true;
      
      // Use Web Speech API for AI Voice Greeting
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Clear any ongoing speech
        const utterance = new SpeechSynthesisUtterance(`होली की हार्दिक शुभकामनाएँ, ${name}`);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        
        // Lower background music volume while speaking
        if (audioRef.current) audioRef.current.volume = 0.1;
        
        utterance.onend = () => {
          // Restore background music volume
          if (audioRef.current) audioRef.current.volume = 0.6;
        };
        
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [playGreeting, name, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isPlaying) return null;

  return (
    <>
      {/* Background Music - Reliable MP3 sources for cross-browser compatibility */}
      <audio ref={audioRef} loop preload="auto">
        {/* Primary: Upbeat Festive Indian Track */}
        <source src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=india-music-107334.mp3" type="audio/mpeg" />
        {/* Fallback: Flute Track */}
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b8f8f2b7.mp3?filename=indian-flute-and-tabla-113038.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm text-[#FDE047] border border-[#EAB308]/50"
            >
              <Music className="w-4 h-4 animate-pulse" />
              Holi Festive Music
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#2A0000] border-2 border-[#EAB308] p-4 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] text-[#FDE047] hover:bg-[#4A0404] transition-colors"
          onClick={toggleMute}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isMuted ? "संगीत चालू करें" : "संगीत बंद करें"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
