import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CurtainAnimationProps {
  onComplete: () => void;
}

export default function CurtainAnimation({ onComplete }: CurtainAnimationProps) {
  const [showLight, setShowLight] = useState(false);

  useEffect(() => {
    // Trigger light burst and confetti after curtains start opening
    const timer1 = setTimeout(() => {
      setShowLight(true);
      
      // Color splash particles
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

    }, 800);

    // Complete animation
    const timer2 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-black flex items-center justify-center">
      {/* Left Curtain */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#4A0404] to-[#2A0000] border-r-4 border-[#EAB308] shadow-[10px_0_30px_rgba(0,0,0,0.8)] z-50 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
      />
      
      {/* Right Curtain */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#4A0404] to-[#2A0000] border-l-4 border-[#EAB308] shadow-[-10px_0_30px_rgba(0,0,0,0.8)] z-50 origin-right"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Center Light Burst */}
      {showLight && (
        <motion.div
          className="absolute z-40 w-96 h-96 rounded-full bg-[#FDE047] blur-[100px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 4], opacity: [0, 1, 0] }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
