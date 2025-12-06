import React from 'react';
import { X, Check, HeartCrack, Briefcase, DollarSign } from 'lucide-react';

const PainPoints: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4 font-serif">O Que Te Impede de Prosperar Hoje?</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Se você sente que trabalha muito e ganha pouco, ou já tentou empreender e falhou, <span className="font-bold text-emerald-800">a culpa não é sua.</span> Você só estava no veículo errado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Old Way / Struggles */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 opacity-90 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <HeartCrack className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">A Realidade da Maioria</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600">
                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span><strong>Tentou vender doces ou artesanato</strong> mas o lucro era minúsculo e dava muito trabalho.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span><strong>Dependência do marido</strong>, tendo que pedir dinheiro até para fazer a unha.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span><strong>Prisão da Escala 6x1</strong>, perdendo o crescimento dos filhos e finais de semana em família.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Sensação de que "o dinheiro nunca sobra" no fim do mês.</span>
              </li>
            </ul>
          </div>

          {/* New Way / Solution */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green-500 relative transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              A NOVA ERA
            </div>
            <div className="flex items-center gap-3 mb-6 border-b border-green-100 pb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">O Método Balões Lucrativos</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-emerald-900 font-medium">
                <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                  <Check className="w-3 h-3 text-white flex-shrink-0" />
                </div>
                <span><strong>Margem de Lucro Alta:</strong> Você vende "ar" e técnica. O custo é baixo e o lucro é de até 500%.</span>
              </li>
              <li className="flex items-start gap-3 text-emerald-900 font-medium">
                <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                  <Check className="w-3 h-3 text-white flex-shrink-0" />
                </div>
                <span><strong>Independência Total:</strong> Tenha seu próprio dinheiro e pare de dar satisfação de gastos.</span>
              </li>
              <li className="flex items-start gap-3 text-emerald-900 font-medium">
                <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                  <Check className="w-3 h-3 text-white flex-shrink-0" />
                </div>
                <span><strong>Escala Invertida (2x5):</strong> Trabalhe pesado apenas no fim de semana e curta a semana livre.</span>
              </li>
              <li className="flex items-start gap-3 text-emerald-900 font-medium">
                <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                  <Check className="w-3 h-3 text-white flex-shrink-0" />
                </div>
                <span>Faturamento de <strong>até R$5.000</strong> trabalhando de casa.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Targeting Specific Groups */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-emerald-950 mb-10">Este método foi desenhado para VOCÊ:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4 block">😩</span>
              <h4 className="font-bold text-emerald-900 mb-2">Cansada da Rotina</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Você está exausta da escala 6x1, de pegar ônibus lotado e quer ter tempo de qualidade real com seus filhos e família.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4 block">🏠</span>
              <h4 className="font-bold text-emerald-900 mb-2">Dona de Casa</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Você ama cuidar do lar, mas quer contribuir com a renda ou ter seu próprio dinheiro sem ficar presa o dia todo fora de casa.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4 block">🚀</span>
              <h4 className="font-bold text-emerald-900 mb-2">Mente Empreendedora</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Você quer ganhar dinheiro de verdade, faturando até R$5.000 sem chefe no ouvido. Talvez já tenha tentado vender outras coisas, mas agora quer algo que dê lucro real.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;