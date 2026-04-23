import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TRACKS = [
  'Diyarbakır', 'Urfa', 'Elazığ', 'Adana', 
  'Ankara', 'İzmir', 'İstanbul', 'Kocaeli', 'Antalya'
];

export default function HeroBanner() {
  const navigate = useNavigate();
  const [targetCities, setTargetCities] = useState<string[]>(['İstanbul', 'Elazığ']);
  const [tomorrowDate, setTomorrowDate] = useState<{ day: string, month: string }>({ day: '22', month: 'Nisan' });

  useEffect(() => {
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const day = tomorrow.getDate().toString();
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[tomorrow.getMonth()];
    
    setTomorrowDate({ day, month });

    // Pick 2 random unique tracks
    const shuffled = [...TRACKS].sort(() => 0.5 - Math.random());
    setTargetCities([shuffled[0], shuffled[1]]);
  }, []);

  return (
    <section className="relative w-full pt-20 pb-12 overflow-hidden bg-[#010a26] flex items-center justify-center min-h-[80vh]">
      {/* Dynamic Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ffcc00]/10 via-[#010a26] to-[#010a26]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#ffcc00]/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center">
        
        {/* Predictions Date */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.1 }}
           className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
        >
           {/* Box 1 */}
           <div 
              onClick={() => navigate('/tahminler')}
              className="flex-1 w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] p-8 flex items-center justify-between group hover:border-[#ffcc00]/50 hover:bg-white/10 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
           >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc00]/0 via-[#ffcc00]/5 to-[#ffcc00]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                 <div className="text-[#ffcc00] font-black text-5xl md:text-6xl mb-1 drop-shadow-lg">{tomorrowDate.day}</div>
                 <div className="text-white font-bold uppercase tracking-[0.3em] text-sm">{tomorrowDate.month}</div>
              </div>
              <div className="text-right relative z-10">
                 <div className="text-white font-black text-3xl md:text-5xl uppercase italic tracking-tighter drop-shadow-lg">{targetCities[0]}</div>
                 <div className="text-[#ffcc00] font-bold uppercase tracking-widest text-xs mt-2 bg-[#ffcc00]/10 inline-block px-3 py-1 rounded-full">Yarışları Başladı</div>
              </div>
           </div>

           {/* Box 2 */}
           <div 
              onClick={() => navigate('/tahminler')}
              className="flex-1 w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] p-8 flex items-center justify-between group hover:border-[#ffcc00]/50 hover:bg-white/10 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
           >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc00]/0 via-[#ffcc00]/5 to-[#ffcc00]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                 <div className="text-[#ffcc00] font-black text-5xl md:text-6xl mb-1 drop-shadow-lg">{tomorrowDate.day}</div>
                 <div className="text-white font-bold uppercase tracking-[0.3em] text-sm">{tomorrowDate.month}</div>
              </div>
              <div className="text-right relative z-10">
                 <div className="text-white font-black text-3xl md:text-5xl uppercase italic tracking-tighter drop-shadow-lg">{targetCities[1]}</div>
                 <div className="text-[#ffcc00] font-bold uppercase tracking-widest text-xs mt-2 bg-[#ffcc00]/10 inline-block px-3 py-1 rounded-full">Yarışları Başladı</div>
              </div>
           </div>
        </motion.div>

        {/* Top Questions */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="space-y-4 mb-6"
        >
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tighter uppercase italic">
            Kim nasıl koşar ?
          </h1>
          <h2 className="text-5xl md:text-8xl font-black text-[#ffcc00] drop-shadow-[0_0_20px_rgba(255,204,0,0.4)] tracking-tighter uppercase italic">
            Kim nasıl kazanır ?
          </h2>
          <h3 className="text-3xl md:text-6xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] tracking-tighter uppercase italic">
            Tuttuğunuz atın şansı nedir?
          </h3>
        </motion.div>

        {/* Center Portrait */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="relative mb-16 mt-8 group cursor-pointer"
           onClick={() => navigate('/vip')}
        >
          {/* Kimdir button */}
          <div 
             className="absolute -top-6 -right-6 z-50 flex h-24 w-24 items-center justify-center cursor-pointer hover:scale-110 transition-transform"
             onClick={(e) => {
                e.stopPropagation();
                navigate('/kimdir');
             }}
          >
             <div className="absolute inset-0 animate-ping rounded-full bg-[#ffcc00]/40" />
             <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#ffcc00] border-4 border-[#010a26] shadow-[0_0_40px_rgba(255,204,0,0.6)]">
                <span className="text-[#010a26] font-black text-sm uppercase tracking-tighter leading-none text-center">
                  KİMDİR?
                </span>
             </div>
          </div>

          <div className="absolute inset-0 bg-[#ffcc00] rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-[#ffcc00]/50 p-2 relative z-10 overflow-hidden shadow-[0_0_50px_rgba(255,204,0,0.2)] bg-[#010a26]">
             <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                <img 
                  src="https://cdn.resimupload.org/2026/04/21/e222fecb-3ebb-4f1b-8cdb-b96b4c938aa8.jpg" 
                  alt="Altılı Yakalatan Adam" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
          {/* Label under image */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#ffcc00] text-[#010a26] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest whitespace-nowrap shadow-[0_10px_30px_rgba(255,204,0,0.3)] border-2 border-[#fff]">
             ALTILIYAKALATANADAM
          </div>
        </motion.div>

        {/* Vip Üye Olun Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16 mt-4"
        >
          <button 
             onClick={() => navigate('/vip')}
             className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffcc00] via-white to-[#ffcc00] hover:scale-105 transition-transform uppercase italic tracking-tighter drop-shadow-2xl flex items-center justify-center gap-4 group"
          >
             <span><span className="text-white">***</span> VİP ÜYE OLUN <span className="text-white">***</span></span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
