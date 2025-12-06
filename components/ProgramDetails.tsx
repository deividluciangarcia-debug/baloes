import React from 'react';
import { Gift, PlayCircle, Star } from 'lucide-react';

const optimizeImage = (url: string, width = 150) => {
  if (!url) return '';
  // O Imgur bloqueia proxies de otimização, então carregamos direto
  if (url.includes('imgur.com')) return url;

  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&fit=cover&q=80&output=webp`;
};

const ProgramDetails: React.FC = () => {
  const modules = [
    { 
      title: "🚀 Comece aqui!", 
      items: ["Aula 01 - Seja bem-vinda!"] 
    },
    { 
      title: "🎈 Balões Lucrativos", 
      items: [
        "Acessórios e Ferramentas",
        "Arco de Balões em Espiral",
        "Técnica Balões Desconstruídos",
        "Técnica Balões Duple",
        "Arco de Balões Cor com Cor",
        "Balões Bubbles (Personalização)",
        "Topo de Bolo"
      ] 
    },
    { 
      title: "💰 Bônus: Técnicas de Vendas", 
      items: [
        "Boas-vindas!",
        "Sub-módulo: Dicas e estratégias para vender mais",
        "O Caminho",
        "Estratégia x Técnicas",
        "Resolvendo os problemas",
        "Fidelização",
        "Seja um especialista",
        "Gatilhos de Vendas",
        "Prospecção de Clientes",
        "Pós Vendas",
        "Conclusão"
      ] 
    }
  ];

  return (
    <section id="program-details" className="py-20 bg-emerald-900 text-white scroll-mt-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold-400 font-bold tracking-wider uppercase text-sm">O Que Você Vai Receber</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 font-serif">Conteúdo de Nível Internacional</h2>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            Não é apenas um curso de balões. É uma faculdade de negócios para festeiras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Modules List (Permanently Open & Light Background) */}
          <div className="space-y-6">
            {modules.map((mod, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl overflow-hidden shadow-lg border-l-4 border-gold-500"
              >
                <div className="p-5 bg-emerald-50 border-b border-emerald-100">
                  <h3 className="font-bold text-xl text-emerald-950 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide bg-emerald-200 text-emerald-800 px-2 py-1 rounded">
                      {idx === modules.length - 1 ? 'Módulo Bônus' : `Módulo ${String(idx + 1).padStart(2, '0')}`}
                    </span>
                    <span className="ml-1">{mod.title}</span>
                  </h3>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                         <PlayCircle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0 fill-gold-100" />
                         <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bonuses */}
          <div className="sticky top-24 h-fit">
             <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                    <Gift className="w-8 h-8 text-gold-400" />
                    Bônus Exclusivos
                </h3>
                <div className="space-y-6">
                    {[
                      {
                        name: "Curso de Caixa Floral",
                        desc: "Aprenda a personalização completa de caixas florais de luxo.",
                        val: "R$177,00",
                        img: "https://images.tcdn.com.br/img/img_prod/959192/box_de_flores_desidratadas_presenteavel_golden_com_caixa_marrom_g_4129_1_e44a525ae468bb20906ff2e7f6802990.jpeg"
                      },
                      {
                        name: "Embalagens Criativas",
                        desc: "Transforme entregas simples em presentes inesquecíveis.",
                        val: "R$147,00",
                        img: "https://storage.googleapis.com/wzukusers/user-34706380/images/5ca7e2cfd9cbeGeRCkEc/Cestas-de-Caf%C3%A9-da-manh%C3%A3-Criativa-Flores-samambaia-sul_d400.jpg"
                      },
                      {
                        name: "Arranjos Florais",
                        desc: "O segredo para entrar no mercado de luxo e cobrar 3x mais.",
                        val: "R$167,00",
                        img: "https://i.pinimg.com/736x/92/83/cd/9283cdc1db52780158a416b861066815.jpg"
                      }
                    ].map((bonus, idx) => (
                      <div key={idx} className="bg-white text-slate-900 p-4 rounded-xl flex gap-4 items-center shadow-lg transform hover:-translate-y-1 transition-transform relative overflow-hidden group">
                        {/* Shimmer effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                        
                        <img 
                            src={optimizeImage(bonus.img)} 
                            alt={bonus.name} 
                            className="w-24 h-24 rounded-lg object-cover bg-slate-200 shadow-md" 
                            loading="lazy"
                            width="96"
                            height="96"
                        />
                        
                        <div className="flex-1">
                          {/* Highlighting the VIP Badge */}
                          <div className="mb-2">
                            <span className="bg-gradient-to-r from-gold-400 via-yellow-400 to-gold-500 text-emerald-950 text-xs font-black px-3 py-1 rounded shadow-md uppercase tracking-wider inline-flex items-center gap-1">
                                <Star className="w-3 h-3 fill-emerald-950" />
                                Bônus VIP
                            </span>
                          </div>
                          
                          <h4 className="font-bold text-lg leading-tight text-emerald-950">{bonus.name}</h4>
                          <p className="text-sm text-slate-600 mt-1 leading-snug">{bonus.desc}</p>
                          <p className="text-xs text-red-500 mt-2 font-semibold">
                             De <span className="line-through">{bonus.val}</span> por <span className="text-green-600 bg-green-100 px-1 rounded">R$0,00</span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="mt-8 bg-emerald-950 p-6 rounded-xl border border-gold-500/50 text-center shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <p className="text-emerald-200 text-sm mb-1 relative z-10">
                    Total em Bônus que você ganha de presente:
                    </p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-yellow-200 to-gold-500 relative z-10 drop-shadow-sm">
                        R$491,00
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetails;