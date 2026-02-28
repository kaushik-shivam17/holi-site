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
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        
        // Fade in volume
        audioRef.current.volume = 0;
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 0.5) { // Max volume 0.5 to not overpower
            vol += 0.05;
            if (audioRef.current) audioRef.current.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 300);
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
          if (audioRef.current) audioRef.current.volume = 0.5;
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
      {/* Background Music - Reliable public domain Bollywood/Indian style track */}
      <audio 
        ref={audioRef} 
        src="https://freepd.com/music/Bollywood%20Blades.mp3" 
        loop 
        preload="auto"
        crossOrigin="anonymous"
      />
      
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
              Holi Khele Raghuveera
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
