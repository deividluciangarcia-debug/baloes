import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import About from './components/About';
import ProgramDetails from './components/ProgramDetails';
import ProductGallery from './components/ProductGallery';
import EarningsCalculator from './components/EarningsCalculator';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import SalesNotifications from './components/SalesNotifications';
import FreePreview from './components/FreePreview';
import { Timer, Eye, Loader2 } from 'lucide-react';

// LAZY LOADING: Componentes que não aparecem imediatamente ou são condicionais
// Isso faz com que o site carregue muito mais rápido inicialmente
const UltimatumModal = lazy(() => import('./components/UltimatumModal'));
const LastChance = lazy(() => import('./components/LastChance'));

// Loading fallback simples
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
  </div>
);

export default function App() {
  // Começamos com 27 vagas
  const [spotsLeft, setSpotsLeft] = useState(27); 
  const [showMobileCta, setShowMobileCta] = useState(false);
  
  // Alterado de boolean para string para controlar qual TIPO de modal exibir
  const [ultimatumType, setUltimatumType] = useState<'exit' | 'scarcity' | null>(null);
  
  const [onlineUsers, setOnlineUsers] = useState(118);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  
  // Estado para controlar se mostra a página de Downsell (Back Redirect) e qual etapa
  const [showDownsellPage, setShowDownsellPage] = useState(false);
  const [downsellStep, setDownsellStep] = useState<'offer1' | 'offer2'>('offer1');

  // Ref para acessar o estado mais atual dentro do event listener sem precisar recriar o listener
  const stateRef = useRef({ showDownsellPage, downsellStep });

  useEffect(() => {
    stateRef.current = { showDownsellPage, downsellStep };
  }, [showDownsellPage, downsellStep]);

  // BACK BUTTON REDIRECT (Back Redirect - Internal Page Swap)
  useEffect(() => {
    // Adiciona uma entrada no histórico ao carregar a página
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Impede o voltar padrão
      event.preventDefault();
      // Empurra o estado novamente para manter o usuário na URL
      window.history.pushState(null, '', window.location.href);
      
      const { showDownsellPage: isShowing, downsellStep: currentStep } = stateRef.current;

      if (!isShowing) {
        // Se estava na Home, mostra a primeira oferta (R$ 72)
        setShowDownsellPage(true);
        // Garante que começa na oferta 1
        setDownsellStep('offer1');
      } else if (currentStep === 'offer1') {
        // Se já estava na oferta 1 e apertou voltar de novo, vai para a oferta 2 (R$ 37)
        setDownsellStep('offer2');
      }
      // Se já estiver na oferta 2, o loop do pushState mantém ele lá
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Lógica Dinâmica de Vendas (Ritmo Lento para permitir assistir vídeos)
  useEffect(() => {
    let delay;
    
    // FASE 1: EFEITO MANADA (Vagas > 15)
    if (spotsLeft > 15) {
      delay = Math.floor(Math.random() * (25000 - 10000 + 1) + 10000); 
    } 
    // FASE 2: TENSÃO (Vagas entre 5 e 15)
    else if (spotsLeft > 5) {
      delay = Math.floor(Math.random() * (80000 - 45000 + 1) + 45000);
    }
    // FASE 3: ULTIMATO (Vagas <= 5)
    else {
      delay = 160000; 
    }
    
    const timer = setTimeout(() => {
      setSpotsLeft((prev) => {
        const newCount = prev > 1 ? prev - 1 : prev;
        return newCount;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [spotsLeft]);

  // Simulate Online Users Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; 
        return Math.max(85, prev + change); 
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Trigger Ultimatum Modal on Last Spot (Scarcity Type)
  useEffect(() => {
    if (spotsLeft === 1) { 
      setUltimatumType('scarcity');
    }
  }, [spotsLeft]);

  // EXIT INTENT TRIGGER (Desktop Only) - Trigger Exit Type
  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      // Só mostra exit intent se:
      // 1. Mouse saiu por cima
      // 2. Ainda não mostrou exit intent
      // 3. Tem vagas
      // 4. Não está na página de downsell
      // 5. O modal de escassez (1 vaga) NÃO está ativo no momento
      if (e.clientY < 10 && !hasShownExitIntent && spotsLeft > 0 && !showDownsellPage && ultimatumType !== 'scarcity') {
        setUltimatumType('exit');
        setHasShownExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleExitIntent);
    return () => document.removeEventListener('mouseleave', handleExitIntent);
  }, [hasShownExitIntent, spotsLeft, showDownsellPage, ultimatumType]);

  // Handle Scroll for Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 900) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine Sticky Bar Color based on spots left
  const getStickyBarColor = () => {
    if (spotsLeft > 20) return 'bg-emerald-600'; 
    if (spotsLeft > 9) return 'bg-orange-500';  
    return 'bg-red-600';                        
  };

  // --------------------------------------------------------------------------
  // RENDERIZAÇÃO CONDICIONAL: SE O USUÁRIO CLICOU EM VOLTAR, MOSTRA APENAS O DOWNSELL
  // --------------------------------------------------------------------------
  if (showDownsellPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <LastChance 
          step={downsellStep} 
          onNextStep={() => setDownsellStep('offer2')} 
        />
      </Suspense>
    );
  }

  // --------------------------------------------------------------------------
  // RENDERIZAÇÃO DA PÁGINA PRINCIPAL
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Ultimatum Modal (Full Screen Overlay) */}
      {ultimatumType && (
        <Suspense fallback={null}>
          <UltimatumModal 
            type={ultimatumType}
            onClose={() => {
              // Ao clicar em "Não obrigado", redireciona para o Back Redirect (Oferta R$ 72)
              setUltimatumType(null);
              setShowDownsellPage(true);
              setDownsellStep('offer1');
            }} 
            onCtaClick={() => {
              setUltimatumType(null);
              scrollToSection('pricing');
            }} 
          />
        </Suspense>
      )}

      {/* Notifications Overlay */}
      <SalesNotifications />

      {/* Top Scarcity Bar - Dynamic Color */}
      <div className={`${getStickyBarColor()} text-white py-2 px-2 md:px-4 text-center text-[10px] md:text-sm font-semibold sticky top-0 z-50 shadow-lg flex flex-col md:flex-row justify-center items-center md:gap-6 gap-1 transition-colors duration-1000 border-b-2 border-gold-500`}>
        <div className="flex items-center gap-2 drop-shadow-sm">
            <Timer className="w-3 h-3 md:w-4 md:h-4 text-white" />
            <span>
              <span className={spotsLeft <= 9 ? "text-yellow-300 font-black animate-[pulse_1s_ease-in-out_infinite]" : "font-bold"}>
                URGENTE:
              </span> 
              <span> Apenas </span>
              <span key={spotsLeft} className="text-white font-black text-sm md:text-lg mx-1 inline-block animate-number-change">
                {spotsLeft}
              </span> 
              <span> vagas restantes!</span>
            </span>
        </div>
        
        <div className="hidden md:block w-px h-4 bg-white/30"></div>
        <div className="flex items-center gap-2 text-white/90 drop-shadow-sm">
            <Eye className="w-3 h-3 md:w-4 md:h-4" />
            <span>{onlineUsers} pessoas assistindo agora</span>
        </div>
      </div>

      <Hero 
        onCtaClick={() => scrollToSection('pricing')} 
        onLearnMoreClick={() => scrollToSection('program-details')}
        spotsLeft={spotsLeft} 
      />
      <PainPoints />
      <About />
      <ProgramDetails />
      
      <ProductGallery />
      <EarningsCalculator spotsLeft={spotsLeft} />

      <FreePreview onCtaClick={() => scrollToSection('pricing')} />
      <SocialProof />
      <Pricing onCtaClick={() => scrollToSection('pricing')} spotsLeft={spotsLeft} />
      <FAQ />
      
      <Footer />

      {/* Mobile Sticky CTA */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-emerald-100 p-3 md:hidden z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${
          showMobileCta ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button 
          onClick={() => scrollToSection('pricing')}
          className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 animate-shine-effect"
        >
          <span className="text-sm uppercase tracking-wide">Quero minha vaga agora</span>
        </button>
      </div>
    </div>
  );
}