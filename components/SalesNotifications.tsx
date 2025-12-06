import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

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
  
  // Audio for the "pop" sound
  const playSound = () => {
    try {
      const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=pop-39222.mp3");
      audio.volume = 0.4;
      audio.play().catch(e => {
        // Auto-play policies might block this if user hasn't interacted yet
        // Silently fail is fine
      });
    } catch (error) {
      console.error("Audio play failed", error);
    }
  };

  useEffect(() => {
    // Slower interval: Between 25 seconds (25000ms) and 60 seconds (60000ms)
    // Approximately 2.5x slower than previous settings
    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * (60000 - 25000 + 1) + 25000);
      
      const timeoutId = setTimeout(() => {
        // Setup new data
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        const randomLoc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const randomTime = Math.floor(Math.random() * 15) + 1; // 1 to 15 mins ago
        
        setData({
          name: randomName,
          location: randomLoc,
          time: randomTime < 2 ? 'agora' : `${randomTime} min atrás`
        });

        // Show
        setIsVisible(true);
        playSound();

        // Hide after 6 seconds (slightly longer reading time)
        setTimeout(() => {
          setIsVisible(false);
          scheduleNext(); // Schedule the next one after hiding
        }, 6000);

      }, delay);

      return timeoutId;
    };

    const initialTimeout = scheduleNext();

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div 
      className={`fixed z-50 flex items-center gap-4 bg-white p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border-l-4 border-red-500 
        w-[92%] max-w-sm md:w-auto
        transition-all duration-[1500ms] ease-in-out transform
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}
        /* Position on Mobile: Top (spaced out), Desktop: Bottom Left */
        top-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-auto md:left-6 md:bottom-6
        shadow-red-500/20
      `}
    >
      <div className="bg-red-50 p-3 rounded-full flex-shrink-0 shadow-inner border border-red-100">
        <Check className="w-6 h-6 text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800 leading-tight truncate">
          {data.name}
        </p>
        <p className="text-xs text-slate-600 mb-1">
          Acabou de comprar o <span className="font-bold text-red-600">Balões Lucrativos</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{data.location}</span>
          <span className="text-[10px] text-slate-300">•</span>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
             {data.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesNotifications;