import React, { useState, useEffect } from 'react';
import { Timer, Percent, ArrowRight, AlertTriangle, Ban, CheckCircle2, Trophy, Gift, Star, ShieldCheck } from 'lucide-react';

interface LastChanceProps {
  step: 'offer1' | 'offer2';
  onNextStep: () => void;
}

const LastChance: React.FC<LastChanceProps> = ({ step, onNextStep }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(true);

  // Reinicia o timer e configurações quando muda para a oferta 2
  useEffect(() => {
    if (step === 'offer2') {
        setTimeLeft(120); // 2 minutos para pressão final
        setIsActive(true);
    }
  }, [step]);

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
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Downsell 01 - R$72.75',
        value: 72.75,
        currency: 'BRL'
      });
    }
    setTimeout(() => { window.location.href = "https://pay.kiwify.com.br/8DJPyTz"; }, 300);
  };

  const handleRejectOffer1 = () => {
    onNextStep();
  };

  const handleAcceptOffer2 = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Downsell 02 (Final) - R$37.00',
        value: 37.00,
        currency: 'BRL'
      });
    }
    setTimeout(() => { window.location.href = "https://pay.kiwify.com.br/Skd9Pnc"; }, 300);
  };

  return (
    <section className="bg-emerald-50 min-h-screen md:min-h-0 flex flex-col justify-center py-4 md:py-20 relative overflow-hidden">
      
      {/* Background Decor */}
      {step === 'offer2' && (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-emerald-950 opacity-100 z-0"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[100px] opacity-30 z-0"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-600 rounded-full blur-[100px] opacity-20 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex-grow flex flex-col justify-center">
        
        {/* =========================================================================
            ETAPA 1: OFERTA DE R$ 72,75 (25% OFF) - MANTIDA SIMPLES
           ========================================================================= */}
        {step === 'offer1' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-red-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Conteúdo Etapa 1 omitido para brevidade, foco na etapa 2 */}
                {/* Caso precise da etapa 1, ela seria a mesma lógica visual anterior */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Oportunidade de Desconto</h2>
                    <button onClick={handleAcceptOffer1} className="bg-green-600 text-white px-6 py-3 rounded">Aceitar R$ 72,75</button>
                    <button onClick={handleRejectOffer1} className="block w-full mt-4 text-slate-500">Recusar</button>
                </div>
          </div>
        )}

        {/* =========================================================================
            ETAPA 2: OFERTA FINAL DE R$ 37,00 (DESIGN VERDE PROSPERIDADE)
            "A Última Tentativa" - Focado em Dinheiro e Valor
           ========================================================================= */}
        {step === 'offer2' && (
          <div className="animate-in zoom-in-95 duration-500">
             
             <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-gold-500 text-gold-400 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-4 shadow-lg">
                    <Star className="w-3 h-3 fill-gold-400" />
                    Oferta Secreta de Prosperidade
                    <Star className="w-3 h-3 fill-gold-400" />
                </div>
                <h2 className="text-3xl md:text-6xl font-serif font-bold text-white leading-none mb-3 drop-shadow-lg">
                    Não Deixe Dinheiro <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-200 to-gold-400">Na Mesa!</span>
                </h2>
                <p className="text-emerald-200 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Eu entendo que o momento pode estar difícil. Mas eu não vou deixar você ir embora sem a ferramenta para mudar isso.
                </p>
            </div>

            {/* Card Principal de Oferta */}
            <div className="bg-gradient-to-b from-white to-emerald-50 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-emerald-200 overflow-hidden relative w-full max-w-3xl mx-auto">
                
                {/* Timer Bar */}
                <div className="bg-emerald-900 text-white py-2 px-4 flex justify-between items-center relative z-20">
                    <span className="font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                        <Timer className="w-4 h-4 text-gold-400" />
                        A oferta expira em:
                    </span>
                    <span className="font-mono font-bold text-lg text-gold-400 tabular-nums">
                        {formatTime(timeLeft)}
                    </span>
                    {/* Progress Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-emerald-800 w-full">
                         <div className="h-full bg-gold-500 transition-all duration-1000 ease-linear" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="p-6 md:p-10 relative">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        
                        {/* Lado Esquerdo: Valor e Preço */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-emerald-950 font-bold text-lg uppercase tracking-wide mb-2">Plano Anual Econômico</h3>
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="text-slate-400 text-lg line-through decoration-red-500 decoration-2">R$ 97,00</span>
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-200">-62% OFF</span>
                            </div>
                            
                            <div className="flex items-start justify-center md:justify-start gap-1 mb-2">
                                <span className="text-2xl font-bold text-emerald-700 mt-2">R$</span>
                                <span className="text-7xl font-black text-emerald-900 tracking-tighter leading-none">37</span>
                                <span className="text-2xl font-bold text-emerald-700 mt-2">,00</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">Pagamento único. Acesso por 1 ano.</p>
                        </div>

                        {/* Divisor */}
                        <div className="w-full md:w-px h-px md:h-32 bg-slate-200"></div>

                        {/* Lado Direito: Benefícios */}
                        <div className="flex-1 w-full">
                            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Gift className="w-4 h-4 text-gold-500" />
                                    Tudo o que você leva:
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Curso Completo Balões Lucrativos</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Bônus:</strong> Caixa Floral de Luxo</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Bônus:</strong> Embalagens Criativas</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-700">
                                        <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Garantia de 7 Dias Inclusa</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Botão de Ação */}
                    <div className="mt-8 space-y-4">
                        <button 
                            onClick={handleAcceptOffer2}
                            className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xl py-5 rounded-xl shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-wide group"
                        >
                            <span>Quero Lucrar com R$ 37,00</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3" />
                            Ambiente Seguro • Acesso Imediato
                        </div>
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