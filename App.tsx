import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import { Timer, Eye, Loader2, DollarSign, Activity, Users, ArrowRight, Lock } from 'lucide-react';
import PixelEvents from './components/PixelEvents';

// Eager load critical components
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const PainPoints = lazy(() => import('./components/PainPoints'));
const About = lazy(() => import('./components/About'));
const ProgramDetails = lazy(() => import('./components/ProgramDetails'));
const ProductGallery = lazy(() => import('./components/ProductGallery'));
const EarningsCalculator = lazy(() => import('./components/EarningsCalculator'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Pricing = lazy(() => import('./components/Pricing'));
const OptionsComparison = lazy(() => import('./components/OptionsComparison'));
const Footer = lazy(() => import('./components/Footer'));
const FAQ = lazy(() => import('./components/FAQ'));
const SalesNotifications = lazy(() => import('./components/SalesNotifications'));
const FreePreview = lazy(() => import('./components/FreePreview'));
const UltimatumModal = lazy(() => import('./components/UltimatumModal'));
const LastChance = lazy(() => import('./components/LastChance'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-emerald-950">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
      <p className="text-emerald-100 font-serif tracking-widest text-sm">CARREGANDO OPORTUNIDADE...</p>
    </div>
  </div>
);

// Fallback component for sections loading on scroll
const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center bg-emerald-50/50">
    <Loader2 className="w-8 h-8 text-emerald-600 animate-spin opacity-50" />
  </div>
);

// --- COMPONENTE: MÁSCARA DE ALTA DEMANDA (HOME) ---
// Justificativa: "Muitos acessos" -> Força o clique -> Ativa o Back Redirect
const EntryMask = ({ onUnlock, onlineUsers }: { onUnlock: () => void, onlineUsers: number }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-emerald-950/98 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-700">
      <div className="bg-white rounded-2xl max-w-xs md:max-w-sm w-full p-6 md:p-8 text-center shadow-2xl border-b-4 border-emerald-500 relative overflow-hidden">
        
        {/* Animated Background Line - Mantido pois é suave (Shine) e não pisca */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-shine-effect"></div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner">
               <Activity className="w-10 h-10 text-emerald-600" />
            </div>
            {/* Live Indicator - MANTIDO O PULSE AQUI (Ao Vivo) */}
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse border-2 border-white shadow-sm tracking-wide uppercase">
              Ao Vivo
            </div>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-black text-emerald-950 mb-2 leading-tight uppercase tracking-tight">
          Alta Demanda <br/>Identificada
        </h2>
        
        <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100">
           <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm mb-1">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="tabular-nums">{onlineUsers}</span>
              <span>pessoas acessando agora</span>
           </div>
           <p className="text-[11px] text-emerald-600/80 leading-tight">
             Para evitar instabilidade, estamos liberando o acesso por ordem de chegada.
           </p>
        </div>

        {/* Botão estático (sem pulse) para mais seriedade */}
        <button 
          onClick={onUnlock}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg py-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          <span>LIBERAR MEU ACESSO</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-widest font-medium">
          <Lock className="w-3 h-3" /> 
          Verificação de Segurança
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [spotsLeft, setSpotsLeft] = useState(27); 
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [sectionsHidingBars, setSectionsHidingBars] = useState<Set<string>>(new Set());
  const [ultimatumType, setUltimatumType] = useState<'exit' | 'scarcity' | 'upgrade' | 'downsell-annual' | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(118);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [showDownsellPage, setShowDownsellPage] = useState(false);
  const [downsellStep, setDownsellStep] = useState<'offer1' | 'offer2'>('offer1');
  
  // Estado para a Máscara de Alta Demanda (Force Click)
  const [showEntryMask, setShowEntryMask] = useState(true);

  // Refs para estado sempre atualizado dentro dos Event Listeners
  const showDownsellPageRef = useRef(showDownsellPage);
  const downsellStepRef = useRef(downsellStep); 
  const ultimatumTypeRef = useRef(ultimatumType); 
  const hasHistoryPushedRef = useRef(false);

  // Sincroniza os refs com o state
  useEffect(() => {
    showDownsellPageRef.current = showDownsellPage;
    downsellStepRef.current = downsellStep; 
  }, [showDownsellPage, downsellStep]);

  useEffect(() => {
    ultimatumTypeRef.current = ultimatumType;
  }, [ultimatumType]);

  // =========================================================================
  // TESTE A/B
  // =========================================================================
  const [heroVariant] = useState<'green' | 'light'>(() => {
    try {
      if (typeof window !== 'undefined') {
         const savedSession = window.sessionStorage?.getItem('ab_hero_color');
         if (savedSession === 'green' || savedSession === 'light') return savedSession;

         const randomSeed = new Date().getTime() + Math.random();
         const variant = randomSeed % 2 > 1 ? 'green' : (Math.random() < 0.5 ? 'green' : 'light');
         
         window.sessionStorage?.setItem('ab_hero_color', variant);
         return variant;
      }
    } catch (e) { console.warn(e); }
    return 'green';
  });

  const hideStickyBars = sectionsHidingBars.size > 0;

  // =========================================================================
  // LÓGICA DE BACK REDIRECT (Botão Voltar)
  // =========================================================================
  
  // Função centralizada para empurrar o estado no histórico
  const pushHistoryState = () => {
    if (!hasHistoryPushedRef.current) {
        window.history.pushState({ page: 'home' }, '', window.location.href);
        hasHistoryPushedRef.current = true;
        // console.log("History State Pushed via Click (Mobile Safe)");
    }
  };

  // Handler para desbloquear a tela e ativar o Back Redirect no CLIQUE
  const handleUnlockEntry = () => {
    pushHistoryState(); // ATIVA O BACK REDIRECT 100% GARANTIDO
    setShowEntryMask(false);
    
    // Toca um som sutil de "Acesso Permitido"
    try {
      const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=pop-39222.mp3");
      audio.volume = 0.1;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  useEffect(() => {
    // Mantemos o listener de scroll como backup, mas o Mask é o principal
    const handleScrollInteraction = () => {
        if (window.scrollY > 50) {
            pushHistoryState();
            window.removeEventListener('scroll', handleScrollInteraction);
        }
    };

    window.addEventListener('scroll', handleScrollInteraction);

    // 3. Manipula o evento de "Voltar"
    const handlePopState = (event: PopStateEvent) => {
        // LÓGICA 1: Modais
        if (ultimatumTypeRef.current === 'upgrade' || ultimatumTypeRef.current === 'exit') {
            event.preventDefault();
            setUltimatumType(null);
            setShowDownsellPage(true);
            setDownsellStep('offer1');
            window.history.pushState({ page: 'downsell-triggered-1' }, '', window.location.href);
            return;
        }

        // LÓGICA 2: Navegação interna do Downsell (Offer 1 -> Offer 2)
        if (showDownsellPageRef.current && downsellStepRef.current === 'offer1') {
            event.preventDefault();
            setDownsellStep('offer2');
            window.history.pushState({ page: 'downsell-step-2' }, '', window.location.href);
            
            if (typeof window !== 'undefined' && (window as any).fbq) {
               (window as any).fbq('trackCustom', 'BACK-BUTTON-DE-72-PARA-37');
            }
            return;
        }

        // LÓGICA 3: Ativação do Downsell da Home
        if (!showDownsellPageRef.current) {
            event.preventDefault(); 
            setShowDownsellPage(true);
            setDownsellStep('offer1'); 
            window.history.pushState({ page: 'downsell-step-1' }, '', window.location.href);
            
            if (typeof window !== 'undefined' && (window as any).fbq) {
               (window as any).fbq('trackCustom', 'ATIVOU-BACK-REDIRECT-72');
            }
        }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
        window.removeEventListener('scroll', handleScrollInteraction);
        window.removeEventListener('popstate', handlePopState);
    };
  }, []); 

  // =========================================================================
  // PIXEL TRACKING
  // =========================================================================
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const eventName = heroVariant === 'green' ? 'PV-VERDE' : 'PV-CLARA';
      (window as any).fbq('trackCustom', eventName, { teste: 'Teste AB Cores Hero', variant: heroVariant });
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Sales Page - Baloes Lucrativos',
        content_ids: ['lp-baloes-v1'],
        content_type: 'product',
        variant: heroVariant,
        value: 0.00,
        currency: 'BRL'
      });
    }
  }, [heroVariant]);

  // Lógica de Vagas (Timer)
  useEffect(() => {
    let delay;
    if (spotsLeft > 15) delay = Math.floor(Math.random() * (20000 - 8000 + 1) + 8000); 
    else if (spotsLeft > 5) delay = Math.floor(Math.random() * (60000 - 30000 + 1) + 30000);
    else delay = 140000; 
    
    const timer = setTimeout(() => setSpotsLeft((prev) => (prev > 1 ? prev - 1 : prev)), delay);
    return () => clearTimeout(timer);
  }, [spotsLeft]);

  // Lógica Users Online
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => Math.max(85, prev + (Math.floor(Math.random() * 5) - 2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Exit Intent (Mouse Leave - Topo da página)
  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      // Só ativa se não estiver no downsell, não tiver mostrado modal e tiver vagas
      if (e.clientY < 10 && !hasShownExitIntent && spotsLeft > 0 && !showDownsellPage && !ultimatumType && !showEntryMask) {
        pushHistoryState(); 
        window.history.pushState({ modal: 'exit' }, '', window.location.href);
        
        setUltimatumType('exit');
        setHasShownExitIntent(true);
        if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('trackCustom', 'ATIVOU-EXIT-INTENT-MODAL');
      }
    };
    document.addEventListener('mouseleave', handleExitIntent);
    return () => document.removeEventListener('mouseleave', handleExitIntent);
  }, [hasShownExitIntent, spotsLeft, showDownsellPage, ultimatumType, showEntryMask]);

  // Observer para esconder barras flutuantes
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        setSectionsHidingBars((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => entry.isIntersecting ? newSet.add(entry.target.id) : newSet.delete(entry.target.id));
          return newSet;
        });
      }, { threshold: 0.1 });

    const checkForElements = setInterval(() => {
      const els = ['pricing', 'product-gallery', 'options-comparison'].map(id => document.getElementById(id));
      els.forEach(el => el && observer.observe(el));
      if (els.every(el => el)) clearInterval(checkForElements);
    }, 500);

    return () => { clearInterval(checkForElements); observer.disconnect(); };
  }, []);

  // Mobile CTA Scroll
  useEffect(() => {
    const handleScroll = () => setShowMobileCta(window.scrollY > 900);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getStickyBarColor = () => {
    if (spotsLeft > 20) return 'bg-indigo-900';
    if (spotsLeft > 9) return 'bg-emerald-800';
    return 'bg-red-700';
  };

  // ------------------------------------------------------------------
  //  FLUXO DE VENDAS E MODAIS
  // ------------------------------------------------------------------
  
  const handleAnnualPlanClick = () => {
    window.history.pushState({ modal: 'upgrade' }, '', window.location.href);
    setUltimatumType('upgrade');
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'ABRIU-UPGRADE-MODAL', { origin: 'pricing' });
    }
  };

  const handleAcceptUpgrade = () => {
    setUltimatumType(null);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Curso Baloes - Vitalicio (Upgrade 25% OFF)',
        value: 72.75,
        currency: 'BRL'
      });
    }
    window.location.href = "https://pay.kiwify.com.br/8DJPyTz";
  };

  const handleRejectUpgrade = () => {
     setUltimatumType(null); 
     
     if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Curso Baloes - Anual (Recusou Upgrade)',
        value: 67.00,
        currency: 'BRL'
      });
    }
    window.location.href = "https://pay.kiwify.com.br/CVZ4Q50";
  };

  const handleNextDownsellStep = () => {
     setDownsellStep('offer2');
     window.history.pushState({ page: 'downsell-step-2' }, '', window.location.href);
  };

  return (
    <>
      <PixelEvents />
      
      {/* OVERLAY DE ALTA DEMANDA (HOME) */}
      {showEntryMask && !showDownsellPage && (
        <EntryMask onUnlock={handleUnlockEntry} onlineUsers={onlineUsers} />
      )}

      <Suspense fallback={null}><SalesNotifications /></Suspense>

      {/* MODAL GERAL */}
      {ultimatumType && (
        <Suspense fallback={null}>
          <UltimatumModal 
            type={ultimatumType}
            onClose={() => {
              if (ultimatumType === 'upgrade') {
                 handleRejectUpgrade(); 
              } else if (ultimatumType === 'exit') {
                 setUltimatumType(null);
                 setShowDownsellPage(true);
                 setDownsellStep('offer1');
              } else {
                 setUltimatumType(null);
              }
            }} 
            onCtaClick={() => {
              if (ultimatumType === 'upgrade') handleAcceptUpgrade();
              else {
                setUltimatumType(null);
                scrollToSection('pricing');
              }
            }} 
          />
        </Suspense>
      )}

      {/* PÁGINA DE DOWNSELL */}
      {showDownsellPage ? (
        <Suspense fallback={<PageLoader />}>
          <LastChance 
            step={downsellStep} 
            onNextStep={handleNextDownsellStep} 
          />
        </Suspense>
      ) : (
        // PÁGINA PRINCIPAL
        <div className={`min-h-screen flex flex-col font-sans relative bg-emerald-50 text-slate-900 ${showEntryMask ? 'overflow-hidden h-screen blur-sm' : ''}`}>
          
          <div className={`${getStickyBarColor()} text-white py-2 px-2 md:px-4 text-center text-[10px] md:text-sm font-semibold sticky top-0 z-50 shadow-xl flex flex-col md:flex-row justify-center items-center md:gap-6 gap-1 border-b border-white/10 transition-transform duration-500 ${hideStickyBars ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className="flex items-center gap-2 drop-shadow-sm">
                <Timer className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span>
                  <span className={spotsLeft <= 9 ? "text-red-400 font-black animate-pulse" : "text-yellow-400 font-bold"}>OPORTUNIDADE:</span> 
                  <span> Apenas </span>
                  <span key={spotsLeft} className="text-white font-black text-sm md:text-lg mx-1 inline-block animate-[pulse_0.5s_ease-in-out]">{spotsLeft}</span> 
                  <span> vagas para a Turma de Lucro!</span>
                </span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2 text-emerald-100/90">
                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                <span>{onlineUsers} interessadas assistindo agora</span>
            </div>
          </div>

          <Hero 
            onCtaClick={() => scrollToSection('pricing')} 
            onLearnMoreClick={() => scrollToSection('how-it-works')} 
            spotsLeft={spotsLeft}
            variant={heroVariant} 
          />
          
          <Suspense fallback={<SectionLoader />}><HowItWorks /></Suspense>
          <Suspense fallback={<SectionLoader />}><PainPoints /></Suspense>
          <Suspense fallback={<SectionLoader />}><About /></Suspense>
          <Suspense fallback={<SectionLoader />}><ProgramDetails /></Suspense>
          <Suspense fallback={<SectionLoader />}><ProductGallery /></Suspense>
          <Suspense fallback={<SectionLoader />}><EarningsCalculator spotsLeft={spotsLeft} /></Suspense>
          <Suspense fallback={<SectionLoader />}><FreePreview onCtaClick={() => scrollToSection('pricing')} /></Suspense>
          <Suspense fallback={<SectionLoader />}><SocialProof /></Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Pricing 
              onCtaClick={() => scrollToSection('pricing')} 
              onAnnualPlanClick={handleAnnualPlanClick}
              spotsLeft={spotsLeft} 
            />
          </Suspense>

          <Suspense fallback={<SectionLoader />}><OptionsComparison onCtaClick={() => scrollToSection('pricing')} /></Suspense>

          <Suspense fallback={<SectionLoader />}><FAQ /></Suspense>
          <Suspense fallback={<div className="h-20 bg-emerald-950" />}><Footer /></Suspense>

          <div className={`fixed bottom-0 left-0 w-full bg-white border-t-2 border-gold-500 p-3 md:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-in-out ${showMobileCta && !hideStickyBars ? 'translate-y-0' : 'translate-y-full'}`}>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('trackCustom', 'BTN-MOBILE-FLUTUANTE', { local: 'Barra Fixa Inferior' });
                }
                scrollToSection('pricing');
              }}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 animate-shine-effect"
            >
              <DollarSign className="w-5 h-5 text-gold-400" />
              <span className="text-sm uppercase tracking-wide">Quero Lucrar com Festas</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}