import React, { useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, Lock, TrendingUp, Gift, PartyPopper } from 'lucide-react';

interface UltimatumModalProps {
  onClose: () => void; // Ação de fechar/recusar
  onCtaClick: () => void; // Ação de aceitar
  type: 'exit' | 'scarcity' | 'upgrade' | 'downsell-annual';
}

const UltimatumModal: React.FC<UltimatumModalProps> = ({ onClose, onCtaClick, type }) => {
  // Lock body scroll when modal is open to prevent double scrollbars
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isScarcity = type === 'scarcity';
  const isUpgrade = type === 'upgrade';
  const isDownsellAnnual = type === 'downsell-annual';

  // Configurações baseadas no tipo de modal
  const content = {
    exit: {
      header: "ESPERE! NÃO VÁ EMBORA...",
      headerClass: "bg-emerald-800 text-white",
      title: "AINDA TEMOS VAGAS!",
      progressBarLabel: "Vagas Preenchidas",
      progressBarValue: "98%",
      progressBarText: "QUASE ESGOTADO",
      progressBarColor: "bg-gradient-to-r from-green-500 via-green-400 to-green-500",
      animate: false,
      buttonText: "GARANTIR MINHA VAGA",
      option2Text: "Pegar minha vaga, aprender o método e começar a lucrar.",
      recommendText: "RECOMENDADO",
      option1Title: "Opção 1",
      option1Text: "Fechar a página, ignorar a oportunidade e continuar com a mesma renda atual.",
      option2Title: "Opção 2"
    },
    scarcity: {
      header: "Atenção: Encerramento Imediato",
      headerClass: "bg-red-600 text-white animate-pulse",
      title: "ÚLTIMA VAGA RESTANTE!",
      progressBarLabel: "Vagas Preenchidas",
      progressBarValue: "99.9%",
      progressBarText: "1 VAGA RESTANTE",
      progressBarColor: "bg-gradient-to-r from-red-600 via-orange-500 to-red-600",
      animate: true,
      buttonText: "GARANTIR A ÚLTIMA VAGA",
      option2Text: "Agarrar essa ÚLTIMA oportunidade antes que o site saia do ar.",
      recommendText: "URGENTE",
      option1Title: "Opção 1",
      option1Text: "Deixar para depois e pagar o dobro do preço quando abrir nova turma.",
      option2Title: "Opção 2"
    },
    upgrade: {
      header: "OPORTUNIDADE ÚNICA - NÃO FECHE!",
      headerClass: "bg-gradient-to-r from-gold-600 to-gold-400 text-emerald-950 animate-bounce-custom",
      title: "LEVE O VITALÍCIO POR + R$ 5,75",
      progressBarLabel: "Desconto Liberado",
      progressBarValue: "25% OFF",
      progressBarText: "CUPOM ATIVADO",
      progressBarColor: "bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-500",
      animate: true,
      buttonText: "QUERO ACESSO VITALÍCIO POR R$ 72,75",
      option2Text: "Fazer o upgrade agora, ganhar acesso eterno e todos os bônus por uma diferença irrisória.",
      recommendText: "MELHOR CUSTO-BENEFÍCIO",
      option1Title: "Recusar Oferta",
      option1Text: "Prefiro pagar R$ 67,00 e ter acesso bloqueado após 1 ano (sem renovação gratuita).",
      option2Title: "Aceitar Upgrade"
    },
    'downsell-annual': {
      header: "OK, VOCÊ VENCEU! ÚLTIMA OFERTA",
      headerClass: "bg-gradient-to-r from-red-600 to-red-800 text-white animate-pulse",
      title: "PLANO ANUAL POR APENAS R$ 37,00",
      progressBarLabel: "Desconto Máximo",
      progressBarValue: "60% OFF",
      progressBarText: "OFERTA SECRETA LIBERADA",
      progressBarColor: "bg-gradient-to-r from-green-500 via-emerald-400 to-green-600",
      animate: true,
      buttonText: "QUERO O PLANO ANUAL POR R$ 37,00",
      option2Text: "Aproveitar o desconto secreto, levar todo o curso + bônus pelo preço de um lanche.",
      recommendText: "MENOR PREÇO DA HISTÓRIA",
      option1Title: "Recusar R$ 37,00",
      option1Text: "Não tenho R$ 37,00 para investir no meu futuro agora.",
      option2Title: "Aceitar Oferta"
    }
  };

  const current = content[type];

  // Handler específico para o botão de recusar
  const handleReject = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/95 backdrop-blur-md animate-in fade-in duration-500">
      <div className={`bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl shadow-2xl relative border-4 ${isScarcity ? 'border-red-500' : isUpgrade ? 'border-gold-500' : isDownsellAnnual ? 'border-red-600' : 'border-emerald-500'} animate-in zoom-in-95 duration-500 flex flex-col`}>
        
        {/* Header de Alerta */}
        <div className={`${current.headerClass} p-3 md:p-4 text-center flex-shrink-0 sticky top-0 z-10`}>
          <div className="flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs md:text-base">
            {isUpgrade ? <TrendingUp className="w-5 h-5" /> : isDownsellAnnual ? <PartyPopper className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            {current.header}
            {isUpgrade ? <TrendingUp className="w-5 h-5" /> : isDownsellAnnual ? <PartyPopper className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
        </div>

        <div className="p-5 md:p-8 text-center flex-grow flex flex-col justify-center">
          
          <h2 className={`text-2xl md:text-4xl font-black text-emerald-950 mb-4 font-serif leading-tight ${isScarcity || isDownsellAnnual ? 'animate-pulse' : ''}`}>
            {current.title}
          </h2>
          
          {/* Barra de Progresso */}
          <div className="mb-6 max-w-md mx-auto w-full">
             <div className="flex justify-between text-xs font-bold uppercase text-emerald-800 mb-1">
                <span>{current.progressBarLabel}</span>
                <span className={isScarcity || isDownsellAnnual ? "text-red-600" : "text-emerald-600"}>{current.progressBarValue}</span>
             </div>
             <div className="w-full bg-slate-200 rounded-full h-5 md:h-6 border border-slate-300 relative overflow-hidden">
                <div 
                    className={`${current.progressBarColor} h-full rounded-full w-[99%] flex items-center justify-end pr-2`}
                >
                    <span className={`text-[10px] ${isUpgrade ? 'text-emerald-950' : 'text-white'} font-bold ${current.animate ? 'animate-pulse' : ''}`}>
                      {current.progressBarText}
                    </span>
                </div>
             </div>
          </div>

          {/* LISTA DE BÔNUS PARA O DOWNSELL ANUAL */}
          {isDownsellAnnual && (
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 mb-6 text-left">
                <p className="text-center font-bold text-emerald-900 mb-3 text-sm uppercase tracking-wide">
                    O que você leva por R$ 37,00:
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="font-bold">Acesso ao Curso Completo (1 Ano)</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Bônus: Caixa Floral de Luxo</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Bônus: Embalagens Criativas</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Certificado Profissional Incluso</span>
                    </li>
                </ul>
                <div className="mt-4 text-center">
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                        Economia Real de R$ 30,00
                    </span>
                </div>
            </div>
          )}

          <div className="h-px bg-slate-200 w-full mb-6"></div>

          <h3 className="text-base md:text-xl font-bold text-slate-800 mb-4 md:mb-6">
            Você tem duas opções agora:
          </h3>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4 text-left mb-6">
             
             {/* Opção 1 - Negativa */}
             <div 
                onClick={handleReject}
                className={`group border-2 border-slate-200 bg-slate-50 p-3 md:p-4 rounded-xl ${isUpgrade || isDownsellAnnual ? 'cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors' : 'cursor-not-allowed select-none'}`}
             >
                <div className="flex items-start gap-3">
                   <div className="bg-slate-200 p-1.5 rounded-full mt-1 flex-shrink-0 grayscale">
                      <X className="w-4 h-4 text-slate-500" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-600 text-sm md:text-lg">{current.option1Title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-tight font-medium">
                         {current.option1Text}
                      </p>
                   </div>
                </div>
             </div>

             {/* Opção 2 - Positiva */}
             <button 
                onClick={onCtaClick}
                className={`group border-2 ${isScarcity ? 'border-red-500 bg-red-50 hover:shadow-red-200' : isUpgrade ? 'border-gold-500 bg-yellow-50 hover:shadow-yellow-200' : isDownsellAnnual ? 'border-green-600 bg-green-50 hover:shadow-green-200' : 'border-green-500 bg-green-50 hover:shadow-green-200'} p-3 md:p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all relative overflow-hidden text-left`}
             >
                <div className={`absolute top-0 right-0 ${isScarcity ? 'bg-red-600' : isUpgrade ? 'bg-gold-500' : isDownsellAnnual ? 'bg-green-600' : 'bg-green-500'} ${isUpgrade ? 'text-emerald-950' : 'text-white'} text-[10px] font-bold px-2 py-0.5 rounded-bl-lg`}>
                   {current.recommendText}
                </div>
                <div className="flex items-start gap-3">
                   <div className={`${isScarcity ? 'bg-red-500 group-hover:bg-red-600' : isUpgrade ? 'bg-gold-500 group-hover:bg-gold-600' : isDownsellAnnual ? 'bg-green-600 group-hover:bg-green-700' : 'bg-green-500 group-hover:bg-green-600'} p-1.5 rounded-full mt-1 transition-colors shadow-sm flex-shrink-0`}>
                      <CheckCircle className={`w-4 h-4 ${isUpgrade ? 'text-emerald-950' : 'text-white'}`} />
                   </div>
                   <div>
                      <h4 className="font-bold text-emerald-900 text-sm md:text-lg">{current.option2Title}</h4>
                      <p className="text-xs text-emerald-800 mt-1 leading-tight font-medium">
                         {current.option2Text}
                      </p>
                   </div>
                </div>
             </button>

          </div>

          <div className="mt-auto">
             <button 
                onClick={onCtaClick}
                className={`w-full md:w-auto bg-gradient-to-b ${isScarcity ? 'from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 animate-pulse-slow' : isUpgrade ? 'from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950' : isDownsellAnnual ? 'from-green-600 to-green-800 hover:from-green-500 hover:to-green-700' : 'from-green-600 to-green-700 hover:from-green-500 hover:to-green-600'} text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl shadow-xl transform active:scale-95 transition-all text-base md:text-lg flex items-center justify-center gap-2 mx-auto leading-tight`}
             >
                <Lock className={`w-5 h-5 ${isUpgrade ? 'text-emerald-950' : 'text-white'}`} />
                <span>{current.buttonText}</span>
             </button>
             
             {/* Close button text for non-urgent modal */}
             {!isScarcity && !isUpgrade && !isDownsellAnnual && (
               <button 
                 onClick={onClose}
                 className="mt-4 text-xs text-slate-400 underline hover:text-slate-600"
               >
                 Não, obrigado. Prefiro perder essa chance.
               </button>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UltimatumModal;