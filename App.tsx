import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import { Timer, Eye, Loader2, DollarSign } from 'lucide-react';
import PixelEvents from './components/PixelEvents';

// Eager load critical components
// Lazy load below-the-fold components to improve Initial Load Time (LCP/FCP)
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

export default function App() {
  const [spotsLeft, setSpotsLeft] = useState(27); 
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [sectionsHidingBars, setSectionsHidingBars] = useState<Set<string>>(new Set());
  const [ultimatumType, setUltimatumType] = useState<'exit' | 'scarcity' | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(118);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [showDownsellPage, setShowDownsellPage] = useState(false);
  const [downsellStep, setDownsellStep] = useState<'offer1' | 'offer2'>('offer1');

  const stateRef = useRef({ showDownsellPage, downsellStep });
  const historyPushedRef = useRef(false);

  const hideStickyBars = sectionsHidingBars.size > 0;

  useEffect(() => {
    stateRef.current = { showDownsellPage, downsellStep };
  }, [showDownsellPage, downsellStep]);

  // =========================================================================
  // LÓGICA DE BACK REDIRECT
  // =========================================================================
  useEffect(() => {
    const armHistoryTrap = () => {
      if (!historyPushedRef.current) {
        window.history.pushState({ trapped: true }, '', window.location.href);
        historyPushedRef.current = true;
      }
    };

    armHistoryTrap();

    const handleInteraction = () => {
      armHistoryTrap();
    };

    window.addEventListener('touchstart', handleInteraction, { capture: true, once: true });
    window.addEventListener('click', handleInteraction, { capture: true, once: true });
    window.addEventListener('mousemove', handleInteraction, { capture: true, once: true });
    window.addEventListener('scroll', handleInteraction, { capture: true, once: true });

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();

      const { showDownsellPage: isShowing, downsellStep: currentStep } = stateRef.current;

      if (!isShowing) {
        setShowDownsellPage(true);
        setDownsellStep('offer1'); 
        window.history.pushState({ trapped: true }, '', window.location.href);
      } 
      else if (currentStep === 'offer1') {
        setDownsellStep('offer2'); 
        window.history.pushState({ trapped: true }, '', window.location.href);
      }
      else {
         window.history.pushState({ trapped: true }, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Lógica de Vagas
  useEffect(() => {
    let delay;
    if (spotsLeft > 15) {
      delay = Math.floor(Math.random() * (20000 - 8000 + 1) + 8000); 
    } else if (spotsLeft > 5) {
      delay = Math.floor(Math.random() * (60000 - 30000 + 1) + 30000);
    } else {
      delay = 140000; 
    }
    
    const timer = setTimeout(() => {
      setSpotsLeft((prev) => (prev > 1 ? prev - 1 : prev));
    }, delay);

    return () => clearTimeout(timer);
  }, [spotsLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; 
        return Math.max(85, prev + change); 
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (spotsLeft === 1) { 
      setUltimatumType('scarcity');
    }
  }, [spotsLeft]);

  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasShownExitIntent && spotsLeft > 0 && !showDownsellPage && ultimatumType !== 'scarcity') {
        setUltimatumType('exit');
        setHasShownExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleExitIntent);
    return () => document.removeEventListener('mouseleave', handleExitIntent);
  }, [hasShownExitIntent, spotsLeft, showDownsellPage, ultimatumType]);

  // Observer para monitorar Preços, Galeria e OptionsComparison
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setSectionsHidingBars((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              newSet.add(entry.target.id);
            } else {
              newSet.delete(entry.target.id);
            }
          });
          return newSet;
        });
      },
      { threshold: 0.1 } 
    );

    const checkForElements = setInterval(() => {
      const pricingSection = document.getElementById('pricing');
      const gallerySection = document.getElementById('product-gallery');
      const optionsSection = document.getElementById('options-comparison');
      
      if (pricingSection) observer.observe(pricingSection);
      if (gallerySection) observer.observe(gallerySection);
      if (optionsSection) observer.observe(optionsSection);

      if (pricingSection && gallerySection && optionsSection) {
        clearInterval(checkForElements);
      }
    }, 500);

    return () => {
      clearInterval(checkForElements);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCta(window.scrollY > 900);
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

  const getStickyBarColor = () => {
    if (spotsLeft > 20) return 'bg-indigo-900';
    if (spotsLeft > 9) return 'bg-emerald-800';
    return 'bg-red-700';
  };

  const handleMobileCtaClick = () => {
    // Rastreamento Específico Mobile
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'Click_Mobile_Sticky', {
        content_name: 'Mobile Floating Bar CTA'
      });
    }
    scrollToSection('pricing');
  };

  // RENDERIZAÇÃO PRINCIPAL
  // PixelEvents foi movido para fora das condicionais para garantir persistência do timer
  return (
    <>
      <PixelEvents />

      <Suspense fallback={null}>
         <SalesNotifications />
      </Suspense>

      {ultimatumType && (
        <Suspense fallback={null}>
          <UltimatumModal 
            type={ultimatumType}
            onClose={() => {
              setUltimatumType(null);
              setShowDownsellPage(true);
              setDownsellStep('offer1');
              window.history.pushState({ trapped: true }, '', window.location.href);
            }} 
            onCtaClick={() => {
              setUltimatumType(null);
              scrollToSection('pricing');
            }} 
          />
        </Suspense>
      )}

      {showDownsellPage ? (
        <Suspense fallback={<PageLoader />}>
          <LastChance 
            step={downsellStep} 
            onNextStep={() => {
              setDownsellStep('offer2');
              window.history.pushState({ trapped: true }, '', window.location.href);
            }} 
          />
        </Suspense>
      ) : (
        <div className="min-h-screen flex flex-col font-sans relative bg-emerald-50 text-slate-900">
          
          <div 
            className={`
              ${getStickyBarColor()} text-white py-2 px-2 md:px-4 text-center text-[10px] md:text-sm font-semibold 
              sticky top-0 z-50 shadow-xl flex flex-col md:flex-row justify-center items-center md:gap-6 gap-1 
              border-b border-white/10 transition-transform duration-500
              ${hideStickyBars ? '-translate-y-full' : 'translate-y-0'}
            `}
          >
            <div className="flex items-center gap-2 drop-shadow-sm">
                <Timer className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span>
                  <span className={spotsLeft <= 9 ? "text-red-400 font-black animate-pulse" : "text-yellow-400 font-bold"}>
                    OPORTUNIDADE:
                  </span> 
                  <span> Apenas </span>
                  <span key={spotsLeft} className="text-white font-black text-sm md:text-lg mx-1 inline-block animate-[pulse_0.5s_ease-in-out]">
                    {spotsLeft}
                  </span> 
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
            onLearnMoreClick={() => scrollToSection('program-details')}
            spotsLeft={spotsLeft} 
          />
          
          <Suspense fallback={<SectionLoader />}>
            <PainPoints />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ProgramDetails />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <ProductGallery />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <EarningsCalculator spotsLeft={spotsLeft} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <FreePreview onCtaClick={() => scrollToSection('pricing')} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <SocialProof />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Pricing onCtaClick={() => scrollToSection('pricing')} spotsLeft={spotsLeft} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <OptionsComparison onCtaClick={() => scrollToSection('pricing')} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <FAQ />
          </Suspense>
          
          <Suspense fallback={<div className="h-20 bg-emerald-950" />}>
            <Footer />
          </Suspense>

          {/* CTA Mobile */}
          <div 
            className={`fixed bottom-0 left-0 w-full bg-white border-t-2 border-gold-500 p-3 md:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-in-out ${
              showMobileCta && !hideStickyBars ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <button 
              onClick={handleMobileCtaClick}
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