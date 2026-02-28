import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import NamePopup from './components/NamePopup';
import CurtainAnimation from './components/CurtainAnimation';
import NameReveal from './components/NameReveal';
import MainGreeting from './components/MainGreeting';
import AudioPlayer from './components/AudioPlayer';

type ScreenState = 'landing' | 'opening' | 'name_reveal' | 'main';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [showPopup, setShowPopup] = useState(false);
  const [fromName, setFromName] = useState('किसी खास');
  const [userName, setUserName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playGreeting, setPlayGreeting] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    if (from) {
      setFromName(from);
    }
  }, []);

  const handleRevealClick = () => {
    setShowPopup(true);
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowPopup(false);
    setScreen('opening');
    setIsPlaying(true); // Start music
  };

  const handleCurtainComplete = () => {
    setScreen('name_reveal');
  };

  const handleNameRevealComplete = () => {
    setScreen('main');
    setPlayGreeting(true); // Trigger AI voice
  };

  return (
    <div className="font-sans text-white bg-[#2A0000] min-h-screen selection:bg-[#EAB308] selection:text-[#2A0000]">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }}>
            <LandingScreen fromName={fromName} onRevealClick={handleRevealClick} />
          </motion.div>
        )}

        {screen === 'opening' && (
          <motion.div key="opening" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <CurtainAnimation onComplete={handleCurtainComplete} />
          </motion.div>
        )}

        {screen === 'name_reveal' && (
          <motion.div key="name_reveal" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }}>
            <NameReveal name={userName} onComplete={handleNameRevealComplete} />
          </motion.div>
        )}

        {screen === 'main' && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <MainGreeting name={userName} />
          </motion.div>
        )}
      </AnimatePresence>

      <NamePopup isOpen={showPopup} onSubmit={handleNameSubmit} />

      <AudioPlayer 
        isPlaying={isPlaying} 
        name={userName} 
        playGreeting={playGreeting} 
      />
    </div>
  );
}
