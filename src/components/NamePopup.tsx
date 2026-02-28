import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle } from 'lucide-react';

interface NamePopupProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export default function NamePopup({ isOpen, onSubmit }: NamePopupProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(name.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-gradient-to-b from-[#4A0404] to-[#2A0000] rounded-3xl p-8 border-2 border-[#EAB308] shadow-[0_0_50px_rgba(234,179,8,0.3)] relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#EAB308] rounded-tl-3xl opacity-50 m-2"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#EAB308] rounded-tr-3xl opacity-50 m-2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#EAB308] rounded-bl-3xl opacity-50 m-2"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#EAB308] rounded-br-3xl opacity-50 m-2"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 gold-text">
              ✨ अपना नाम दर्ज करें और होली का जादू देखें ✨
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="यहाँ अपना नाम लिखें..."
                  className="w-full bg-black/40 border-2 border-[#EAB308]/50 rounded-xl px-6 py-4 text-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/50 transition-all text-center"
                  autoFocus
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-red-400 text-sm font-medium bg-red-950/50 p-3 rounded-lg border border-red-500/30"
                >
                  <AlertCircle className="w-5 h-5" />
                  ⚠ बिना नाम दर्ज किए आप आगे नहीं बढ़ सकते।
                </motion.div>
              )}

              <button
                type="submit"
                className="gold-button w-full py-4 rounded-xl text-xl flex items-center justify-center gap-2 mt-2"
              >
                <Sparkles className="w-6 h-6" />
                ✨ मेरा होली जादू दिखाएँ
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
