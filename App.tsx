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
import { Timer, Eye, Loader2, DollarSign } from 'lucide-react';

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

export default function App() {
  const [spotsLeft, setSpotsLeft] = useState(27); 
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [ultimatumType, setUltimatumType] = useState<'exit' | 'scarcity' | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(118);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [showDownsellPage, setShowDownsellPage] = useState(false);
  const [downsellStep, setDownsellStep] = useState<'offer1' | 'offer2'>('offer1');

  const stateRef = useRef({ showDownsellPage, downsellStep });

  useEffect(() => {
    stateRef.current = { showDownsellPage, downsellStep };
  }, [showDownsellPage, downsellStep]);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
      
      const { showDownsellPage: isShowing, downsellStep: currentStep } = stateRef.current;

      if (!isShowing) {
        setShowDownsellPage(true);
        setDownsellStep('offer1');
      } else if (currentStep === 'offer1') {
        setDownsellStep('offer2');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let delay;
    if (spotsLeft > 15) {
      delay = Math.floor(Math.random() * (25000 - 10000 + 1) + 10000); 
    } else if (spotsLeft > 5) {
      delay = Math.floor(Math.random() * (80000 - 45000 + 1) + 45000);
    } else {
      delay = 160000; 
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
    if (spotsLeft > 20) return 'bg-emerald-900'; 
    if (spotsLeft > 9) return 'bg-emerald-800';  
    return 'bg-red-700';                        
  };

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

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-emerald-50 text-slate-900">
      {ultimatumType && (
        <Suspense fallback={null}>
          <UltimatumModal 
            type={ultimatumType}
            onClose={() => {
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

      <SalesNotifications />

      <div className={`${getStickyBarColor()} text-white py-2 px-2 md:px-4 text-center text-[10px] md:text-sm font-semibold sticky top-0 z-50 shadow-xl flex flex-col md:flex-row justify-center items-center md:gap-6 gap-1 border-b border-gold-500/30`}>
        <div className="flex items-center gap-2 drop-shadow-sm">
            <Timer className="w-3 h-3 md:w-4 md:h-4 text-gold-400" />
            <span>
              <span className={spotsLeft <= 9 ? "text-red-400 font-black animate-pulse" : "text-gold-400 font-bold"}>
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

      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t-2 border-gold-500 p-3 md:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-in-out ${
          showMobileCta ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button 
          onClick={() => scrollToSection('pricing')}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 animate-shine-effect"
        >
          <DollarSign className="w-5 h-5 text-gold-400" />
          <span className="text-sm uppercase tracking-wide">Quero Lucrar com Festas</span>
        </button>
      </div>
    </div>
  );
}