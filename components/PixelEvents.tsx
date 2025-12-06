import React, { useEffect } from 'react';

const PixelEvents: React.FC = () => {
  useEffect(() => {
    // Helper para disparar evento de forma segura e logar
    const trackCustomEvent = (eventName: string, timeLabel: string) => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', eventName, {
          content_name: 'Time On Site',
          status: timeLabel,
          value: 0.00, // Valor simbólico para o FB não reclamar
          currency: 'BRL'
        });
        console.log(`%c[Pixel Facebook] Tempo: ${eventName} (${timeLabel})`, 'color: #00ff00; font-weight: bold; background: #000;');
      }
    };

    console.log("%c[Pixel Facebook] Monitoramento de Tempo Iniciado...", 'color: yellow; background: #000;');

    // Array de tempos para monitorar (em milissegundos)
    const timeIntervals = [
      { ms: 60000, label: '1 Minute', event: 'TimeOnSite_1m' },
      { ms: 120000, label: '2 Minutes', event: 'TimeOnSite_2m' },
      { ms: 180000, label: '3 Minutes', event: 'TimeOnSite_3m' },
      { ms: 300000, label: '5 Minutes', event: 'TimeOnSite_5m' }, // Momento chave de leitura
      { ms: 600000, label: '10 Minutes', event: 'TimeOnSite_10m' }, // Alta intenção
      { ms: 900000, label: '15 Minutes', event: 'TimeOnSite_15m' },
      { ms: 1200000, label: '20 Minutes', event: 'TimeOnSite_20m' },
      { ms: 1800000, label: '30 Minutes+', event: 'TimeOnSite_30m_Plus' } // Super Engajado
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