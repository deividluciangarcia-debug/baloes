import React from 'react';
import { X, Check, ArrowRight, Ban, PartyPopper } from 'lucide-react';

interface OptionsComparisonProps {
  onCtaClick: () => void;
}

const OptionsComparison: React.FC<OptionsComparisonProps> = ({ onCtaClick }) => {
  const handleSuccessClick = () => {
    // Rastreamento Personalizado
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', 'BTN-ESCOLHER-SUCESSO', {
          status: 'High Intent'
        });
    }
    onCtaClick();
  };

  return (
    <section id="options-comparison" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif mb-4">
            Agora Você Tem Apenas 2 Opções
          </h2>
          <p className="text-slate-600">
            A vida é feita de escolhas. Qual caminho você vai seguir hoje?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-stretch">
          
          {/* OPÇÃO 1 - NEGATIVA */}
          <div className="bg-slate-100 rounded-3xl p-8 border-2 border-slate-200 opacity-70 hover:opacity-100 transition-opacity flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Ban className="w-32 h-32 text-slate-400" />
            </div>

            <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <X className="w-8 h-8 text-slate-500" />
            </div>

            <h3 className="text-2xl font-bold text-slate-700 mb-2">Opção 1: Ignorar</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-6">O Caminho Comum</p>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3 text-slate-600">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Continuar dependendo do dinheiro do marido ou de terceiros.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Reclamar que "nada dá certo" para você, sem tentar nada novo.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Ver outras mulheres crescendo na sua cidade enquanto você fica parada.</span>
                </li>
            </ul>

            <button disabled className="w-full bg-slate-300 text-slate-500 font-bold py-4 rounded-xl cursor-not-allowed text-sm">
                FECHAR PÁGINA E ESQUECER
            </button>
          </div>

          {/* OPÇÃO 2 - POSITIVA */}
          <div className="bg-white rounded-3xl p-8 border-2 border-green-500 shadow-2xl shadow-green-900/20 flex flex-col relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl z-20">
                RECOMENDADO
            </div>
            
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <PartyPopper className="w-32 h-32 text-green-500" />
            </div>

            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-50">
                <Check className="w-8 h-8 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-emerald-950 mb-2">Opção 2: Lucrar</h3>
            <p className="text-sm text-green-600 font-bold uppercase tracking-widest mb-6">O Caminho do Sucesso</p>

            <ul className="space-y-4 mb-8 flex-grow relative z-10">
                <li className="flex items-start gap-3 text-emerald-900 font-medium">
                    <div className="bg-green-500 rounded-full p-0.5 mt-0.5"><Check className="w-3 h-3 text-white" /></div>
                    <span>Aprender uma profissão que paga R$800 a R$1.200 por dia trabalhado.</span>
                </li>
                <li className="flex items-start gap-3 text-emerald-900 font-medium">
                    <div className="bg-green-500 rounded-full p-0.5 mt-0.5"><Check className="w-3 h-3 text-white" /></div>
                    <span>Ter liberdade financeira e de tempo para sua família.</span>
                </li>
                <li className="flex items-start gap-3 text-emerald-900 font-medium">
                    <div className="bg-green-500 rounded-full p-0.5 mt-0.5"><Check className="w-3 h-3 text-white" /></div>
                    <span>Investimento 100% Seguro com Garantia de 7 Dias.</span>
                </li>
            </ul>

            <button 
                onClick={handleSuccessClick}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-black py-4 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 group transition-all transform active:scale-95 text-lg"
            >
                ESCOLHER O SUCESSO
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OptionsComparison;