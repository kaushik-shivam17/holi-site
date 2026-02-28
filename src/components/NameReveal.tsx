import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface NameRevealProps {
  name: string;
  onComplete: () => void;
}

export default function NameReveal({ name, onComplete }: NameRevealProps) {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    // Trigger powder burst after name is written
    const duration = name.length * 100 + 400; // Much faster
    
    const timer1 = setTimeout(() => {
      setShowGlow(true);
      
      // Center powder burst
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff007f', '#ffea00', '#00e5ff', '#ff3d00', '#76ff03'],
        disableForReducedMotion: true
      });
    }, duration);

    // Transition to main greeting
    const timer2 = setTimeout(() => {
      onComplete();
    }, duration + 1000); // Faster transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [name, onComplete]);

  // Split name into characters for sequential animation
  const chars = name.split('');

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#2A0000] overflow-hidden">
      {/* Background ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A0404]/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="relative z-10 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: showGlow ? 1.1 : 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="flex justify-center space-x-1 md:space-x-2">
          {chars.map((char, index) => (
            <motion.span
              key={index}
              className={`text-6xl md:text-9xl font-bold brush-text inline-block
                ${showGlow ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400' : 'text-white'}
              `}
              style={{
                textShadow: showGlow ? '0 0 30px rgba(255,234,0,0.8)' : 'none',
                WebkitTextStroke: showGlow ? '1px rgba(255,255,255,0.5)' : 'none'
              }}
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                type: "spring",
                damping: 12,
                stiffness: 100
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
        
        {showGlow && (
          <motion.div
            className="absolute -inset-10 bg-[#FDE047] blur-[100px] -z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </motion.div>
    </div>
  );
}
