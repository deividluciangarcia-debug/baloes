import React from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          
          <div className="md:w-1/2 flex justify-center w-full">
             {/* Assinatura Estilizada (Visual) */}
             <div className="bg-emerald-50 rounded-full w-64 h-64 md:w-80 md:h-80 flex items-center justify-center border-4 border-emerald-100 shadow-xl relative overflow-hidden group transform hover:scale-105 transition-transform duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <h2 className="font-signature text-7xl md:text-8xl text-emerald-900 transform -rotate-6 relative z-10 p-4 text-center leading-none select-none">
                    Nívia <br/> Souto
                </h2>
                
                <div className="absolute bottom-6 text-[10px] uppercase tracking-widest text-emerald-800/60 font-sans font-bold">
                    Criadora do Método
                </div>
             </div>
          </div>

          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif">
              De Desempregada a Faturar 2 Milhões
            </h2>
            <div className="w-20 h-1.5 bg-green-500 rounded-full"></div>
            
            <p className="text-slate-600 leading-relaxed">
              Sou a Nívia. Há 8 anos, eu estava exatamente onde você está hoje: contando moedas para pagar o aluguel. 
              Tudo mudou quando decorei o aniversário da minha sobrinha com balões baratos e 3 mães me pediram orçamento na hora.
            </p>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Naquele fim de semana faturei R$1.200. Hoje, já ensinei mais de 5.000 mulheres a conquistarem sua liberdade financeira.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-900 text-lg">R$18 Bi</h4>
                <p className="text-xs text-slate-500">Mercado de Festas</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-900 text-lg">5.000+</h4>
                <p className="text-xs text-slate-500">Alunas Formadas</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-900 text-lg">Top 1%</h4>
                <p className="text-xs text-slate-500">Método Exclusivo</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-6">
              <p className="text-emerald-800 italic text-sm">
                "Eu não sou especial. Apenas descobri um sistema que funciona. E se você seguir o passo a passo, terá os mesmos resultados."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;