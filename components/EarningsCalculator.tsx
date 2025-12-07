import React from 'react';
import { Calculator, Plus, TrendingUp, Wallet } from 'lucide-react';

interface EarningsCalculatorProps {
  spotsLeft: number;
}

const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({ spotsLeft }) => {
  const percentFilled = Math.min(100, Math.round(((50 - spotsLeft) / 50) * 100));

  const simulationItems = [
    { qty: 4, item: "Arcos Desconstruídos (1 por semana)", profit: 420, total: 1680 },
    { qty: 15, item: "Topos de Bolo (3 a 4 por semana)", profit: 30, total: 450 },
    { qty: 10, item: "Caixas Florais (Presentes)", profit: 145, total: 1450 },
    { qty: 15, item: "Bubbles Personalizados", profit: 95, total: 1425 },
  ];

  const totalMonthlyProfit = simulationItems.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <section id="earnings-calculator" className="py-20 bg-emerald-900 text-white relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-12">
           
           <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-700 px-4 py-2 rounded-full mb-6">
                 <Calculator className="w-5 h-5 text-gold-400" />
                 <span className="text-emerald-200 font-bold text-sm uppercase tracking-wide">Simulador de Realidade</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                 É Mais Fácil Faturar até <span className="text-gold-400">R$5.000</span> Do Que Você Imagina
              </h2>
              <p className="text-emerald-200 text-lg leading-relaxed mb-8">
                 Você não precisa se matar na escala 6x1. Com um trabalho consistente nos finais de semana e vendendo presentes durante a semana, a conta fecha fácil.
              </p>

              {/* BARRA DE PROGRESSO OTIMIZADA VISUALMENTE */}
              <div className="bg-emerald-950/40 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-white/10 w-full mb-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex justify-between items-end text-sm mb-3 font-bold">
                  <span className="text-emerald-100 uppercase tracking-wide text-xs">Progresso da Turma</span>
                  <span className={`text-xl ${percentFilled > 90 ? "text-red-400" : "text-white"}`}>{percentFilled}% <span className="text-xs text-emerald-400 font-normal">Preenchido</span></span>
                </div>
                
                <div className="w-full bg-emerald-950 rounded-full h-6 md:h-7 overflow-hidden border border-emerald-800 relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative flex items-center justify-end pr-3 shadow-[0_0_15px_rgba(251,191,36,0.4)] ${
                        percentFilled > 80 
                        ? "bg-gradient-to-r from-red-600 via-orange-500 to-red-500" 
                        : "bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300"
                    }`}
                    style={{ width: `${percentFilled}%` }}
                  >
                    {/* Texto Flutuante na Barra */}
                    {percentFilled > 30 && (
                        <span className="text-[10px] md:text-xs text-emerald-950 font-black uppercase tracking-tight whitespace-nowrap drop-shadow-sm flex items-center gap-1">
                            {percentFilled > 90 && "⚠️"} VAGAS ACABANDO
                        </span>
                    )}
                    {/* Brilho da Barra */}
                    <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent to-white/30 skew-x-12"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-emerald-200">
                    🔥 Restam apenas <strong className="text-white text-lg">{spotsLeft}</strong> vagas.
                  </p>
                  {spotsLeft < 10 && (
                     <span className="text-[10px] font-bold bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 animate-pulse">
                        Alta Demanda
                     </span>
                  )}
                </div>
              </div>
              {/* FIM DA BARRA DE PROGRESSO */}

              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 bg-emerald-800/30 p-4 rounded-xl border border-emerald-700/50 hover:bg-emerald-800/50 transition-colors">
                    <div className="bg-emerald-500/20 p-3 rounded-full">
                       <Wallet className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white">Baixo Investimento</h4>
                       <p className="text-sm text-emerald-300">O lucro paga o material da próxima festa.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-emerald-800/30 p-4 rounded-xl border border-emerald-700/50 hover:bg-emerald-800/50 transition-colors">
                    <div className="bg-emerald-500/20 p-3 rounded-full">
                       <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white">Escalável</h4>
                       <p className="text-sm text-emerald-300">Quanto mais fotos você posta, mais clientes aparecem.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* The Calculator Card */}
           <div className="md:w-1/2 w-full">
              <div className="bg-white text-slate-800 rounded-2xl shadow-2xl overflow-hidden border-4 border-gold-500 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                 <div className="bg-emerald-950 p-5 flex justify-between items-center text-white">
                    <span className="font-bold uppercase tracking-widest text-sm opacity-80">Plano de Ação Mensal</span>
                    <span className="bg-white/10 px-3 py-1 rounded text-xs font-mono">Meta: R$5k</span>
                 </div>
                 
                 <div className="p-6 md:p-8 bg-slate-50">
                    <div className="space-y-4">
                       {simulationItems.map((row, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                             <div className="flex items-center gap-3">
                                <span className="bg-emerald-100 text-emerald-800 font-bold w-8 h-8 flex items-center justify-center rounded-lg text-sm shadow-sm">{row.qty}x</span>
                                <span className="text-sm font-medium text-slate-700">{row.item}</span>
                             </div>
                             <span className="font-bold text-emerald-700 text-sm">R${row.total.toLocaleString('pt-BR')}</span>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-300">
                       <div className="flex justify-between items-end">
                          <span className="text-slate-500 font-medium text-sm">Lucro Líquido Estimado:</span>
                          <span className="text-4xl font-black text-emerald-900 leading-none">
                             R${totalMonthlyProfit.toLocaleString('pt-BR')}
                          </span>
                       </div>
                       <div className="bg-yellow-100 text-yellow-800 text-xs font-bold text-center mt-4 py-2 rounded border border-yellow-200">
                          *Valores estimados. Os resultados podem variar.
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default EarningsCalculator;