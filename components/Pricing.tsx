import React from 'react';
import { ShieldCheck, Lock, X, CheckCircle } from 'lucide-react';

interface PricingProps {
  onCtaClick: () => void;
  spotsLeft: number;
}

const Pricing: React.FC<PricingProps> = ({ onCtaClick, spotsLeft }) => {
  // Logic to show a date 2 days from now to create real urgency anchor
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 2);
  const formattedDate = futureDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const handleCheckout = () => {
    window.location.href = "https://pay.kiwify.com.br/XpMRo1p";
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        
        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20 hidden md:block">
          <h3 className="text-2xl font-bold text-center mb-8 text-emerald-950">Por Que Escolher o Balões Lucrativos?</h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-950 text-white">
                  <th className="p-4 font-medium">Benefício</th>
                  <th className="p-4 font-medium text-center opacity-75">Outros Cursos</th>
                  <th className="p-4 font-bold text-center bg-gold-500 text-white">Balões Lucrativos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="p-4 text-slate-700">Foco em Vendas e Lucro</td>
                  <td className="p-4 text-center text-red-400">✖</td>
                  <td className="p-4 text-center text-gold-600 font-bold bg-amber-50">✔</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">Certificado Profissional</td>
                  <td className="p-4 text-center text-red-400">✖</td>
                  <td className="p-4 text-center text-gold-600 font-bold bg-amber-50">✔</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">Modelos de Contrato</td>
                  <td className="p-4 text-center text-red-400">✖</td>
                  <td className="p-4 text-center text-gold-600 font-bold bg-amber-50">✔</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">Acesso Vitalício</td>
                  <td className="p-4 text-center text-slate-500">1 Ano</td>
                  <td className="p-4 text-center text-gold-600 font-bold bg-amber-50">PARA SEMPRE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto relative mb-16">
          {/* Urgency Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg z-10 whitespace-nowrap animate-pulse border-2 border-white">
            ⚠️ RESTAM APENAS {spotsLeft} VAGAS
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gold-500 overflow-hidden relative">
            <div className="bg-emerald-950 p-6 text-center text-white pt-10">
              <h3 className="text-2xl font-bold text-gold-400">Acesso Completo + Bônus</h3>
              <p className="text-emerald-200 text-xs mt-1 font-medium bg-emerald-900/50 inline-block px-3 py-1 rounded-full border border-emerald-700">
                Oferta válida até {formattedDate}
              </p>
            </div>
            
            <div className="p-8">
               <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-slate-500 text-sm line-through decoration-red-400">
                     <span>Curso Balões Lucrativos</span>
                     <span>R$618,00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm line-through decoration-red-400">
                     <span>Bônus: Caixa Floral</span>
                     <span>R$177,00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm line-through decoration-red-400">
                     <span>Bônus: Embalagens</span>
                     <span>R$147,00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm line-through decoration-red-400">
                     <span>Bônus: Arranjos</span>
                     <span>R$167,00</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2"></div>
                  <div className="flex justify-between font-bold text-slate-700">
                     <span>Valor Total</span>
                     <span>R$1.109,00</span>
                  </div>
               </div>

               <div className="text-center mb-8">
                  <p className="bg-green-100 text-green-800 text-xs font-bold inline-block px-3 py-1 rounded-full mb-2">
                    HOJE: DESCONTO DE R$1.012,00
                  </p>
                  <p className="text-slate-500 text-sm">Por apenas 12x de</p>
                  <div className="text-6xl font-bold text-emerald-900 tracking-tighter">
                     <span className="text-2xl align-top relative top-2 text-slate-600">R$</span>
                     10,03
                  </div>
                  <p className="text-slate-500 text-sm mt-2">ou R$97,00 à vista</p>
                  <p className="text-xs text-slate-400 mt-1">(Menos que um salgado na padaria)</p>
               </div>

               <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-b from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(217,119,6,0.4)] transition-transform transform active:scale-95 flex items-center justify-center gap-2 text-lg mb-4 leading-tight animate-shine-effect"
               >
                 <Lock className="w-5 h-5 flex-shrink-0" />
                 <span>SIM! QUERO MINHA INDEPENDÊNCIA</span>
               </button>

               <div className="flex justify-center gap-2 opacity-75 grayscale hover:grayscale-0 transition-all">
                 <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8"/>
                 <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8"/>
                 <img src="https://img.icons8.com/color/48/pix.png" alt="Pix" className="h-8"/>
               </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="max-w-2xl mx-auto mb-20 bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center gap-6">
          <ShieldCheck className="w-20 h-20 text-emerald-600 flex-shrink-0" />
          <div className="text-center md:text-left">
             <h4 className="font-bold text-xl text-emerald-950 mb-2">Garantia Blindada de 7 Dias</h4>
             <p className="text-slate-600 text-sm">
               Entre, assista as aulas e teste o método. Se você não amar, eu devolvo 100% do seu dinheiro. Sem perguntas, sem burocracia. O risco é todo meu.
             </p>
          </div>
        </div>

        {/* The Two Options (Crossroads) */}
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-emerald-950 mb-10 font-serif">Pronta Para Mudar Sua Vida?</h2>
            <div className="grid md:grid-cols-2 gap-6">
                
                {/* Option 1 */}
                <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
                    <div className="bg-slate-300 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-6 h-6 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Opção 1: Não Fazer Nada</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        Fecha esta página e continua exatamente onde está.
                    </p>
                    <div className="text-xs font-bold text-slate-500 bg-slate-200 py-2 px-4 rounded-lg inline-block">
                        Resultado: Daqui 6 meses você vai estar no mesmo lugar (ou pior).
                    </div>
                </div>

                {/* Option 2 */}
                <div className="bg-white p-8 rounded-2xl border-2 border-gold-500 shadow-xl relative transform md:-translate-y-2">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ESCOLHA INTELIGENTE
                    </div>
                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-2">Opção 2: Entrar Agora</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        Investe menos do que um fim de semana de lazer e muda sua vida.
                    </p>
                    <div className="text-sm font-bold text-emerald-800 bg-emerald-100 py-2 px-4 rounded-lg inline-block">
                        Resultado: Daqui 6 meses você está faturando R$5k-15k/mês.
                    </div>
                </div>
            </div>
            
            <button 
                onClick={onCtaClick}
                className="mt-10 bg-gradient-to-b from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform transform active:scale-95"
            >
                QUERO A OPÇÃO 2 AGORA 🚀
            </button>
        </div>

      </div>
    </section>
  );
};

export default Pricing;