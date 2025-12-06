import React from 'react';
import { ShieldCheck, Lock, X, CheckCircle, CreditCard, Sparkles, CalendarOff } from 'lucide-react';

interface PricingProps {
  onCtaClick: () => void;
  spotsLeft: number;
}

const Pricing: React.FC<PricingProps> = ({ onCtaClick, spotsLeft }) => {
  // Lógica para pegar a data de HOJE formatada (ex: 15/10/2023)
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR');

  const handleCheckout = () => {
    window.location.href = "https://pay.kiwify.com.br/XpMRo1p";
  };

  return (
    <section id="pricing" className="py-24 bg-emerald-50">
      <div className="container mx-auto px-4">
        
        {/* Tabela de Comparação de Valor */}
        <div className="max-w-4xl mx-auto mb-16 hidden md:block">
          <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-emerald-950 uppercase tracking-widest">O Que Você Está Levando</h3>
              <div className="w-24 h-1 bg-gold-500 mx-auto mt-2"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-950 text-white">
                  <th className="p-5 font-serif text-lg tracking-wide">Benefício</th>
                  <th className="p-5 font-medium text-center opacity-60 text-sm uppercase">Cursos Amadores</th>
                  <th className="p-5 font-bold text-center bg-gold-500 text-emerald-950 text-lg uppercase tracking-wider shadow-md">Balões Lucrativos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 text-sm">
                {[
                    ["Foco em Vendas e Lucro Real", false, true],
                    ["Certificado Profissional Incluso", false, true],
                    ["Contratos e Orçamentos Prontos", false, true],
                    ["Acesso Vitalício (Para Sempre)", false, true]
                ].map(([text, bad, good], idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/50 transition-colors">
                        <td className="p-5 text-emerald-900 font-medium text-base">{(text as string)}</td>
                        <td className="p-5 text-center text-red-400"><X className="w-5 h-5 mx-auto opacity-50" /></td>
                        <td className="p-5 text-center bg-gold-50/30 border-x border-gold-100">
                            <CheckCircle className="w-6 h-6 mx-auto text-green-600 fill-green-100" />
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card de Preço - Estilo Black Card Luxuoso */}
        <div className="max-w-md mx-auto relative mb-12 transform transition-all hover:scale-[1.01] duration-500">
          
          {/* Faixa de Urgência */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-1.5 rounded-full text-xs font-bold shadow-xl z-20 whitespace-nowrap animate-pulse border-2 border-white flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            RESTAM APENAS {spotsLeft} VAGAS
          </div>

          <div className="bg-emerald-950 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(6,78,59,0.5)] border border-emerald-800 overflow-hidden relative text-white">
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            
            {/* Header do Card (Compactado) */}
            <div className="relative z-10 p-6 pb-0 text-center pt-10">
              <div className="inline-block bg-gold-500/20 border border-gold-500/50 text-gold-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3">
                 Oferta Premium
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-1">Acesso Vitalício</h3>
              <p className="text-emerald-400/80 text-xs">Tudo o que você precisa para enriquecer com festas.</p>
            </div>
            
            <div className="p-6 relative z-10">
               {/* Lista de Valor (Compactada) */}
               <div className="bg-emerald-900/50 rounded-xl p-4 mb-6 border border-emerald-800 backdrop-blur-sm">
                  <div className="space-y-2">
                     <div className="flex justify-between text-emerald-200/60 text-xs line-through decoration-red-500/50">
                        <span>Curso Completo</span>
                        <span>R$618,00</span>
                     </div>
                     <div className="flex justify-between text-emerald-200/60 text-xs line-through decoration-red-500/50">
                        <span>Pack de Bônus VIP</span>
                        <span>R$491,00</span>
                     </div>
                     <div className="w-full h-px bg-emerald-800 my-1"></div>
                     <div className="flex justify-between font-bold text-emerald-100 text-base">
                        <span>Valor Real</span>
                        <span>R$1.109,00</span>
                     </div>
                  </div>
               </div>

               {/* Preço com Urgência de Data (Compactado e Reestilizado) */}
               <div className="text-center mb-6">
                  
                  {/* DATA DINÂMICA DE ESCASSEZ - FORMATO ATUALIZADO (DD/MM/AAAA) E COR FORTE */}
                  <div className="inline-flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 bg-white/10 border border-yellow-400/50 rounded-lg px-4 py-2 mb-2 backdrop-blur-sm">
                     <div className="flex items-center gap-2">
                        <CalendarOff className="w-3 h-3 text-white" />
                        <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wide">
                            Válido somente até:
                        </span>
                     </div>
                     <span className="bg-white px-2 py-0.5 rounded shadow-sm text-red-600 text-sm font-black tracking-wide transform -rotate-1">
                        {formattedDate}
                     </span>
                  </div>

                  <div className="text-6xl font-black text-white tracking-tighter leading-none flex justify-center items-start gap-1">
                     <span className="text-xl mt-2 text-emerald-400 font-serif">R$</span>
                     97
                     <span className="text-lg mt-2 text-emerald-400 font-bold">,00</span>
                  </div>
                  <p className="text-emerald-300/80 text-xs mt-2 font-medium">
                     ou 12x de <strong className="text-white">R$10,03</strong>
                  </p>
               </div>

               {/* Botão de Ação */}
               <button 
                onClick={handleCheckout}
                className="w-full group bg-gradient-to-r from-gold-500 to-gold-600 hover:from-white hover:to-white text-emerald-950 hover:text-emerald-900 font-black py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 text-base mb-4 leading-tight border border-gold-400"
               >
                 <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 <span>QUERO FATURAR AGORA</span>
               </button>

               <div className="flex justify-center items-center gap-2 opacity-60 text-[10px] text-emerald-200 uppercase tracking-wider font-medium">
                  <Lock className="w-3 h-3" />
                  Pagamento 100% Seguro
               </div>
            </div>
          </div>
        </div>

        {/* Garantia */}
        <div className="max-w-2xl mx-auto mb-20 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="bg-emerald-100 p-3 rounded-full flex-shrink-0">
             <ShieldCheck className="w-10 h-10 text-emerald-600" />
          </div>
          <div>
             <h4 className="font-bold text-lg text-emerald-950 mb-1 font-serif">Seu Risco é ZERO (Garantia de 7 Dias)</h4>
             <p className="text-slate-600 text-xs leading-relaxed">
               Você tem 7 dias para testar. Se não começar a ver o potencial de lucro ou simplesmente não gostar da minha voz, eu devolvo cada centavo. <strong className="text-emerald-700">O risco financeiro é todo meu.</strong>
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;