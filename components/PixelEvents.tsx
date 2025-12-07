import React, { useEffect } from 'react';

const PixelEvents: React.FC = () => {
  useEffect(() => {
    // Helper para disparar evento de forma segura e logar
    const trackCustomEvent = (eventName: string, timeLabel: string) => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', eventName, {
          content_name: 'Tempo no Site',
          status: timeLabel
        });
        console.log(`%c[Pixel Facebook] Tempo: ${eventName}`, 'color: #00ff00; font-weight: bold; background: #000;');
      }
    };

    console.log("%c[Pixel Facebook] Monitoramento de Tempo Iniciado...", 'color: yellow; background: #000;');

    // Array de tempos para monitorar (Nomenclatura Simplificada em PT-BR)
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

    const timers: ReturnType<typeof setTimeout>[] = [];

    timeIntervals.forEach(({ ms, label, event }) => {
      const timerId = setTimeout(() => trackCustomEvent(event, label), ms);
      timers.push(timerId);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      console.log("%c[Pixel Facebook] Timers Encerrados", 'color: red; background: #000;');
    };
  }, []);

  return null;
};

export default PixelEvents;