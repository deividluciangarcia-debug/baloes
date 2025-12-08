import React, { useEffect } from 'react';

const PixelEvents: React.FC = () => {
  useEffect(() => {
    // Array de tempos para monitorar
    const timeIntervals = [
      { ms: 60000, label: '1 Minuto', event: '1-MIN' },
      { ms: 120000, label: '2 Minutos', event: '2-MIN' },
      { ms: 180000, label: '3 Minutos', event: '3-MIN' },
      { ms: 300000, label: '5 Minutos', event: '5-MIN' },
      { ms: 600000, label: '10 Minutos', event: '10-MIN' },
      { ms: 900000, label: '15 Minutos', event: '15-MIN' },
      { ms: 1200000, label: '20 Minutos', event: '20-MIN' },
      { ms: 1800000, label: '30 Minutos+', event: '30-MIN-PLUS' }
    ];

    const trackTimeEvent = (eventName: string, timeLabel: string, ms: number) => {
      // --- TRACKING FACEBOOK PIXEL ---
      if (typeof window !== 'undefined' && (window as any).fbq) {
        
        // 1. Rastreamento Personalizado
        (window as any).fbq('trackCustom', eventName, {
          content_name: 'Tempo no Site',
          status: timeLabel
        });

        // 2. Rastreamento Padrão LEAD (Otimização)
        // REMOVIDO: Value e Currency para não confundir com compras reais
        (window as any).fbq('track', 'Lead', {
            content_name: `Engajamento - ${timeLabel}`, 
            content_category: 'Time Tracking',
            time_spent: timeLabel
        });

        console.log(`%c[Pixel Facebook] LEAD: ${timeLabel}`, 'color: #00ff00; font-weight: bold;');
      }
    };

    console.log("%c[Tracker] Monitoramento de Tempo Iniciado...", 'color: yellow; background: #000;');

    const timers: ReturnType<typeof setTimeout>[] = [];

    timeIntervals.forEach(({ ms, label, event }) => {
      const timerId = setTimeout(() => trackTimeEvent(event, label, ms), ms);
      timers.push(timerId);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return null;
};

export default PixelEvents;