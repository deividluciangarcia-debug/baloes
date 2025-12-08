import React from 'react';
import { Star, BadgeCheck } from 'lucide-react';

const optimizeImage = (url: string, width = 100) => {
  if (!url) return '';
  if (url.includes('imgur.com')) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&fit=cover&q=80&output=webp`;
};

// Componente para o efeito de "Marca-Texto" de Prosperidade
const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded mx-0.5 border-b-2 border-emerald-200 inline-block md:transform md:hover:scale-105 transition-transform cursor-default">
    {children}
  </span>
);

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      handle: "@festas_da_ju",
      image: "https://i.imgur.com/NGXoqe8.jpeg",
      // Convertido para JSX para permitir destaques
      content: (
        <>
          Gente, minha primeira festa cobrando <Highlight>R$800</Highlight>! Gastei só R$150 de material. Tô chocada com o <Highlight>lucro!</Highlight>
        </>
      ),
      highlight: "Lucrou R$650 na 1ª festa",
    },
    {
      handle: "@carol_festas_bh",
      image: "https://i.imgur.com/uNA2QOB.jpeg",
      content: (
        <>
          Larguei meu emprego CLT semana passada. Agora ganho <Highlight>em um fim de semana</Highlight> o que ganhava no mês todo aguentando patrão.
        </>
      ),
      highlight: "Pediu demissão do CLT",
    },
    {
      handle: "@paty_decora",
      image: "https://i.imgur.com/kaYHEbA.jpeg",
      content: (
        <>
          O módulo de vendas salvou minha vida. Eu tinha vergonha de cobrar, agora <Highlight>fecho contrato todo dia</Highlight> e não dou conta da agenda.
        </>
      ),
      highlight: "Agenda lotada",
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Elementos de Fundo - Pointer Events None para não bloquear scroll */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">
            Histórias Reais
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 font-serif mb-6">
            Resultados de <span className="text-emerald-600 bg-emerald-100 px-2 rounded-lg">Pessoas Comuns</span>
          </h2>
          <p className="text-slate-600 mb-0 max-w-2xl mx-auto text-lg">
            Elas começaram do absoluto zero, sem experiência e com pouco dinheiro. Veja o que aconteceu:
          </p>
        </div>

        {/* Adicionado touch-pan-y para permitir scroll vertical explicitamente em dispositivos touch */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto touch-pan-y">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col h-full md:transform md:hover:-translate-y-2 transition-all duration-300 md:hover:shadow-2xl md:hover:border-emerald-200 group will-change-transform">
              
              {/* Header do Card */}
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-6">
                <div className="relative flex-shrink-0">
                    <img 
                        src={optimizeImage(t.image)} 
                        alt={t.handle} 
                        className="w-16 h-16 rounded-full border-4 border-emerald-50 object-cover shadow-sm group-hover:border-emerald-200 transition-colors" 
                        loading="lazy"
                        width="64"
                        height="64"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white text-white shadow-sm" title="Aluna Verificada">
                        <BadgeCheck className="w-3 h-3" />
                    </div>
                </div>
                <div>
                  <p className="font-bold text-emerald-950 text-lg">{t.handle}</p>
                  <div className="flex text-yellow-400 gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
              
              {/* Conteúdo da Citação */}
              <div className="relative mb-6 flex-grow">
                 <p className="text-slate-700 italic text-lg leading-relaxed relative z-10">
                    "{t.content}"
                 </p>
              </div>
              
              {/* Badge de Resultado */}
              <div className="mt-auto pt-4 border-t border-slate-50">
                  <div className="bg-emerald-50 text-emerald-800 px-4 py-3 rounded-xl text-sm font-bold text-center border border-emerald-100 flex items-center justify-center gap-2 group-hover:bg-emerald-100 transition-colors">
                    <span>🚀</span> {t.highlight}
                  </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;