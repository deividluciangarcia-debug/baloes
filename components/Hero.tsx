import React from 'react';
import { PlayCircle, DollarSign, TrendingUp, CalendarDays } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onLearnMoreClick: () => void;
  spotsLeft: number;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onLearnMoreClick, spotsLeft }) => {
  return (
    <section className="relative bg-emerald-950 text-white pt-12 pb-24 md:pt-24 md:pb-36 overflow-hidden">
      {/* Otimização: Substituído imagem externa pesada por CSS puro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-emerald-950 to-emerald-950 opacity-60"></div>
      
      {/* Background Wealth Effects - CSS Pure Shapes instead of heavy images */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-600 rounded-full blur-[100px] opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-600 rounded-full blur-[120px] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Badge de Lucratividade */}
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700/50 rounded-full px-4 py-1.5 mb-8 animate-bounce-custom backdrop-blur-sm shadow-xl">
             <div className="bg-green-500 rounded-full p-1">
                <TrendingUp className="w-3 h-3 text-white" />
             </div>
             <span className="text-emerald-100 text-xs md:text-sm font-bold tracking-wide uppercase">
                Método Validado: <span className="text-gold-400">Lucro de até 500%</span>
             </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold font-serif mb-6 leading-[1.1] drop-shadow-2xl">
            Transforme Ar em <br/>
            <span className="text-gradient-gold italic">
              Dinheiro Real na Sua Conta
            </span>
          </h1>
          
          {/* Texto Melhorado: Removido whitespace-nowrap para fluir melhor no mobile */}
          <p className="text-lg md:text-2xl text-emerald-100/90 mb-10 max-w-4xl mx-auto leading-relaxed font-light px-2">
            O único mercado onde você fatura <strong className="text-white border-b-2 border-gold-500 font-bold">até R$5.000</strong> por fim de semana, trabalhando apenas <span className="font-semibold text-white">2 dias</span> e folgando <span className="font-semibold text-white">5 dias</span>.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full md:w-auto">
            <button 
              onClick={onCtaClick}
              className="w-full md:w-auto bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-black text-xl md:text-2xl py-5 px-12 rounded-2xl shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transform hover:-translate-y-1 transition-all duration-200 animate-shine-effect border border-gold-300 flex items-center justify-center gap-3"
            >
              <DollarSign className="w-6 h-6 md:w-8 md:h-8" />
              QUERO ATIVAR MINHA RENDA
            </button>
            <button 
              onClick={onLearnMoreClick}
              className="group flex items-center gap-2 text-emerald-200 hover:text-white transition-colors font-medium px-6 py-3 rounded-xl hover:bg-emerald-900/50 border border-transparent hover:border-emerald-700/50"
            >
              <PlayCircle className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              Ver como funciona
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 w-full max-w-4xl border-t border-emerald-800/50 pt-8">
             <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white mb-1">R$150,00</span>
                <span className="text-emerald-400 text-sm uppercase tracking-wider">Investimento Baixo</span>
             </div>
             <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-emerald-800/50 py-4 md:py-0">
                <span className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                   2x5 <CalendarDays className="w-6 h-6 text-gold-500" />
                </span>
                <span className="text-emerald-400 text-sm uppercase tracking-wider">Trabalhe 2, Folgue 5</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white mb-1">Até R$5k</span>
                <span className="text-emerald-400 text-sm uppercase tracking-wider">Faturamento Mensal</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;