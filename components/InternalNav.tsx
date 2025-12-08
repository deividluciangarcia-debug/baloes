import React from 'react';
import { Calculator, PlayCircle, DollarSign, ArrowRight } from 'lucide-react';

interface InternalNavProps {
  currentSection: 'earnings' | 'preview';
}

const InternalNav: React.FC<InternalNavProps> = ({ currentSection }) => {
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const trackClick = (action: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', `NAV-HUB-${action.toUpperCase()}`, {
            from_section: currentSection
        });
    }
  };

  return (
    <div className="w-full mt-12 md:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
         
         <p className="text-center text-white/90 font-serif text-lg mb-6 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-white/30"></span>
            O que você deseja fazer agora?
            <span className="h-px w-8 bg-white/30"></span>
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* BOTÃO 1: Alternativa Lógica (Se não estiver na seção atual) */}
            {currentSection !== 'earnings' && (
                <button 
                  onClick={() => { trackClick('Simular'); scrollTo('earnings-calculator'); }}
                  className="flex items-center gap-4 bg-emerald-800/40 hover:bg-emerald-800/60 border border-emerald-600/30 p-4 rounded-xl transition-all group text-left"
                >
                    <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-300 group-hover:scale-110 transition-transform">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="block text-emerald-100 font-bold text-base group-hover:text-white">Calcular Potencial</span>
                        <span className="text-emerald-400 text-xs">Veja quanto pode faturar</span>
                    </div>
                </button>
            )}

            {currentSection !== 'preview' && (
                <button 
                  onClick={() => { trackClick('Preview'); scrollTo('free-preview'); }}
                  className="flex items-center gap-4 bg-emerald-800/40 hover:bg-emerald-800/60 border border-emerald-600/30 p-4 rounded-xl transition-all group text-left"
                >
                    <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-300 group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="block text-emerald-100 font-bold text-base group-hover:text-white">Ver Aula Grátis</span>
                        <span className="text-emerald-400 text-xs">Conheça a didática</span>
                    </div>
                </button>
            )}

            {/* BOTÃO 2: COMPRA (Sempre Presente e Destacado) */}
            <button 
               onClick={() => { trackClick('Comprar'); scrollTo('pricing'); }}
               className="flex items-center justify-between gap-4 bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-yellow-400 hover:to-gold-400 p-4 rounded-xl transition-all group text-left shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] border border-yellow-400/50"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full text-white">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="block text-emerald-950 font-black text-base uppercase tracking-wide">Começar Agora</span>
                        <span className="text-emerald-900 font-medium text-xs">Aproveitar oferta atual</span>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-950 group-hover:translate-x-1 transition-transform" />
            </button>

         </div>
      </div>
    </div>
  );
};

export default InternalNav;