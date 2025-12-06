import React, { useState, useEffect } from 'react';
import { BadgeCheck, User, MapPin } from 'lucide-react';

const NAMES = [
  "Mariana S.", "Fernanda L.", "Juliana M.", "Patricia K.", 
  "Ana Paula R.", "Beatriz C.", "Carla D.", "Bruna S.", 
  "Larissa M.", "Camila O.", "Roberta T.", "Vanessa P.",
  "Jessica L.", "Amanda B.", "Renata F."
];

const LOCATIONS = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Salvador, BA", "Recife, PE", "Brasília, DF",
  "Porto Alegre, RS", "Fortaleza, CE", "Goiânia, GO"
];

const SalesNotifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({ name: '', location: '', time: '' });
  
  const playSound = () => {
    try {
      const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=pop-39222.mp3");
      audio.volume = 0.2; // Volume mais sutil
      audio.play().catch(() => {});
    } catch (error) {
      console.error("Audio play failed", error);
    }
  };

  useEffect(() => {
    const scheduleNext = () => {
      // Intervalo um pouco mais rápido para manter o dinamismo
      const delay = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000);
      
      const timeoutId = setTimeout(() => {
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        const randomLoc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const randomTime = Math.floor(Math.random() * 10) + 1; 
        
        setData({
          name: randomName,
          location: randomLoc,
          time: randomTime < 2 ? 'Agora mesmo' : `há ${randomTime} min`
        });

        setIsVisible(true);
        playSound();

        setTimeout(() => {
          setIsVisible(false);
          scheduleNext();
        }, 5000);

      }, delay);

      return timeoutId;
    };

    const initialTimeout = scheduleNext();

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div 
      className={`fixed z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-md p-3 pr-5 rounded-lg shadow-2xl border-l-4 border-blue-500 
        w-[90%] max-w-[340px] md:w-auto ring-1 ring-white/10
        transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) transform
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}
        bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-6 md:left-6 md:top-auto
      `}
    >
      {/* Ícone Lateral */}
      <div className="bg-blue-600 p-2 rounded-full flex-shrink-0 shadow-lg shadow-blue-900/50">
        <BadgeCheck className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-0.5">Nova Aluna</p>
            <span className="text-[10px] text-slate-400 font-mono">{data.time}</span>
        </div>
        
        <p className="text-sm font-bold text-white leading-tight truncate flex items-center gap-1">
          {data.name}
        </p>
        
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-slate-500" />
          <span className="text-[10px] text-slate-400 font-medium truncate">{data.location}</span>
        </div>
      </div>
    </div>
  );
};

export default SalesNotifications;