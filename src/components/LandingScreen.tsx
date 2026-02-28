import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LandingScreenProps {
  fromName: string;
  onRevealClick: () => void;
}

export default function LandingScreen({ fromName, onRevealClick }: LandingScreenProps) {
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
