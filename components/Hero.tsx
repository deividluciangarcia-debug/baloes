import React from 'react';
import { CheckCircle, PlayCircle } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onLearnMoreClick: () => void;
  spotsLeft: number;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onLearnMoreClick, spotsLeft }) => {
  // Percent logic removed as it's no longer used in this component visually
  
  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-900 text-white pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* NOVA LEAD - Box Branco Grande com Efeito Saltitante (Bounce) */}
          <div className="bg-white rounded-2xl p-1 md:p-2 mb-10 shadow-[0_0_50px_-12px_rgba(255,255,255,0.25)] animate-bounce-custom">
            <div className="bg-white border-2 border-dashed border-emerald-100 rounded-xl px-6 py-4 md:px-10 md:py-6 flex flex-col md:flex-row items-center gap-3 md:gap-5">
                <span className="relative flex h-5 w-5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600"></span>
                </span>
                
                <div className="text-center md:text-left">
                    <p className="text-emerald-950 text-xl md:text-3xl font-black uppercase tracking-tight leading-none">
                        Escala Invertida:
                    </p>
                    <p className="text-emerald-600 text-base md:text-xl font-bold leading-tight mt-1">
                        Trabalhe 2 dias e <span className="underline decoration-gold-500 decoration-4 underline-offset-2">descanse 5!</span>
                    </p>
                </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold font-serif mb-6 leading-tight drop-shadow-lg">
            Fature até R$5.000 em <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-yellow-200 to-gold-400">
              Um Único Final de Semana
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            O método definitivo para transformar balões de látex em <strong>máquinas de imprimir dinheiro</strong>. 
            Sem chefe, sem horário fixo e com margem de lucro de até 500%.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
            <button 
              onClick={onCtaClick}
              className="w-full md:w-auto bg-gradient-to-b from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold text-xl md:text-2xl py-5 px-12 rounded-2xl shadow-[0_4px_14px_0_rgba(217,119,6,0.6)] transform hover:-translate-y-1 transition-all duration-200 animate-shine-effect border-t border-white/20"
            >
              SIM! QUERO LUCRAR COM FESTAS
            </button>
            <button 
              onClick={onLearnMoreClick}
              className="group flex items-center gap-2 text-emerald-200 hover:text-white transition-colors font-medium px-6 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              <PlayCircle className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
              Ver a grade completa
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-emerald-200/80 text-sm md:text-base font-medium">
             <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Método à prova de falhas</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Comece com apenas R$200</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Risco Zero (Garantia Total)</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;