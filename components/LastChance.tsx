import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Star, CheckCircle2, AlertCircle, XCircle, Gift, Lock, ShieldCheck, Users } from 'lucide-react';

interface LastChanceProps {
  step: 'offer1' | 'offer2';
  onNextStep: () => void;
}

// --- NOVO COMPONENTE: MÁSCARA DE SEGURANÇA/INTERAÇÃO ---
const SecurityMask = ({ onUnlock }: { onUnlock: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-emerald-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border-b-4 border-emerald-600 relative overflow-hidden">
        
        {/* Top Icon */}
        <div className="mx-auto mb-4 bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">
           <Users className="w-8 h-8 text-emerald-600" />
        </div>

        <h2 className="text-xl font-black text-emerald-950 mb-2 uppercase tracking-wide">
          Alta Demanda Identificada
        </h2>
        
        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
          Muitas pessoas estão acessando esta página simultaneamente. Reservamos uma vaga prioritária para você.
        </p>

        {/* Status Check Fake */}
        <div className="bg-slate-50 rounded-lg p-3 mb-6 text-xs text-left border border-slate-100">
             <div className="flex items-center gap-2 mb-1 text-emerald-700 font-bold">
                 <CheckCircle2 className="w-3 h-3" /> Conexão Segura
             </div>
             <div className="flex items-center gap-2 text-emerald-700 font-bold">
                 <CheckCircle2 className="w-3 h-3" /> Vaga Disponível
             </div>
        </div>

        <button 
          onClick={onUnlock}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base py-3.5 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          VISUALIZAR OPORTUNIDADE
        </button>
      </div>
    </div>
  );
};

const LastChance: React.FC<LastChanceProps> = ({ step, onNextStep }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(true);
  
  // Estado para controlar a máscara de interação na oferta 1
  const [showSecurityMask, setShowSecurityMask] = useState(false);

  // Reinicia o timer e configurações quando muda de etapa
  useEffect(() => {
    if (step === 'offer1') {
        setTimeLeft(180); // 3 minutos para primeira oferta
        setIsActive(true);
        // Ativa a máscara de segurança ao entrar na oferta 1
        setShowSecurityMask(true);
    } else if (step === 'offer2') {
        setTimeLeft(120); // 2 minutos para oferta final
        setIsActive(true);
        setShowSecurityMask(false);
    }
  }, [step]);

  // Handler para desbloquear e GARANTIR O PUSH STATE para o botão voltar funcionar
  const handleUnlockSecurity = () => {
     // CRÍTICO: Empurra um novo estado no histórico.
     // Assim, quando o usuário clicar em "Voltar", ele cairá no listener de 'popstate' do App.tsx
     // que vai detectar que estamos na offer1 e redirecionar para offer2.
     window.history.pushState({ page: 'downsell-view-unlocked' }, '', window.location.href);
     
     setShowSecurityMask(false);
     
     // Som sutil de sucesso (opcional)
     try {
       const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=pop-39222.mp3");
       audio.volume = 0.1;
       audio.play().catch(() => {});
     } catch (e) {}
  };

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

  const progressPercentage = (timeLeft / (step === 'offer1' ? 180 : 120)) * 100;

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

  // ESTA FUNÇÃO É CRÍTICA: Chama o prop que leva para o step offer2
  const handleRejectOffer1 = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'RECUSOU-72-FOI-PARA-37');
    }
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
    <>
    {/* Máscara de Interação Obrigatória (Apenas no Step 1) */}
    {step === 'offer1' && showSecurityMask && (
        <SecurityMask onUnlock={handleUnlockSecurity} />
    )}

    <section className={`bg-emerald-50 min-h-screen md:min-h-0 flex flex-col justify-center py-4 md:py-20 relative overflow-hidden transition-all duration-500 ${showSecurityMask ? 'blur-sm h-screen overflow-hidden' : ''}`}>
      
      {/* Background Decor Universal */}
      <div className="absolute top-0 left-0 w-full h-full bg-emerald-950 opacity-100 z-0"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[100px] opacity-30 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-600 rounded-full blur-[100px] opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex-grow flex flex-col justify-center">
        
        {/* =========================================================================
            ETAPA 1: OFERTA DE R$ 72,75 (25% OFF) - DESIGN VERDE PROSPERIDADE
           ========================================================================= */}
        {step === 'offer1' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             
             <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-4 shadow-lg animate-pulse">
                    <AlertCircle className="w-3 h-3 text-white" />
                    Espere! Não vá ainda
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3 drop-shadow-lg">
                    Esqueceu de Ativar seu <br/>
                    <span className="text-gold-400">Cupom de Desconto?</span>
                </h2>
                <p className="text-emerald-100 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    Percebi que você estava saindo sem acessar o treinamento. Como acredito no seu potencial, liberei um desconto especial de 25%.
                </p>
            </div>

            {/* Card Oferta 1 */}
            <div className="bg-white rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.3)] border-4 border-gold-500 overflow-hidden relative w-full max-w-2xl mx-auto">
                
                {/* Header Dourado */}
                <div className="bg-gradient-to-r from-gold-500 to-yellow-400 py-3 px-4 text-center">
                    <span className="text-emerald-950 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                        <Star className="w-4 h-4 fill-emerald-950" />
                        Acesso Vitalício + Bônus Inclusos
                        <Star className="w-4 h-4 fill-emerald-950" />
                    </span>
                </div>

                <div className="p-6 md:p-8 relative">
                    
                    <div className="flex flex-col items-center justify-center text-center mb-6">
                        <span className="text-slate-400 text-lg line-through decoration-red-500 decoration-2 font-medium">De R$ 97,00</span>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-emerald-700 mt-2">Por apenas:</span>
                            <span className="text-6xl font-black text-emerald-900 tracking-tighter">72<span className="text-2xl">,75</span></span>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mt-2 border border-green-200">
                            Economia Imediata de R$ 24,25
                        </span>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-8 text-left max-w-sm mx-auto">
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>Acesso Vitalício ao Curso</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>Todos os 3 Bônus VIPs</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>Certificado Incluso</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={handleAcceptOffer1}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-lg py-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                        >
                            Sim! Quero Desconto de 25%
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        
                        <button 
                            onClick={handleRejectOffer1}
                            className="w-full bg-transparent hover:bg-slate-50 text-slate-400 hover:text-red-500 font-medium py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 group"
                        >
                            <XCircle className="w-4 h-4 group-hover:text-red-500" />
                            Não quero desconto, prefiro perder a vaga.
                        </button>
                    </div>

                    {/* Timer Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center items-center gap-2 text-xs text-slate-500 font-mono">
                        <Timer className="w-3 h-3" />
                        Oferta expira em: {formatTime(timeLeft)}
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ETAPA 2: OFERTA FINAL DE R$ 37,00 (DESIGN VERDE PROSPERIDADE)
            "A Última Tentativa" - Focado em Dinheiro e Valor
           ========================================================================= */}
        {step === 'offer2' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             
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
    </>
  );
};

export default LastChance;