import React from 'react';
import { ShieldCheck, Lock, X, CheckCircle, CreditCard, Star } from 'lucide-react';

interface PricingProps {
  onCtaClick: () => void;
  onAnnualPlanClick: () => void; // Novo prop para lidar com o clique no anual
  spotsLeft: number;
}

const Pricing: React.FC<PricingProps> = ({ onCtaClick, onAnnualPlanClick, spotsLeft }) => {

  const handleCheckout = (plan: 'annual' | 'lifetime') => {
    
    if (plan === 'annual') {
      // Chama a função do pai para abrir o modal de upgrade
      onAnnualPlanClick();
      return;
    }

    // Rastreamento Personalizado (Vitalício Direto)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BTN-COMPRAR-VITALICIO');
    }

    // Rastreamento Padrão
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Curso Baloes - Vitalicio',
        value: 97.00,
        currency: 'BRL',
        content_ids: ['baloes-lifetime'],
        content_type: 'product'
      });
    }

    setTimeout(() => {
      window.location.href = "https://pay.kiwify.com.br/XpMRo1p";
    }, 300);
  };

  return (
    <section id="pricing" className="py-24 bg-emerald-50">
      <div className="container mx-auto px-4">
        
        {/* Header da Seção */}
        <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">
                Oferta por Tempo Limitado
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 font-serif mb-6">
                Escolha o Plano Ideal Para Você
            </h2>
            <p className="text-slate-600 mb-0 max-w-2xl mx-auto text-lg">
                Comece hoje e recupere o investimento logo na primeira festa.
            </p>
        </div>

        {/* GRID DE PLANOS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-end mb-20 relative">
            
            {/* PLANO 1: ANCORAGEM (BÁSICO) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative order-2 md:order-1 opacity-90 hover:opacity-100 transition-opacity">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Acesso Anual</h3>
                    <div className="text-4xl font-black text-slate-800 flex justify-center items-start gap-1">
                        <span className="text-sm mt-2 font-medium">R$</span>
                        67
                        <span className="text-sm mt-2 font-medium">,00</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">Renovação anual automática</p>
                </div>

                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>Acesso ao Curso por 1 Ano</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>Certificado Digital</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>Suporte Técnico da Equipe</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-400 line-through">
                        <X className="w-5 h-5 text-red-300 flex-shrink-0" />
                        <span>Pack de Bônus VIPs</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-400 line-through">
                        <X className="w-5 h-5 text-red-300 flex-shrink-0" />
                        <span>Acesso Vitalício</span>
                    </li>
                </ul>

                <button 
                    onClick={() => handleCheckout('annual')}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-xl transition-colors border border-slate-300"
                >
                    ESCOLHER PLANO BÁSICO
                </button>
            </div>

            {/* PLANO 2: OFERTA IRRESISTÍVEL (VITALÍCIO) */}
            <div className="bg-emerald-950 rounded-3xl p-1 border-2 border-gold-500 shadow-2xl relative order-1 md:order-2 transform md:-translate-y-4 z-10">
                {/* Badge de Melhor Escolha - Z-Index Aumentado para 50 para garantir sobreposição correta */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gold-500 to-yellow-500 text-emerald-950 px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-2 whitespace-nowrap z-50">
                    <Star className="w-4 h-4 fill-emerald-950" />
                    Mais Vendido
                </div>

                <div className="bg-emerald-900/50 rounded-[22px] p-8 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    
                    {/* Conteúdo do Card */}
                    <div className="relative z-10">
                        <div className="text-center mb-6">
                            <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">RECOMENDADO</span>
                            <h3 className="text-2xl font-bold text-white mb-2 font-serif">Acesso Vitalício + Bônus</h3>
                            <div className="text-6xl font-black text-gold-400 flex justify-center items-start gap-1 text-shadow-lg">
                                <span className="text-lg mt-2 font-bold text-emerald-200">R$</span>
                                97
                                <span className="text-lg mt-2 font-bold text-emerald-200">,00</span>
                            </div>
                            <p className="text-emerald-300 text-xs mt-2">Pagamento único. Sem mensalidades.</p>
                        </div>

                        <div className="bg-emerald-800/50 rounded-xl p-4 mb-8 border border-emerald-700/50">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <div className="bg-gold-500/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-gold-400" /></div>
                                    <span>Acesso Vitalício (Para Sempre)</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <div className="bg-gold-500/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-gold-400" /></div>
                                    <span>Todos os Bônus VIPs Inclusos</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <div className="bg-gold-500/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-gold-400" /></div>
                                    <span>Certificado Profissional</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <div className="bg-gold-500/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-gold-400" /></div>
                                    <span>Suporte Técnico da Equipe</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <div className="bg-gold-500/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-gold-400" /></div>
                                    <span>Atualizações Gratuitas</span>
                                </li>
                            </ul>
                        </div>

                        <button 
                            onClick={() => handleCheckout('lifetime')}
                            className="w-full group bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-white hover:to-white text-emerald-950 hover:text-emerald-900 font-black py-5 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wide text-lg"
                        >
                            <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            QUERO O ACESSO VITALÍCIO
                        </button>
                        
                        <div className="mt-4 text-center">
                            <span className="text-[10px] text-emerald-400/80 uppercase tracking-widest flex items-center justify-center gap-1">
                                <Lock className="w-3 h-3" /> Compra 100% Segura
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Garantia */}
        <div className="max-w-3xl mx-auto mb-20 bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="bg-emerald-100 p-4 rounded-full flex-shrink-0 animate-pulse-slow">
             <ShieldCheck className="w-12 h-12 text-emerald-600" />
          </div>
          <div>
             <h4 className="font-bold text-xl text-emerald-950 mb-2 font-serif">Seu Risco é ZERO (Garantia Incondicional)</h4>
             <p className="text-slate-600 leading-relaxed text-sm">
               Você tem 7 dias para entrar, assistir as aulas e decidir se é para você. Se não gostar, eu devolvo 100% do seu dinheiro sem fazer perguntas. <strong className="text-emerald-700">O risco financeiro é todo meu.</strong>
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;