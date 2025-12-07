import React from 'react';
import { PlayCircle, PartyPopper, DollarSign, ArrowRight, Calculator, Eye, ChevronDown } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <PlayCircle className="w-10 h-10 text-white" />,
      title: "1. Copie o Método",
      desc: "Assista às aulas práticas. Você vai aprender a montar estruturas de luxo gastando muito pouco.",
      color: "bg-emerald-500",
      shadow: "shadow-emerald-200",
      badge: "Fácil de Aprender"
    },
    {
      icon: <PartyPopper className="w-10 h-10 text-white" />,
      title: "2. Monte em Minutos",
      desc: "Aplique técnicas de montagem rápida. Crie decorações profissionais em menos de 2 horas.",
      color: "bg-emerald-600",
      shadow: "shadow-emerald-300",
      badge: "Sem Esforço Físico"
    },
    {
      icon: <DollarSign className="w-10 h-10 text-white" />,
      title: "3. Receba o Pix",
      desc: "O cliente paga 50% adiantado. Você lucra até 500% em cima de cada balão cheio.",
      color: "bg-gold-500",
      shadow: "shadow-yellow-200",
      badge: "Lucro Imediato"
    }
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl -z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 font-bold tracking-widest uppercase text-xs mb-4 border border-emerald-200 shadow-sm animate-pulse-slow">
            Simples • Rápido • Lucrativo
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-emerald-950 font-serif leading-tight mb-6">
            Como Colocar Dinheiro<br/>
            <span className="relative inline-block mt-2">
               <span className="absolute inset-0 bg-gold-400 transform -skew-x-3 rounded-lg shadow-lg opacity-30"></span>
               <span className="relative z-10 px-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600">
                 No Seu Bolso
               </span>
            </span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Esqueça teorias complicadas. O método Balões Lucrativos é um sistema prático para você faturar <span className="bg-green-100 text-green-800 font-bold px-1 rounded border border-green-200">até R$ 5.000</span> trabalhando apenas nos finais de semana.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto relative mb-24">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-gold-300 -z-10 dashed-line"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-default">
              
              {/* Icon Circle with Pulse Effect */}
              <div className="relative mb-8">
                 <div className={`absolute inset-0 rounded-full ${step.color} opacity-20 animate-ping`}></div>
                 <div className={`w-32 h-32 rounded-full ${step.color} flex items-center justify-center shadow-2xl ${step.shadow} relative transform group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                    {step.icon}
                    <div className="absolute -top-2 -right-2 bg-emerald-950 text-gold-400 text-xs font-black w-8 h-8 flex items-center justify-center rounded-full border-2 border-white shadow-lg z-20">
                    {idx + 1}
                    </div>
                 </div>
              </div>

              {/* Content Card */}
              <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 w-full h-full relative flex flex-col items-center group-hover:-translate-y-2">
                 
                 <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    {step.badge}
                 </span>

                 {/* Mobile Arrow */}
                 {idx < steps.length - 1 && (
                    <div className="md:hidden absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                        <ArrowDown className="w-8 h-8 text-emerald-300" />
                    </div>
                 )}
                 
                 <h3 className="text-2xl font-bold text-emerald-950 mb-3">{step.title}</h3>
                 <p className="text-slate-600 leading-relaxed text-base">
                    {step.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- NAVIGATION HUB (GANCHOS) --- */}
        <div className="bg-emerald-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border-4 border-emerald-900">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500 rounded-full blur-[80px] opacity-20 animate-pulse"></div>

            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">
                    Você entendeu como funciona?
                </h3>
                <p className="text-emerald-200 mb-10 text-lg">
                    Agora escolha qual o seu próximo passo para mudar de vida:
                </p>

                <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    
                    {/* Option 1: Calculator */}
                    <button 
                        onClick={() => scrollTo('earnings-calculator')}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400 p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 backdrop-blur-sm"
                    >
                        <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-300 group-hover:text-emerald-200 group-hover:bg-emerald-500 transition-colors">
                            <Calculator className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <span className="block text-white font-bold text-lg mb-1">Simular Ganhos</span>
                            <span className="text-emerald-400 text-xs">Calcule quanto você pode lucrar</span>
                        </div>
                    </button>

                    {/* Option 2: Free Class */}
                    <button 
                        onClick={() => scrollTo('free-preview')}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400 p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 backdrop-blur-sm"
                    >
                        <div className="bg-red-500/20 p-3 rounded-full text-red-300 group-hover:text-red-100 group-hover:bg-red-500 transition-colors">
                            <Eye className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <span className="block text-white font-bold text-lg mb-1">Ver Aula Grátis</span>
                            <span className="text-red-300 text-xs">Espie o curso por dentro</span>
                        </div>
                    </button>

                    {/* Option 3: Buy (Primary) */}
                    <button 
                        onClick={() => scrollTo('pricing')}
                        className="group bg-gradient-to-br from-gold-500 to-yellow-600 hover:from-gold-400 hover:to-yellow-500 border border-gold-400 p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 shadow-[0_0_20px_rgba(234,179,8,0.3)] transform hover:-translate-y-1"
                    >
                        <div className="bg-white/20 p-3 rounded-full text-white group-hover:scale-110 transition-transform">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <span className="block text-emerald-950 font-black text-lg mb-1">COMEÇAR AGORA</span>
                            <span className="text-emerald-900 text-xs font-bold opacity-80">Quero minha vaga!</span>
                        </div>
                    </button>

                </div>
            </div>
        </div>

      </div>

      <style>{`
        .dashed-line {
            background-image: linear-gradient(to right, #10b981 50%, rgba(255,255,255,0) 0%);
            background-position: bottom;
            background-size: 30px 2px;
            background-repeat: repeat-x;
            height: 2px;
            background-color: transparent;
        }
        .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

const ArrowDown = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
);

export default HowItWorks;