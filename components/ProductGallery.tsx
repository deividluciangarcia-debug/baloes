import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, DollarSign, TrendingUp, BarChart, Star } from 'lucide-react';

const products = [
  {
    name: "Topo de Bolo (Balloon Topper)",
    time: "20 min",
    cost: "R$5,00",
    price: "R$35,00",
    profit: "R$30,00",
    difficulty: 1, // 1 to 3
    difficultyLabel: "Muito Fácil",
    image: "https://casaeconstrucao.org/wp-content/uploads/2023/08/4-bolo-quadrado-com-balao-@marcia_bolo_doce.jpg",
    isBonus: false
  },
  {
    name: "Arco Desconstruído",
    time: "1h 30min",
    cost: "R$80,00",
    price: "R$500,00",
    profit: "R$420,00",
    difficulty: 2,
    difficultyLabel: "Média",
    image: "https://i.imgur.com/jRgh378.jpeg",
    isBonus: false
  },
  {
    name: "Bubble Personalizado",
    time: "30 min",
    cost: "R$25,00",
    price: "R$120,00",
    profit: "R$95,00",
    difficulty: 2,
    difficultyLabel: "Média",
    image: "https://i.imgur.com/V4LVq8a.jpeg",
    isBonus: false
  },
  {
    name: "Arco em Espiral (Clássico)",
    time: "2h 00min",
    cost: "R$100,00",
    price: "R$450,00",
    profit: "R$350,00",
    difficulty: 2,
    difficultyLabel: "Média",
    image: "https://i.imgur.com/7QVQ6Nn.jpeg",
    isBonus: false
  },
  {
    name: "Técnica Duple (Double Stuff)",
    time: "2h 30min",
    cost: "R$180,00",
    price: "R$900,00",
    profit: "R$720,00",
    difficulty: 3,
    difficultyLabel: "Avançada",
    image: "https://i.imgur.com/NsMKR5G.jpeg",
    isBonus: false
  },
  {
    name: "Arco Cor com Cor",
    time: "2h 00min",
    cost: "R$120,00",
    price: "R$600,00",
    profit: "R$480,00",
    difficulty: 2,
    difficultyLabel: "Média",
    image: "https://i.imgur.com/lUaB00i.jpeg",
    isBonus: false
  },
  {
    name: "Caixa Floral de Luxo",
    time: "40 min",
    cost: "R$35,00",
    price: "R$180,00",
    profit: "R$145,00",
    difficulty: 1,
    difficultyLabel: "Fácil",
    image: "https://images.tcdn.com.br/img/img_prod/959192/box_de_flores_desidratadas_presenteavel_golden_com_caixa_marrom_g_4129_1_e44a525ae468bb20906ff2e7f6802990.jpeg",
    isBonus: true
  },
  {
    name: "Embalagens Criativas",
    time: "15 min",
    cost: "R$10,00",
    price: "R$60,00",
    profit: "R$50,00",
    difficulty: 1,
    difficultyLabel: "Muito Fácil",
    image: "https://storage.googleapis.com/wzukusers/user-34706380/images/5ca7e2cfd9cbeGeRCkEc/Cestas-de-Caf%C3%A9-da-manh%C3%A3-Criativa-Flores-samambaia-sul_d400.jpg",
    isBonus: true
  },
  {
    name: "Arranjos Florais",
    time: "50 min",
    cost: "R$45,00",
    price: "R$250,00",
    profit: "R$205,00",
    difficulty: 2,
    difficultyLabel: "Média",
    image: "https://i.pinimg.com/736x/92/83/cd/9283cdc1db52780158a416b861066815.jpg",
    isBonus: true
  }
];

const ProductGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images to avoid flickering or slow loading
  useEffect(() => {
    const preloadImages = async () => {
      const promises = products.map((product) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = product.image;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl
        setItemsPerPage(4);
      } else if (window.innerWidth >= 1024) { // lg
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) { // md
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 12000); // 12 seconds per slide
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Calculate visible products based on current index and circular logic
  const visibleProducts = Array.from({ length: itemsPerPage }, (_, i) => {
    const index = (currentIndex + i) % products.length;
    return products[index];
  });

  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif mb-4">
            Lucro em Cada Detalhe
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Veja na prática quanto você vai ganhar com cada peça que aprenderá a produzir no curso.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Controls with Golden Border */}
          <button 
            onClick={prevSlide} 
            className="absolute top-[72%] -left-2 md:-left-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-emerald-900 border-2 border-gold-400 z-10 hover:scale-110 transition-transform hover:bg-gold-50"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute top-[72%] -right-2 md:-right-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-emerald-900 border-2 border-gold-400 z-10 hover:scale-110 transition-transform hover:bg-gold-50"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Grid Container acting as Carousel */}
          {/* Using product.name as key ensures React reuses the DOM nodes instead of recreating them, which prevents image reloading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
               <div 
                 key={product.name} 
                 className={`bg-white rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 relative ${
                   product.isBonus ? 'border-gold-400 ring-1 ring-gold-200' : 'border-slate-200'
                 }`}
               >
                  {/* Bonus Tag */}
                  {product.isBonus && (
                      <div className="absolute top-0 right-0 z-20 bg-gradient-to-l from-gold-500 to-yellow-400 text-emerald-950 text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-wider flex items-center gap-1">
                          <Star className="w-3 h-3 fill-emerald-950" />
                          CURSO BÔNUS
                      </div>
                  )}

                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-emerald-950 mb-4 h-14 leading-tight flex items-center">{product.name}</h3>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between text-slate-500">
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Tempo:</div>
                        <span>{product.time}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <div className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Custo:</div>
                        <span>{product.cost}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <div className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Venda:</div>
                        <span>{product.price}</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-xl border border-green-100 text-center">
                       <p className="text-xs text-green-800 uppercase font-bold tracking-wider mb-1 flex items-center justify-center gap-1">
                         <TrendingUp className="w-3 h-3" /> Lucro Livre
                       </p>
                       <p className="text-2xl font-black text-green-600">{product.profit}</p>
                    </div>

                    {/* Difficulty Thermometer */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                       <div className="flex items-center gap-2 mb-1">
                          <BarChart className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Dificuldade</span>
                       </div>
                       <div className="w-full bg-slate-200 rounded-full h-1.5 flex gap-0.5 overflow-hidden">
                          {[1, 2, 3].map((lvl) => (
                             <div 
                                key={lvl} 
                                className={`flex-1 ${lvl <= product.difficulty ? (product.difficulty === 1 ? 'bg-green-400' : product.difficulty === 2 ? 'bg-yellow-400' : 'bg-red-400') : 'bg-transparent'}`}
                             ></div>
                          ))}
                       </div>
                       <p className="text-[10px] text-right text-slate-400 mt-1">{product.difficultyLabel}</p>
                    </div>
                  </div>
               </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
             {products.map((_, idx) => (
               <div 
                 key={idx}
                 className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-emerald-600' : 'bg-slate-300'}`}
               ></div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductGallery;