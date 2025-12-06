import React, { useState } from 'react';
import { Play, Lock, Star, Youtube } from 'lucide-react';

interface FreePreviewProps {
  onCtaClick: () => void;
}

const VideoFacade = ({ videoId, title }: { videoId: string, title: string }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (showVideo) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-inner">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 shadow-inner cursor-pointer group"
      onClick={() => setShowVideo(true)}
      aria-label={`Reproduzir vídeo: ${title}`}
    >
      <img 
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  );
};

const FreePreview: React.FC<FreePreviewProps> = ({ onCtaClick }) => {
  return (
    <section className="py-20 bg-emerald-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
            <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
            Degustação Gratuita
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif mb-4">
            Assista e Aprenda Agora
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Não compre no escuro. Separei 2 aulas exclusivas para você sentir a qualidade da nossa didática. Dê o play!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Video 01 - Balões Bubbles */}
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 group hover:border-gold-400 transition-colors">
            <div className="mb-3 flex justify-between items-center">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">AULA PRÁTICA</span>
              <span className="text-xs text-slate-400 font-medium">01:42</span>
            </div>
            
            <VideoFacade videoId="xY2kwqcWFQ0" title="Aula Balões Bubbles" />

            <h3 className="font-bold text-emerald-950 mt-4 text-lg leading-tight">
              Balões Bubbles Personalizados
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Aprenda a técnica de personalização em Bubbles que encanta clientes e aumenta seu lucro.
            </p>
          </div>

          {/* Video 02 - Fidelização */}
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 group hover:border-gold-400 transition-colors">
            <div className="mb-3 flex justify-between items-center">
              <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">MÓDULO BÔNUS</span>
              <span className="text-xs text-slate-400 font-medium">03:33</span>
            </div>
            
            <VideoFacade videoId="rUj_-HgbEDA" title="O Segredo da Fidelização" />

            <h3 className="font-bold text-emerald-950 mt-4 text-lg leading-tight">
              O Segredo da Fidelização
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Estratégias de vendas para fazer o cliente comprar de você várias vezes (Aula do Módulo Bônus).
            </p>
          </div>

          {/* Locked Content (Upsell Trigger) */}
          <div 
            onClick={onCtaClick}
            className="relative bg-emerald-900 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-center items-center text-center p-8 border border-emerald-800 group cursor-pointer hover:scale-[1.02] transition-transform"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="bg-white/10 p-4 rounded-full mb-6 backdrop-blur-sm group-hover:bg-gold-500/20 transition-colors">
              <Lock className="w-8 h-8 text-gold-400" />
            </div>
            
            <h3 className="font-bold text-white text-xl mb-2 relative z-10">
              +48 Aulas Bloqueadas
            </h3>
            
            <p className="text-emerald-200 text-sm mb-6 relative z-10">
              Isso foi apenas 5% do conteúdo. Desbloqueie o método completo, aprenda a precificar, vender e faturar alto.
            </p>
            
            <button className="w-full bg-gold-500 hover:bg-gold-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg relative z-10 transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              QUERO DESBLOQUEAR TUDO
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FreePreview;