import React from 'react';
import { PlayCircle, DollarSign, TrendingUp, CalendarDays } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onLearnMoreClick: () => void;
  spotsLeft: number;
  variant?: 'green' | 'light';
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onLearnMoreClick, spotsLeft, variant = 'green' }) => {
  
  const handleCtaClick = () => {
    // Rastreamento de conversão segmentado por variante (Verde vs Clara)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BTN-ATIVAR-RENDA', {
        local: 'Hero Section',
        variant: variant 
      });
    }
    onCtaClick();
  };

  const handleLearnMoreClick = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BTN-VER-FUNCIONA', {
        local: 'Hero Section',
        variant: variant
      });
    }
    onLearnMoreClick();
  };

  const isGreen = variant === 'green';

  // --- SISTEMA DE DESIGN HÍBRIDO (VERDE LUXO vs CLARO FINTECH) ---

  // Container: Verde = Sólido | Claro = Grid Pattern Técnico
  const containerClass = isGreen 
    ? "relative bg-emerald-950 text-white pt-12 pb-24 md:pt-24 md:pb-36 overflow-hidden transition-colors duration-500"
    : "relative bg-slate-50 text-slate-900 pt-12 pb-24 md:pt-24 md:pb-36 overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] transition-colors duration-500";

  // Overlay apenas no verde para profundidade
  const overlayClass = isGreen
    ? "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-emerald-950 to-emerald-950 opacity-60 pointer-events-none"
    : "hidden";

  // Blobs de Luz: Apenas no verde. No claro limpamos a visão.
  const blobClass = isGreen
    ? "absolute rounded-full blur-[100px] opacity-30 animate-pulse-slow"
    : "hidden"; 

  // Badge Topo
  const badgeClass = isGreen
    ? "bg-emerald-900/80 border border-emerald-700/50 text-emerald-100 backdrop-blur-sm"
    : "bg-white border border-slate-200 text-slate-700 shadow-sm"; 

  // Título Principal
  const headingClass = isGreen
    ? "text-white drop-shadow-2xl"
    : "text-slate-900 tracking-tight drop-shadow-sm"; 

  // EFEITO DESTAQUE NO TEXTO "DINHEIRO REAL"
  // Verde: Gradiente Dourado Luxuoso
  // Claro: Efeito "Marca-Texto" (Highlighter) Amarelo para alto contraste
  const highlightWrapperClass = isGreen
    ? "block mt-2" // No verde é um bloco normal
    : "relative inline-block px-2 mt-2 mx-1"; // No claro tem padding para o fundo amarelo

  const highlightBgClass = isGreen
    ? "hidden"
    : "absolute inset-0 bg-yellow-300 transform -skew-x-3 rounded-md shadow-sm"; // Fundo amarelo inclinado

  const highlightTextClass = isGreen
    ? "text-gradient-gold" // Classe CSS global
    : "relative z-10 text-emerald-950 font-black italic"; // Texto escuro sobre amarelo

  // Subtítulo
  const subHeadingClass = isGreen
    ? "text-emerald-100/90"
    : "text-slate-600 font-medium";

  // Botão Principal (CTA)
  // Verde: Dourado Brilhante
  // Claro: Verde Esmeralda Sólido (Contraste máximo com fundo branco)
  const mainBtnClass = isGreen
    ? "bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 border-gold-300 shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)]"
    : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-[0_10px_20px_-10px_rgba(5,150,105,0.5)]";

  // Botão Secundário
  const secondaryBtnClass = isGreen
    ? "text-emerald-200 hover:text-white hover:bg-emerald-900/50 hover:border-emerald-700/50 border-transparent"
    : "text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:border-slate-300 shadow-sm";

  // ESTATÍSTICAS (RODAPÉ DO HERO)
  // Verde: Grid simples com divisores
  // Claro: Cards flutuantes (Boxed UI)
  const statsGridClass = isGreen
    ? "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 w-full max-w-4xl border-t border-emerald-800/50 pt-8 mt-16"
    : "grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mt-12"; 

  const statItemClass = isGreen
    ? "flex flex-col items-center"
    : "flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-slate-100 transform hover:-translate-y-1 transition-transform";

  const statDividerClass = isGreen
    ? "border-y md:border-y-0 md:border-x border-emerald-800/50 py-4 md:py-0"
    : ""; // Sem divisores no modo claro, pois são cards

  return (
    <section className={containerClass}>
      <div className={overlayClass}></div>
      
      {/* Background Wealth Effects (Only Green Mode) */}
      <div className={`-top-20 -right-20 w-96 h-96 bg-emerald-600 ${blobClass}`}></div>
      <div className={`bottom-0 left-0 w-[500px] h-[500px] bg-gold-600 ${blobClass}`}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Top Badge */}
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 animate-bounce-custom shadow-xl ${badgeClass}`}>
             <div className="bg-emerald-500 rounded-full p-1 shadow-sm">
                <TrendingUp className="w-3 h-3 text-white" />
             </div>
             <span className="text-xs md:text-sm font-bold tracking-wide uppercase">
                Método Validado: <span className={isGreen ? "text-gold-500" : "text-emerald-700"}>Lucro de até 500%</span>
             </span>
          </div>
          
          {/* Main Headline */}
          <h1 className={`text-4xl md:text-7xl font-bold font-serif mb-6 leading-[1.1] ${headingClass}`}>
            Transforme Ar em <br/>
            <span className={highlightWrapperClass}>
              <span className={highlightBgClass}></span>
              <span className={highlightTextClass}>Dinheiro Real na Sua Conta</span>
            </span>
          </h1>
          
          <p className={`text-lg md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed font-light px-2 ${subHeadingClass}`}>
            O único mercado onde você fatura <strong className={`font-bold ${isGreen ? "text-white border-b-2 border-gold-500" : "bg-emerald-100 text-emerald-900 px-1 rounded"}`}>até R$5.000</strong> por fim de semana, trabalhando apenas <span className="font-bold">2 dias</span> e <strong className={`font-bold ${isGreen ? "text-white border-b-2 border-gold-500" : "bg-emerald-100 text-emerald-900 px-1 rounded"}`}>descansando 5 dias</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full md:w-auto">
            <button 
              onClick={handleCtaClick}
              className={`w-full md:w-auto font-black text-xl md:text-2xl py-5 px-12 rounded-2xl transform hover:-translate-y-1 transition-all duration-200 animate-shine-effect border flex items-center justify-center gap-3 ${mainBtnClass}`}
            >
              <DollarSign className="w-6 h-6 md:w-8 md:h-8" />
              QUERO ATIVAR MINHA RENDA
            </button>
            <button 
              onClick={handleLearnMoreClick}
              className={`group flex items-center gap-2 transition-colors font-medium px-6 py-3 rounded-xl border ${secondaryBtnClass}`}
            >
              <PlayCircle className={`w-6 h-6 group-hover:scale-110 transition-transform ${isGreen ? 'text-emerald-500' : 'text-emerald-600'}`} />
              Ver como funciona
            </button>
          </div>

          {/* Stats Grid */}
          <div className={statsGridClass}>
             {/* Stat 1 */}
             <div className={statItemClass}>
                <span className={`text-3xl font-bold mb-1 ${isGreen ? 'text-white' : 'text-slate-900'}`}>R$150,00</span>
                <span className={`text-sm uppercase tracking-wider ${isGreen ? 'text-emerald-400' : 'text-slate-500 font-bold'}`}>Investimento Baixo</span>
             </div>
             
             {/* Stat 2 */}
             <div className={`${statItemClass} ${statDividerClass}`}>
                <span className={`text-3xl font-bold mb-1 flex items-center gap-2 ${isGreen ? 'text-white' : 'text-slate-900'}`}>
                   2x5 <CalendarDays className="w-6 h-6 text-gold-500" />
                </span>
                <span className={`text-sm uppercase tracking-wider ${isGreen ? 'text-emerald-400' : 'text-slate-500 font-bold'}`}>Trabalhe 2, Folgue 5</span>
             </div>
             
             {/* Stat 3 */}
             <div className={statItemClass}>
                <span className={`text-3xl font-bold mb-1 ${isGreen ? 'text-white' : 'text-slate-900'}`}>Até R$5k</span>
                <span className={`text-sm uppercase tracking-wider ${isGreen ? 'text-emerald-400' : 'text-slate-500 font-bold'}`}>Faturamento Mensal</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;