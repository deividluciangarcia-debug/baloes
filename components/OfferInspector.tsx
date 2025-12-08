import React, { useState } from 'react';
import { Bug, X, Map, DollarSign, Target, Activity } from 'lucide-react';

const OfferInspector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'offer' | 'map' | 'tracking'>('offer');

  return (
    <div className="fixed bottom-4 left-4 z-[9999] font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black/80 hover:bg-black text-white p-3 rounded-full shadow-lg border border-white/20 transition-all hover:scale-110"
          title="Inspecionar Oferta"
        >
          <Bug className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-slate-900 text-slate-200 w-[90vw] md:w-[600px] max-h-[80vh] rounded-xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <Bug className="w-4 h-4 text-green-400" />
               <h3 className="font-bold text-white text-sm uppercase tracking-wider">Debug de Oferta & Mapeamento</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-800 text-xs font-bold uppercase tracking-wide">
            <button 
              onClick={() => setActiveTab('offer')}
              className={`flex-1 p-3 hover:bg-slate-800 ${activeTab === 'offer' ? 'bg-slate-800 text-green-400 border-b-2 border-green-400' : 'text-slate-500'}`}
            >
              Resumo da Oferta
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`flex-1 p-3 hover:bg-slate-800 ${activeTab === 'map' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}
            >
              Mapeamento
            </button>
            <button 
              onClick={() => setActiveTab('tracking')}
              className={`flex-1 p-3 hover:bg-slate-800 ${activeTab === 'tracking' ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-400' : 'text-slate-500'}`}
            >
              Eventos & Pixel
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-sm leading-relaxed">
            
            {activeTab === 'offer' && (
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <h4 className="text-xs text-slate-500 uppercase mb-1">Produto Principal</h4>
                        <p className="text-white font-bold text-lg">Curso Balões Lucrativos</p>
                        <p className="text-green-400 font-mono">R$ 97,00 (Vitalício)</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <h4 className="text-xs text-slate-500 uppercase mb-1">Ancoragem</h4>
                        <p className="text-white font-bold">Plano Anual Básico</p>
                        <p className="text-slate-400 font-mono">R$ 67,00 / ano</p>
                    </div>
                 </div>

                 <div>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-red-400" /> Funil de Recuperação (Downsell)
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded border border-slate-700">
                            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-bold">ETAPA 1</span>
                            <div>
                                <p className="text-white font-bold">Oferta de Retenção (25% OFF)</p>
                                <p className="text-xs text-slate-400">R$ 72,75 (Vitalício) - Acionado no botão Voltar/Sair</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded border border-slate-700">
                            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-bold">ETAPA 2</span>
                            <div>
                                <p className="text-white font-bold">Oferta Final (Plano Secreto)</p>
                                <p className="text-xs text-slate-400">R$ 37,00 (Anual) - Se recusar a Etapa 1</p>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div>
                    <h4 className="font-bold text-white mb-2">Bônus Inclusos (Stack de Valor)</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                        <li><strong className="text-slate-300">Caixa Floral de Luxo:</strong> Valor Percebido R$177</li>
                        <li><strong className="text-slate-300">Embalagens Criativas:</strong> Valor Percebido R$147</li>
                        <li><strong className="text-slate-300">Arranjos Florais:</strong> Valor Percebido R$167</li>
                        <li><strong className="text-slate-300">Módulo Vendas:</strong> Valor Inestimável</li>
                    </ul>
                 </div>
              </div>
            )}

            {activeTab === 'map' && (
               <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-slate-700 space-y-8">
                     
                     <div className="relative">
                        <div className="absolute -left-[31px] bg-slate-900 border-2 border-blue-500 rounded-full w-4 h-4"></div>
                        <h4 className="font-bold text-blue-400">1. Entrada (Home)</h4>
                        <p className="text-xs text-slate-400 mt-1">
                            Usuário cai na <code>EntryMask</code> (Blur). O clique para desbloquear empurra um estado no histórico do navegador (Prepara o Back Redirect).
                        </p>
                     </div>

                     <div className="relative">
                        <div className="absolute -left-[31px] bg-slate-900 border-2 border-purple-500 rounded-full w-4 h-4"></div>
                        <h4 className="font-bold text-purple-400">2. Navegação & Consumo</h4>
                        <p className="text-xs text-slate-400 mt-1">
                            Hero (Teste A/B Cores) → Seções de Conteúdo. 
                            <br/>Barra de Escassez (Sticky) aparece no scroll.
                            <br/>Botão Flutuante Mobile aparece no final da página.
                        </p>
                     </div>

                     <div className="relative">
                        <div className="absolute -left-[31px] bg-slate-900 border-2 border-green-500 rounded-full w-4 h-4"></div>
                        <h4 className="font-bold text-green-400">3. Conversão (Pricing)</h4>
                        <p className="text-xs text-slate-400 mt-1">
                            <strong>Vitalício (R$97):</strong> Link Direto Checkout Kiwify.
                            <br/><strong>Anual (R$67):</strong> Abre Modal <code>Ultimatum: Upgrade</code> tentando vender o Vitalício por +R$5,75.
                        </p>
                     </div>

                     <div className="relative">
                        <div className="absolute -left-[31px] bg-slate-900 border-2 border-red-500 rounded-full w-4 h-4"></div>
                        <h4 className="font-bold text-red-400">4. Recuperação (Exit Intent / Voltar)</h4>
                        <ul className="text-xs text-slate-400 mt-1 list-disc pl-4 space-y-1">
                            <li><strong>Mouse Leave (Desktop):</strong> Abre Modal <code>Ultimatum: Exit/Scarcity</code>.</li>
                            <li><strong>Botão Voltar (Mobile/Desktop):</strong> Interceptado pelo <code>popstate</code>. Redireciona para <code>LastChance (Offer 1)</code>.</li>
                            <li><strong>Recusa Offer 1:</strong> Redireciona para <code>LastChance (Offer 2)</code>.</li>
                        </ul>
                     </div>

                  </div>
               </div>
            )}

            {activeTab === 'tracking' && (
                <div className="space-y-4">
                    <div className="bg-slate-800 p-3 rounded text-xs font-mono">
                        <p className="text-slate-500 mb-2">// Eventos Padrão</p>
                        <p className="text-green-400">fbq('track', 'PageView');</p>
                        <p className="text-green-400">fbq('track', 'ViewContent', ...);</p>
                        <p className="text-green-400">fbq('track', 'InitiateCheckout', ...);</p>
                        <p className="text-green-400">fbq('track', 'AddToCart', ...);</p>
                        <p className="text-green-400">fbq('track', 'Lead', ...); <span className="text-slate-500">// Baseado em tempo</span></p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-400" /> Eventos Personalizados
                        </h4>
                        <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300">
                            <li className="bg-slate-800/50 p-2 rounded border border-slate-700">PV-VERDE / PV-CLARA (Teste A/B)</li>
                            <li className="bg-slate-800/50 p-2 rounded border border-slate-700">BTN-ATIVAR-RENDA (Hero)</li>
                            <li className="bg-slate-800/50 p-2 rounded border border-slate-700">ATIVOU-BACK-REDIRECT-72</li>
                            <li className="bg-slate-800/50 p-2 rounded border border-slate-700">RECUSOU-72-FOI-PARA-37</li>
                            <li className="bg-slate-800/50 p-2 rounded border border-slate-700">ABRIU-UPGRADE-MODAL</li>
                            <li className="bg-slate-800/50 p-2 rounded border border-slate-700">PLAY-AULA-[ID]</li>
                        </ul>
                    </div>
                </div>
            )}

          </div>
          
          <div className="bg-slate-950 p-3 text-center text-[10px] text-slate-600 border-t border-slate-800">
            Ferramenta de Debug Interno - Não visível em produção se removido.
          </div>

        </div>
      )}
    </div>
  );
};

export default OfferInspector;