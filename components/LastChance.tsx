import React, { useState, useEffect } from 'react';
import { Timer, Percent, ArrowRight, AlertTriangle, Ban, CheckCircle2, Trophy } from 'lucide-react';

interface LastChanceProps {
  step: 'offer1' | 'offer2';
  onNextStep: () => void;
}

const LastChance: React.FC<LastChanceProps> = ({ step, onNextStep }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(true);

  // Reinicia o timer e configurações quando muda para a oferta 2 (via botão ou via Back do navegador)
  useEffect(() => {
    if (step === 'offer2') {
        setTimeLeft(120); // 2 minutos para pressão final
        setIsActive(true);
    }
  }, [step]);

  // Timer logic
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setIsActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / 180) * 100;

  const handleAcceptOffer1 = () => {
    // Rastreamento Personalizado
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BTN-COMPRAR-DOWNSELL-1');
    }

    // Rastreamento Padrão
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Downsell 01 - R$72.75',
        value: 72.75,
        currency: 'BRL',
        content_ids: ['baloes-downsell-1'],
        content_type: 'product'
      });
    }

    setTimeout(() => {
      window.location.href = "https://pay.kiwify.com.br/8DJPyTz"; 
    }, 300);
  };

  const handleRejectOffer1 = () => {
    // Rastreamento Personalizado
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BTN-RECUSAR-OFERTA');
    }
    onNextStep();
  };

  const handleAcceptOffer2 = () => {
    // Rastreamento Personalizado
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BTN-COMPRAR-DOWNSELL-2');
    }

    // Rastreamento Padrão
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Downsell 02 (Final) - R$37.00',
        value: 37.00,
        currency: 'BRL',
        content_ids: ['baloes-downsell-2'],
        content_type: 'product'
      });
    }
    
    setTimeout(() => {
       window.location.href = "https://pay.kiwify.com.br/Skd9Pnc"; 
    }, 300);
  };

  return (
    <section className="bg-white border-t-4 border-red-600 relative overflow-hidden min-h-screen md:min-h-0 flex flex-col justify-center py-4 md:py-20">
      
      {/* Background Alerts (Visual Noise reduced for mobile cleaner look) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex-grow flex flex-col justify-center">
        
        {/* =========================================================================
            ETAPA 1: OFERTA DE R$ 72,75 (25% OFF)
           ========================================================================= */}
        {step === 'offer1' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Header Compacto Mobile */}
            <div className="text-center mb-6 md:mb-10">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 md:px-4 md:py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-widest mb-3 animate-bounce">
                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
                    Espere! Não vá embora
                </div>
                <h2 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight mb-2">
                    O Preço é o Problema?
                </h2>
                <p className="text-slate-500 text-sm md:text-xl max-w-2xl mx-auto font-medium px-2">
                    Não perca essa chance por causa de <span className="text-red-600 font-bold underline">R$ 24,00</span>.
                </p>
            </div>

            {/* Card Principal */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-dashed border-slate-300 overflow-hidden relative w-full max-w-md md:max-w-4xl mx-auto">
                {/* Timer Bar */}
                <div className="bg-slate-900 text-white py-2 px-4 flex justify-between items-center">
                    <span className="font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2">
                        <Timer className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                        Expira em:
                    </span>
                    <span className="font-mono font-bold text-xl text-yellow-400 tabular-nums">
                        {formatTime(timeLeft)}
                    </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200">
                    <div className="h-full bg-red-600 transition-all duration-1000 ease-linear" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <div className="p-5 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
                    
                    <div className="flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <Percent className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                            <span className="font-black text-green-600 uppercase tracking-widest text-xs md:text-sm">Cupom 25% OFF</span>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start mb-4">
                           <span className="text-slate-400 text-sm line-through decoration-red-500">De R$ 97,00</span>
                           <div className="flex items-baseline gap-2">
                              <span className="text-lg text-slate-600 font-bold">12x de</span>
                              <span className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tighter">R$ 7,52</span>
                           </div>
                           <span className="text-sm font-bold text-slate-500">ou R$ 72,75 à vista</span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col gap-3">
                        <button 
                            onClick={handleAcceptOffer1}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-base md:text-lg py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                        >
                            Quero o Desconto
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        
                        <button 
                          onClick={handleRejectOffer1}
                          className="w-full py-3 text-slate-400 font-bold text-xs hover:text-red-500 transition-colors flex items-center justify-center gap-1"
                        >
                            <Ban className="w-3 h-3" />
                            Não, prefiro continuar sem dinheiro
                        </button>
                    </div>

                </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ETAPA 2: OFERTA FINAL DE R$ 37,00 (NEGOCIAÇÃO)
           ========================================================================= */}
        {step === 'offer2' && (
          <div className="animate-in zoom-in-95 duration-500">
             
             <div className="text-center mb-4 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-gold-100 text-yellow-800 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-3 border border-gold-300">
                    <Trophy className="w-3 h-3" />
                    Ok, você venceu!
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-none mb-2">
                    Você sabe negociar!
                </h2>
                <p className="text-slate-600 text-sm md:text-xl font-medium px-4">
                    Eu realmente quero você no time das minhas alunas de sucesso. <br className="hidden md:block"/>
                    Então aqui está minha <strong className="text-red-600 uppercase">última oferta</strong>. É pegar ou largar.
                </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-gold-500 overflow-hidden relative w-full max-w-md md:max-w-3xl mx-auto text-white">
                
                {/* Efeito de brilho de fundo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl"></div>

                <div className="p-5 md:p-10 text-center">
                    <h3 className="text-gold-400 font-bold text-lg md:text-2xl uppercase tracking-widest mb-2">
                        Oferta Final e Única
                    </h3>
                    
                    <div className="my-6 md:my-8 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                       <p className="text-slate-400 text-sm line-through mb-1">Preço Normal: R$ 97,00</p>
                       <p className="text-slate-400 text-sm line-through mb-2">Oferta Anterior: R$ 72,75</p>
                       <div className="w-full h-px bg-white/10 my-3"></div>
                       <p className="text-white text-sm font-bold uppercase mb-1">Preço para fechar agora:</p>
                       <p className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none text-shadow-lg">
                          <span className="text-2xl md:text-4xl font-bold align-top text-gold-500 mr-1">R$</span>
                          37,00
                       </p>
                       <p className="text-xs text-gold-400/80 mt-2 font-mono">Pagamento Único • Sem taxas extras</p>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={handleAcceptOffer2}
                            className="w-full bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-400 hover:to-yellow-400 text-slate-900 font-black text-base md:text-xl py-3 md:py-5 px-4 md:px-6 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-wide animate-pulse-slow"
                        >
                            <CheckCircle2 className="w-5 h-6 md:w-6 md:h-6" />
                            <span>Aceitar Proposta de R$ 37</span>
                        </button>
                        
                        <p className="text-[10px] text-slate-500 leading-tight px-4">
                           *Ao clicar em aceitar, você será redirecionada para o checkout com o valor atualizado.
                           Essa oferta não aparecerá novamente se você fechar a página.
                        </p>
                    </div>
                </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default LastChance;