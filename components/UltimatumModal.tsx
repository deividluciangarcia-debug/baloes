import React, { useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, Lock } from 'lucide-react';

interface UltimatumModalProps {
  onClose: () => void;
  onCtaClick: () => void;
  type: 'exit' | 'scarcity';
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

  // Configurações baseadas no tipo de modal
  const content = {
    exit: {
      header: "ESPERE! NÃO VÁ EMBORA...",
      headerClass: "bg-emerald-800 text-white", // Cor mais sóbria
      title: "AINDA TEMOS VAGAS!",
      progressBarLabel: "Vagas Preenchidas",
      progressBarValue: "98%",
      progressBarText: "QUASE ESGOTADO",
      progressBarColor: "bg-gradient-to-r from-green-500 via-green-400 to-green-500", // Verde sólido, sem vermelho
      animate: false, // Sem piscar
      buttonText: "GARANTIR MINHA VAGA",
      option2Text: "Pegar minha vaga, aprender o método e começar a lucrar.",
      recommendText: "RECOMENDADO"
    },
    scarcity: {
      header: "Atenção: Encerramento Imediato",
      headerClass: "bg-red-600 text-white animate-pulse", // Vermelho e piscando
      title: "ÚLTIMA VAGA RESTANTE!",
      progressBarLabel: "Vagas Preenchidas",
      progressBarValue: "99.9%",
      progressBarText: "1 VAGA RESTANTE",
      progressBarColor: "bg-gradient-to-r from-red-600 via-orange-500 to-red-600",
      animate: true, // Com efeitos piscantes
      buttonText: "GARANTIR A ÚLTIMA VAGA",
      option2Text: "Agarrar essa ÚLTIMA oportunidade antes que o site saia do ar.",
      recommendText: "URGENTE"
    }
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/95 backdrop-blur-md animate-in fade-in duration-500">
      <div className={`bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl shadow-2xl relative border-4 ${isScarcity ? 'border-red-500' : 'border-gold-500'} animate-in zoom-in-95 duration-500 flex flex-col`}>
        
        {/* Header de Alerta */}
        <div className={`${current.headerClass} p-3 md:p-4 text-center flex-shrink-0 sticky top-0 z-10`}>
          <div className="flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs md:text-base">
            <AlertTriangle className={`w-5 h-5 md:w-6 md:h-6 ${isScarcity ? 'fill-yellow-400 text-red-700' : 'text-emerald-200'}`} />
            {current.header}
            <AlertTriangle className={`w-5 h-5 md:w-6 md:h-6 ${isScarcity ? 'fill-yellow-400 text-red-700' : 'text-emerald-200'}`} />
          </div>
        </div>

        <div className="p-5 md:p-8 text-center flex-grow flex flex-col justify-center">
          
          <h2 className={`text-2xl md:text-4xl font-black text-emerald-950 mb-4 font-serif leading-tight ${isScarcity ? 'animate-pulse' : ''}`}>
            {current.title}
          </h2>
          
          {/* Barra de Progresso */}
          <div className="mb-6 max-w-md mx-auto w-full">
             <div className="flex justify-between text-xs font-bold uppercase text-emerald-800 mb-1">
                <span>{current.progressBarLabel}</span>
                <span className={isScarcity ? "text-red-600" : "text-emerald-600"}>{current.progressBarValue}</span>
             </div>
             <div className="w-full bg-slate-200 rounded-full h-5 md:h-6 border border-slate-300 relative overflow-hidden">
                <div 
                    className={`${current.progressBarColor} h-full rounded-full w-[99%] flex items-center justify-end pr-2`}
                >
                    <span className={`text-[10px] text-white font-bold ${current.animate ? 'animate-pulse' : ''}`}>
                      {current.progressBarText}
                    </span>
                </div>
             </div>
          </div>

          <div className="h-px bg-slate-200 w-full mb-6"></div>

          <h3 className="text-base md:text-xl font-bold text-slate-800 mb-4 md:mb-6">
            Você tem duas opções agora:
          </h3>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4 text-left mb-6">
             
             {/* Opção 1 - Desabilitada e Não Clicável */}
             <div 
                className="group border-2 border-slate-200 bg-slate-100 p-3 md:p-4 rounded-xl cursor-not-allowed select-none"
             >
                <div className="flex items-start gap-3">
                   <div className="bg-slate-200 p-1.5 rounded-full mt-1 flex-shrink-0 grayscale">
                      <X className="w-4 h-4 text-slate-500" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-600 text-sm md:text-lg">Opção 1</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-tight font-medium">
                         Fechar a página, ignorar a oportunidade e continuar com a mesma renda atual.
                      </p>
                   </div>
                </div>
             </div>

             {/* Opção 2 - Positiva */}
             <button 
                onClick={onCtaClick}
                className={`group border-2 ${isScarcity ? 'border-red-500 bg-red-50 hover:shadow-red-200' : 'border-green-500 bg-green-50 hover:shadow-green-200'} p-3 md:p-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all relative overflow-hidden`}
             >
                <div className={`absolute top-0 right-0 ${isScarcity ? 'bg-red-600' : 'bg-green-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg`}>
                   {current.recommendText}
                </div>
                <div className="flex items-start gap-3">
                   <div className={`${isScarcity ? 'bg-red-500 group-hover:bg-red-600' : 'bg-green-500 group-hover:bg-green-600'} p-1.5 rounded-full mt-1 transition-colors shadow-sm flex-shrink-0`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                   </div>
                   <div>
                      <h4 className="font-bold text-emerald-900 text-sm md:text-lg">Opção 2</h4>
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
                className={`w-full md:w-auto bg-gradient-to-b ${isScarcity ? 'from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 animate-pulse-slow' : 'from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500'} text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl shadow-xl transform active:scale-95 transition-all text-base md:text-lg flex items-center justify-center gap-2 mx-auto leading-tight`}
             >
                <Lock className="w-5 h-5" />
                <span>{current.buttonText}</span>
             </button>
             
             {/* Close button text for non-urgent modal */}
             {!isScarcity && (
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