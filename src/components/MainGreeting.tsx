import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Share2, Copy, MessageCircle, Send, ChevronDown, Heart } from 'lucide-react';

interface MainGreetingProps {
  name: string;
}

export default function MainGreeting({ name }: MainGreetingProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Simulate view count
    setViewCount(Math.floor(Math.random() * 500) + 100);
  }, []);

  const shareUrl = `${window.location.origin}/?from=${encodeURIComponent(name)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('लिंक कॉपी हो गया!');
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`✨ ${name} ने आपके लिए एक जादुई होली सरप्राइज़ भेजा है! ✨\n\nयहाँ क्लिक करें: ${shareUrl}`)}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`✨ ${name} ने आपके लिए एक जादुई होली सरप्राइज़ भेजा है! ✨`)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#2A0000] relative overflow-hidden pb-20">
      {/* Animated Background Smoke/Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_#ff007f_0%,_transparent_50%)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_#00e5ff_0%,_transparent_50%)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#ffea00_0%,_transparent_60%)]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-10">
        {/* Main Greeting */}
        <div className="min-h-[85vh] flex flex-col justify-center relative mb-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 gold-text leading-tight">
            🌸 होली की हार्दिक शुभकामनाएँ,<br/>
            <span className="brush-text text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 inline-block mt-2">
              {name}!
            </span> 🌸
          </h1>
          
          <motion.div 
            className="glass-panel max-w-2xl mx-auto p-8 rounded-3xl border-2 border-[#EAB308]/30"
            style={{ y }}
          >
            <p className="text-xl md:text-3xl leading-relaxed text-gray-100 font-medium">
              ईश्वर आपके जीवन में<br/>
              <span className="text-pink-400 font-bold">खुशियों के रंग</span>,<br/>
              <span className="text-yellow-400 font-bold">सफलता की चमक</span>,<br/>
              और <span className="text-cyan-400 font-bold">प्रेम की मिठास</span> भर दें।<br/>
              आपका जीवन सदा इंद्रधनुष की तरह रंगीन रहे।
            </p>
          </motion.div>
          </motion.div>

          {/* Scroll Indicator Avatar */}
          <motion.div 
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EAB308] shadow-[0_0_20px_rgba(234,179,8,0.6)] bg-gradient-to-br from-[#4A0404] to-[#A16207]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Baby_Krishna_Eating_Butter.jpg/512px-Baby_Krishna_Eating_Butter.jpg" alt="Little Krishna" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <motion.div 
                className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1.5 border border-white/20 shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-white fill-white" />
              </motion.div>
            </div>
            <div className="glass-panel px-5 py-2.5 rounded-full text-sm md:text-base text-[#FDE047] flex items-center gap-2 shadow-lg">
              <span className="font-medium">आपके लिए कुछ खास है... नीचे देखें</span>
              <ChevronDown className="w-5 h-5 animate-bounce text-pink-400" />
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gold-text">
            📜 होली उत्सव की विशेष झलकियाँ
          </h2>
          
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 px-4 md:justify-center hide-scrollbar">
            {[
              { icon: '🔥', title: 'होलिका दहन', desc: 'बुराई पर अच्छाई की जीत का प्रतीक।' },
              { icon: '🎨', title: 'रंगवाली होली', desc: 'रंग, गुलाल और खुशियों से भरा दिन।' },
              { icon: '🪔', title: 'पारंपरिक उत्सव', desc: 'परिवार और मित्रों के साथ पूजा और मिठाइयाँ।' },
              { icon: '🎉', title: 'आधुनिक उत्सव', desc: 'संगीत, नृत्य और रंगों की मस्ती।' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="snap-center shrink-0 w-72 glass-panel p-6 rounded-2xl border border-[#EAB308]/50 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05, borderColor: '#EAB308' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#FDE047] mb-2">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Krishna Avatar Section */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gold-text">
            🦚 कान्हा के संग रंगों की मस्ती
          </h2>
          
          <div className="relative max-w-4xl mx-auto h-64 md:h-96 rounded-3xl overflow-hidden border-4 border-[#EAB308]/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-[#2A0000] flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Baby_Krishna_Eating_Butter.jpg/1024px-Baby_Krishna_Eating_Butter.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-center p-6 glass-panel rounded-2xl">
                 <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                   राधे-राधे! 🌸
                 </p>
              </div>
            </div>
            
            {/* Floating color splashes over image */}
            <motion.div 
              className="absolute top-10 left-10 w-20 h-20 bg-pink-500 rounded-full blur-2xl opacity-60"
              animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-60"
              animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Share Card Section */}
        <motion.div 
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-b from-[#A16207] to-[#4A0404] p-1 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.4)]">
            <div className="bg-[#2A0000] rounded-[22px] p-8 text-center relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]"></div>
              
              <h3 className="text-2xl font-bold text-[#FDE047] mb-4">
                ✨ यह विशेष होली संदेश बनाया गया है:
              </h3>
              <p className="text-4xl font-bold brush-text text-white mb-8 drop-shadow-md">
                {name} के लिए ✨
              </p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#EAB308] to-transparent mb-8"></div>
              
              <p className="text-xl text-gray-200 mb-6">
                🎉 अपने नाम से होली की शुभकामनाएँ भेजें
              </p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleCopy}
                  className="gold-button w-full py-4 rounded-xl text-xl flex items-center justify-center gap-2"
                >
                  <Copy className="w-6 h-6" />
                  🔗 मेरा जादुई लिंक बनाएँ
                </button>
                
                <div className="flex gap-4 mt-2">
                  <button 
                    onClick={handleWhatsApp}
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button 
                    onClick={handleTelegram}
                    className="flex-1 bg-[#0088cc] hover:bg-[#0077b5] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    Telegram
                  </button>
                </div>
              </div>
              
              <p className="mt-8 text-sm text-gray-400 font-mono">
                अब तक {viewCount.toLocaleString()} लोगों ने यह शुभकामना देखी है
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
