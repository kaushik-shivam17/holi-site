import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';

interface LandingScreenProps {
  fromName: string;
  onRevealClick: () => void;
}

export default function LandingScreen({ fromName, onRevealClick }: LandingScreenProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: 4th March 2026
    const targetDate = new Date('2026-03-04T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#2A0000]">
      {/* Royal Curtains Background */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-1/2 h-full bg-gradient-to-r from-[#4A0404] to-[#2A0000] border-r-4 border-[#EAB308] shadow-[10px_0_30px_rgba(0,0,0,0.8)]"></div>
        <div className="w-1/2 h-full bg-gradient-to-l from-[#4A0404] to-[#2A0000] border-l-4 border-[#EAB308] shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"></div>
      </div>

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="z-10 text-center px-4 max-w-2xl mx-auto glass-panel p-8 rounded-2xl border-2 border-[#EAB308]/30"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-xl md:text-2xl mb-4 text-gray-200">
          👋 नमस्ते!
        </p>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 gold-text leading-tight brush-text">
          {fromName}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          ने आपके लिए एक जादुई होली सरप्राइज़ भेजा है! 🎨
        </p>

        {/* Countdown Timer */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 text-[#FDE047]">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-medium">होली आने में बाकी हैं:</span>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-[#4A0404] border border-[#EAB308]/50 rounded-lg p-3 min-w-[70px]">
              <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-xs text-[#FDE047] uppercase mt-1">दिन</div>
            </div>
            <div className="bg-[#4A0404] border border-[#EAB308]/50 rounded-lg p-3 min-w-[70px]">
              <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-xs text-[#FDE047] uppercase mt-1">घंटे</div>
            </div>
            <div className="bg-[#4A0404] border border-[#EAB308]/50 rounded-lg p-3 min-w-[70px]">
              <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-xs text-[#FDE047] uppercase mt-1">मिनट</div>
            </div>
            <div className="bg-[#4A0404] border border-[#EAB308]/50 rounded-lg p-3 min-w-[70px]">
              <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-xs text-[#FDE047] uppercase mt-1">सेकंड</div>
            </div>
          </div>
        </div>

        <button 
          onClick={onRevealClick}
          className="gold-button px-8 py-4 rounded-full text-lg md:text-xl flex items-center justify-center mx-auto gap-2"
        >
          <Sparkles className="w-6 h-6" />
          🎁 जादू देखने के लिए यहाँ क्लिक करें
        </button>
      </motion.div>
    </div>
  );
}
