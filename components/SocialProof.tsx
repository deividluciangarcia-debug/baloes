import React, { useState, useRef, useEffect } from 'react';
import { Star, Play, Pause, Loader2 } from 'lucide-react';

// Componente Interno de Player de Voz (Estilo WhatsApp)
const VoicePlayer: React.FC<{ audioUrl: string; duration?: string }> = ({ audioUrl, duration = "0:45" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    // Se ainda não carregou a fonte (primeiro clique)
    if (!isReady) {
        setIsLoading(true);
        setIsReady(true); // Isso vai disparar o carregamento do src no elemento audio
        // O useEffect vai lidar com o play assim que estiver pronto
        return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Efeito para tocar automaticamente assim que o audio carregar após o primeiro clique
  useEffect(() => {
    if (isReady && audioRef.current && isLoading) {
        const audio = audioRef.current;
        const onCanPlay = () => {
            setIsLoading(false);
            audio.play();
            setIsPlaying(true);
        };
        audio.addEventListener('canplay', onCanPlay);
        return () => audio.removeEventListener('canplay', onCanPlay);
    }
  }, [isReady, isLoading]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration || 1;
      setProgress((current / total) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isReady]); // Só anexa listeners se estiver pronto

  return (
    <div className="mt-4 bg-white rounded-xl p-3 flex items-center gap-3 border border-slate-300 shadow-md shadow-slate-200/50 w-full hover:border-green-400 transition-colors duration-300">
      {/* O src só é definido se isReady for true. Isso evita o download inicial de 26MB. */}
      <audio ref={audioRef} src={isReady ? audioUrl : undefined} preload="none" />
      
      <button 
        onClick={togglePlay}
        className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-green-600 transition-colors flex-shrink-0"
        aria-label={isPlaying ? "Pausar" : "Tocar depoimento"}
      >
        {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
        ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
        )}
      </button>

      <div className="flex-1 flex flex-col justify-center gap-1">
        {/* Fake Waveform Visual */}
        <div className="h-6 flex items-center gap-0.5 overflow-hidden opacity-60">
            {Array.from({ length: 30 }).map((_, i) => (
                <div 
                    key={i} 
                    className={`w-1 bg-slate-800 rounded-full transition-all duration-300 ${
                        i / 30 * 100 < progress ? 'bg-green-600' : 'bg-slate-400'
                    }`}
                    style={{ 
                        height: `${Math.max(20, Math.random() * 100)}%`,
                        opacity: i / 30 * 100 < progress ? 1 : 0.5
                    }}
                ></div>
            ))}
        </div>
      </div>

      <span className="text-xs text-slate-500 font-medium tabular-nums">
        {isPlaying ? "Ouvindo..." : duration}
      </span>
    </div>
  );
};

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      handle: "@festas_da_ju",
      image: "https://picsum.photos/100/100?random=20",
      quote: "Gente, minha primeira festa cobrando R$800! Gastei só R$150 de material. Tô chocada com o lucro!",
      highlight: "Lucrou R$650 na 1ª festa",
      // Exemplo de áudio
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
      audioDuration: "0:58"
    },
    {
      handle: "@carol.balloons",
      image: "https://picsum.photos/100/100?random=21",
      quote: "Larguei meu emprego CLT semana passada. Agora ganho em um fds o que ganhava no mês todo aguentando patrão.",
      highlight: "Pediu demissão do CLT",
      // Exemplo de áudio
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
      audioDuration: "1:12"
    },
    {
      handle: "@paty_decor",
      image: "https://picsum.photos/100/100?random=22",
      quote: "O módulo de vendas salvou minha vida. Eu tinha vergonha de cobrar, agora fecho contrato todo dia.",
      highlight: "Agenda lotada",
      // Exemplo de áudio
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
      audioDuration: "0:47"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-emerald-950 mb-4 font-serif">Resultados de Pessoas Comuns</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Elas começaram do absoluto zero, sem experiência e com pouco dinheiro. Veja o que aconteceu:
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <img 
                    src={t.image} 
                    alt={t.handle} 
                    className="w-12 h-12 rounded-full border-2 border-green-500" 
                    loading="lazy"
                />
                <div>
                  <p className="font-bold text-emerald-900">{t.handle}</p>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <p className="text-slate-600 italic mb-6 flex-grow">"{t.quote}"</p>
              
              <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-bold text-center mb-4">
                🚀 {t.highlight}
              </div>

              {/* Player de Áudio Otimizado */}
              {t.audio && (
                <div className="w-full mt-auto">
                  <VoicePlayer audioUrl={t.audio} duration={t.audioDuration} />
                  <p className="text-xs text-center text-red-700 mt-3 font-bold">
                     🔊 Ouça o áudio real do depoimento:
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;