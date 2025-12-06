import React from 'react';
import { X, Check } from 'lucide-react';

const PainPoints: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4 font-serif">A Verdade Sobre o Mercado de Festas</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            A maioria das pessoas trabalha para sobreviver. O método Balões Lucrativos foi criado para <span className="font-bold text-emerald-800 border-b-4 border-green-400/60">você viver</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Old Way */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">O Ciclo da Falência (Jeito Antigo)</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Trabalhar 40h+ por semana exaustivamente',
                'Ganhar um salário que mal paga o aluguel',
                'Aguentar chefe chato e cobranças',
                'Perder o crescimento dos filhos',
                'Depender financeiramente de terceiros'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Way */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green-500 relative transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              RECOMENDADO
            </div>
            <div className="flex items-center gap-3 mb-6 border-b border-green-100 pb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">O Método Balões Lucrativos</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Trabalhar apenas Sábados e Domingos',
                'Faturar R$500 a R$2.000 por festa realizada',
                'Você é sua própria chefe',
                'Liberdade total de tempo durante a semana',
                'Independência financeira real'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-emerald-900 font-medium">
                  <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                    <Check className="w-3 h-3 text-white flex-shrink-0" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Targeting */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-emerald-950 mb-10">Esse método é PERFEITO para você se...</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <span className="text-4xl mb-4 block">👩‍💻</span>
              <p className="text-emerald-900 text-sm">
                <strong>Você trabalha CLT</strong>, ganha pouco e sente que está desperdiçando sua vida num escritório.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <span className="text-4xl mb-4 block">🏠</span>
              <p className="text-emerald-900 text-sm">
                <strong>Você é dona de casa</strong> e quer ter seu próprio dinheiro sem abandonar a rotina do lar.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <span className="text-4xl mb-4 block">🚀</span>
              <p className="text-emerald-900 text-sm">
                <strong>Você já tentou empreender</strong> com doces ou roupas, mas a conta nunca fechou no final do mês.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;