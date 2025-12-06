import React from 'react';
import { ShieldCheck, CheckCircle2, Zap, Lock, Star, Award, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

const CheckoutBanner: React.FC = () => {
  
  const handleDownload = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // High resolution (3x)
        useCORS: true,
        backgroundColor: null, // Transparent background if set in css
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      alert("Houve um erro ao gerar a imagem. Tente novamente.");
    }
  };

  return (
    <section className="py-20 bg-gray-200 overflow-x-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-16">
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700 uppercase tracking-widest border-b-4 border-slate-300 inline-block pb-2">
            Área de Banners para Checkout
          </h2>
          <p className="text-base text-slate-500 mt-2 max-w-2xl mx-auto">
            Abaixo estão os banners nas medidas exatas. Clique no botão azul para baixar a versão em Alta Definição (PNG).
          </p>
        </div>

        {/* ==========================================
            DESKTOP BANNER (2000x590px)
           ========================================== */}
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
                 <span className="bg-slate-700 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    Versão Desktop (2000 x 590 px)
                 </span>
                 <button 
                    onClick={() => handleDownload('banner-desktop', 'banner_checkout_desktop.png')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors shadow-lg"
                 >
                    <Download className="w-4 h-4" /> Baixar PNG em Alta Definição (HD)
                 </button>
            </div>
            
            <div 
            id="banner-desktop"
            style={{ width: '2000px', height: '590px' }}
            className="bg-white relative flex shadow-2xl overflow-hidden font-sans border border-slate-300 flex-shrink-0 selection:bg-none"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-40"></div>

                {/* Left Column: Brand & Security (30%) */}
                <div className="w-[32%] bg-emerald-950 p-16 flex flex-col justify-center items-start text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col justify-center h-full">
                        
                        {/* Security Badge - Added Margin Bottom */}
                        <div className="flex items-center gap-3 bg-emerald-900/80 w-fit px-6 py-3 rounded-full border-2 border-emerald-600 shadow-lg mb-16">
                            <Lock className="w-8 h-8 text-emerald-400" />
                            <span className="text-emerald-100 text-lg font-bold uppercase tracking-widest">Ambiente 100% Seguro</span>
                        </div>
                        
                        {/* Logo - Added Margin Bottom */}
                        <h1 className="text-8xl font-serif font-bold text-white tracking-tight leading-none mb-12">
                            Balões<br/><span className="text-gold-500">Lucrativos</span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-emerald-200 text-3xl font-light opacity-90 border-l-8 border-gold-500 pl-6 py-2 leading-tight">
                            Método Oficial de<br/>Formação Profissional
                        </p>
                    </div>
                </div>

                {/* Middle Column: Offer Summary (43%) */}
                <div className="w-[43%] p-16 flex flex-col justify-center relative z-10">
                    <h3 className="text-5xl font-bold text-slate-800 mb-10 flex items-center gap-5">
                        <Award className="w-14 h-14 text-gold-500" />
                        Resumo do Pedido:
                    </h3>
                    <ul className="space-y-8">
                        <li className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <CheckCircle2 className="w-12 h-12 text-green-600 flex-shrink-0" />
                            <div>
                                <span className="block font-bold text-4xl text-slate-800 mb-1">Acesso Vitalício</span>
                                <span className="text-2xl text-slate-500">Curso completo do básico ao avançado</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <CheckCircle2 className="w-12 h-12 text-green-600 flex-shrink-0" />
                            <div>
                                <span className="block font-bold text-4xl text-slate-800 mb-2">3 Bônus VIPs Inclusos</span>
                                {/* Changed to block and added margin-top to prevent overlap */}
                                <span className="block text-2xl text-green-600 font-bold bg-green-50 px-3 py-1 rounded w-fit mt-3">Economia de R$491,00</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <CheckCircle2 className="w-12 h-12 text-green-600 flex-shrink-0" />
                            <div>
                                <span className="block font-bold text-4xl text-slate-800 mb-1">Certificado Profissional</span>
                                <span className="text-2xl text-slate-500">Válido em todo território nacional</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Right Column: Guarantee & Urgency (25%) */}
                <div className="w-[25%] bg-gradient-to-b from-white to-emerald-50 border-l border-emerald-100 p-12 flex flex-col items-center justify-between text-center relative py-16">
                    <div className="flex flex-col items-center">
                        <ShieldCheck className="w-40 h-40 text-emerald-600 mx-auto drop-shadow-2xl mb-6" />
                        <h3 className="text-6xl font-black text-emerald-950 leading-none mb-4">
                            GARANTIA<br/>DE 7 DIAS
                        </h3>
                        <p className="text-slate-600 text-2xl font-medium leading-tight">
                            Risco Zero. Satisfação<br/>ou seu dinheiro de volta.
                        </p>
                    </div>

                    <div className="w-full bg-yellow-50 border-4 border-yellow-400 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-lg">
                        <div className="flex items-center gap-3 text-yellow-700 font-bold text-2xl uppercase">
                            <Zap className="w-8 h-8 fill-yellow-500" />
                            Acesso Imediato
                        </div>
                        <p className="text-yellow-800 text-lg leading-tight font-medium">
                            Liberação automática via<br/>PIX ou Cartão de Crédito
                        </p>
                    </div>
                </div>
            </div>
        </div>


        {/* ==========================================
            MOBILE BANNER (400x400px)
           ========================================== */}
        <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-4">
                 <span className="bg-slate-700 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    Versão Mobile (400 x 400 px)
                 </span>
                 <button 
                    onClick={() => handleDownload('banner-mobile', 'banner_checkout_mobile.png')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors shadow-lg"
                 >
                    <Download className="w-4 h-4" /> Baixar PNG em Alta Definição (HD)
                 </button>
            </div>

            <div 
            id="banner-mobile"
            style={{ width: '400px', height: '400px' }}
            className="bg-white relative flex flex-col shadow-2xl overflow-hidden font-sans border border-slate-300 flex-shrink-0 selection:bg-none"
            >
                {/* Header (Brand) - Increased Height to 120px to accommodate spacing */}
                <div className="bg-emerald-950 h-[120px] flex flex-col justify-center items-center text-center p-4 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <h2 className="text-3xl font-serif font-bold text-white leading-none relative z-10">
                        Balões<span className="text-gold-500">Lucrativos</span>
                    </h2>
                    
                    {/* Increased margin to mt-6 for separation, added icon alignment tweak */}
                    <div className="flex items-center justify-center gap-2 mt-6 text-emerald-200 text-[10px] uppercase tracking-widest relative z-10 font-bold bg-emerald-900/50 px-3 py-1.5 rounded-full border border-emerald-800">
                        <Lock className="w-3 h-3 relative top-[1px]" />
                        <span>Checkout Seguro</span>
                    </div>
                </div>

                {/* Body (The Offer) */}
                <div className="flex-1 bg-white p-5 flex flex-col justify-center">
                    <h3 className="text-center font-bold text-slate-800 text-lg mb-4 uppercase border-b border-slate-100 pb-2">
                        Resumo do Pedido:
                    </h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                             <div className="bg-green-500 p-1.5 rounded-full text-white">
                                <CheckCircle2 className="w-5 h-5" />
                             </div>
                             <span className="text-base font-bold text-emerald-900 leading-tight">
                                Método Completo <br/><span className="text-xs font-normal text-emerald-700">Acesso Vitalício</span>
                             </span>
                        </div>

                        <div className="flex items-center gap-3 bg-gold-50 p-2.5 rounded-lg border border-gold-200">
                             <div className="bg-gold-500 p-1.5 rounded-full text-white">
                                <Star className="w-5 h-5 fill-current" />
                             </div>
                             <span className="text-base font-bold text-yellow-900 leading-tight">
                                3 Bônus VIPs <br/><span className="text-xs font-normal text-yellow-700">Inclusos Grátis</span>
                             </span>
                        </div>
                    </div>
                </div>

                {/* Footer (Guarantee) - Reduced to 80px to balance height */}
                <div className="h-[80px] bg-slate-50 border-t border-slate-200 flex items-center px-5 justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-12 h-12 text-emerald-600" />
                        <div className="flex flex-col">
                            <span className="text-emerald-950 font-black text-xs leading-none">GARANTIA</span>
                            <span className="text-emerald-950 font-black text-xl leading-none">7 DIAS</span>
                        </div>
                    </div>
                    <div className="bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-green-200 text-center leading-tight">
                        SATISFAÇÃO<br/>GARANTIDA
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default CheckoutBanner;