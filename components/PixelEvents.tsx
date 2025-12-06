import React, { useEffect } from 'react';

const PixelEvents: React.FC = () => {
  useEffect(() => {
    // Helper para disparar evento se o FB pixel estiver carregado
    const trackCustomEvent = (eventName: string) => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', eventName);
        console.log(`FB Pixel Event Fired: ${eventName}`);
      }
    };

    // Temporizador para 30 Segundos
    const timer30s = setTimeout(() => {
      trackCustomEvent('TimeOnSite_30s');
    }, 30000); // 30 segundos

    // Temporizador para 1 Minuto
    const timer1m = setTimeout(() => {
      trackCustomEvent('TimeOnSite_1m');
    }, 60000); // 1 minuto

    // Temporizador para 3 Minutos
    const timer3m = setTimeout(() => {
      trackCustomEvent('TimeOnSite_3m');
    }, 180000); // 3 minutos

    // Limpeza dos timers se o componente for desmontado (raro na página principal, mas boa prática)
    return () => {
      clearTimeout(timer30s);
      clearTimeout(timer1m);
      clearTimeout(timer3m);
    };
  }, []);

  // Este componente não renderiza nada visualmente
  return null;
};

export default PixelEvents;