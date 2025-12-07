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
      if (typeof window !== 'undefined' && (window as any).fbq) {
        
        // 1. Rastreamento Personalizado (Mantemos para histórico/backup)
        (window as any).fbq('trackCustom', eventName, {
          content_name: 'Tempo no Site',
          status: timeLabel
        });

        // 2. Rastreamento Padrão LEAD (Solicitado para todos os tempos)
        // Calculamos um "valor" baseado no tempo (1 min = 1 real de valor percebido de atenção)
        // Isso ajuda o algoritmo a priorizar quem fica mais tempo se você usar ROAS.
        const valueBasedOnTime = Math.floor(ms / 60000); 

        (window as any).fbq('track', 'Lead', {
            content_name: `Engajamento - ${timeLabel}`, // Diferencia "Lead 1 min" de "Lead 5 min" no painel
            content_category: 'Time Tracking',
            value: valueBasedOnTime, 
            currency: 'BRL',
            time_spent: timeLabel
        });

        console.log(`%c[Pixel Facebook] LEAD Disparado: ${timeLabel} (Valor: ${valueBasedOnTime})`, 'color: #00ff00; font-weight: bold; background: #000;');
      }
    };

    console.log("%c[Pixel Facebook] Monitoramento de Tempo Iniciado (Todos viram Lead)...", 'color: yellow; background: #000;');

    const timers: ReturnType<typeof setTimeout>[] = [];

    timeIntervals.forEach(({ ms, label, event }) => {
      const timerId = setTimeout(() => trackTimeEvent(event, label, ms), ms);
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