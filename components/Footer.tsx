import React, { useState } from 'react';
import { X } from 'lucide-react';

const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<'privacy' | 'terms' | null>(null);

  const openModal = (type: 'privacy' | 'terms') => {
    // Rastreamento de Documentos Legais
    if (typeof window !== 'undefined' && (window as any).fbq) {
        const eventName = type === 'privacy' ? 'LEU-POLITICA' : 'LEU-TERMOS';
        (window as any).fbq('trackCustom', eventName, {
            local: 'Footer'
        });
    }
    
    setModalOpen(type);
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  };

  const closeModal = () => {
    setModalOpen(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <>
      <footer className="bg-emerald-950 text-emerald-400 py-12 text-sm border-t-4 border-gold-600">
        <div className="container mx-auto px-4 text-center space-y-6">
          
          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl font-serif text-white mb-2">Balões Lucrativos</h2>
            <p className="max-w-xl mx-auto opacity-70 mb-6">
              O método definitivo para transformar balões em um negócio lucrativo.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs font-bold uppercase tracking-widest text-emerald-200">
            <button 
              onClick={() => openModal('privacy')} 
              className="hover:text-white hover:underline transition-all"
            >
              Política de Privacidade
            </button>
            <button 
              onClick={() => openModal('terms')} 
              className="hover:text-white hover:underline transition-all"
            >
              Termos de Uso
            </button>
          </div>

          {/* Disclaimers */}
          <div className="pt-8 border-t border-emerald-900 mt-8 opacity-60 text-[10px] md:text-xs text-justify md:text-center max-w-5xl mx-auto space-y-4 leading-relaxed font-light">
            <p>
              <strong>ISENÇÃO DE RESPONSABILIDADE DE GANHOS:</strong> Os resultados apresentados neste site (incluindo depoimentos e estudos de caso) são de alunos reais, mas não garantem que você terá exatamente os mesmos resultados. O sucesso no curso Balões Lucrativos depende exclusivamente da sua dedicação, esforço, histórico pessoal e aplicação correta das técnicas ensinadas. Todo empreendimento envolve riscos e esforço massivo. Se você procura "dinheiro fácil" ou "ficar rico da noite para o dia", este treinamento não é para você.
            </p>
            <p>
              <strong>AVISO LEGAL:</strong> Este site não é afiliado ao Facebook, Google ou a qualquer entidade do Meta Platforms, Inc. ou Alphabet Inc. Depois que você sair do Facebook ou Google, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usar resultados reais. Nós não vendemos o seu e-mail ou qualquer informação para terceiros. Jamais fazemos nenhum tipo de spam.
            </p>
            <p className="mt-6 font-medium text-emerald-500">
              &copy; {new Date().getFullYear()} Balões Lucrativos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Popup Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300" onClick={closeModal}>
          
          {/* Modal Content */}
          <div 
            className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50 rounded-t-xl">
              <h3 className="font-bold text-lg text-emerald-950 font-serif">
                {modalOpen === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
              </h3>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors group"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-slate-500 group-hover:text-red-500" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 md:p-8 text-slate-700 text-sm leading-relaxed space-y-4 custom-scrollbar">
              {modalOpen === 'privacy' ? (
                <div className="space-y-4">
                  <p className="font-bold text-emerald-900">1. Coleta de Informações</p>
                  <p>Coletamos informações pessoais identificáveis (como nome, endereço de e-mail e número de telefone) apenas quando voluntariamente enviadas por nossos visitantes através de formulários de inscrição ou checkout. As informações que você fornece são usadas para atender à sua solicitação específica.</p>
                  
                  <p className="font-bold text-emerald-900">2. Tecnologia de Rastreamento (Cookies)</p>
                  <p>O site pode usar cookies e tecnologia de rastreamento (como Pixels do Facebook e Google Analytics) dependendo dos recursos oferecidos. A tecnologia de rastreamento é útil para coletar informações como tipo de navegador e sistema operacional, rastrear o número de visitantes do site e entender como os visitantes usam o site.</p>
                  
                  <p className="font-bold text-emerald-900">3. Distribuição de Informações</p>
                  <p>Nós não compartilhamos suas informações com terceiros para fins de marketing. Podemos compartilhar informações com agências governamentais ou outras empresas que nos auxiliam na prevenção ou investigação de fraudes.</p>
                  
                  <p className="font-bold text-emerald-900">4. Segurança de Dados</p>
                  <p>Suas informações de identificação pessoal são mantidas em segurança. Apenas funcionários autorizados e contratados (que concordaram em manter as informações seguras e confidenciais) têm acesso a essas informações. Todos os e-mails e newsletters deste site permitem que você opte por não receber mais correspondências.</p>
                </div>
              ) : (
                <div className="space-y-4">
                   <p className="font-bold text-emerald-900">1. Aceitação dos Termos</p>
                   <p>Ao acessar e usar este site, você aceita e concorda em ficar vinculado pelos termos e disposições deste acordo. Além disso, ao usar os serviços particulares deste site, você estará sujeito a quaisquer regras ou diretrizes publicadas aplicáveis a esses serviços.</p>
                   
                   <p className="font-bold text-emerald-900">2. Propriedade Intelectual</p>
                   <p>Todo o conteúdo disponibilizado no treinamento Balões Lucrativos (vídeos, textos, logotipos, gráficos, imagens) é de propriedade exclusiva e protegido pelas leis de direitos autorais. É estritamente proibida a cópia, distribuição, transmissão ou venda de qualquer parte do conteúdo sem autorização expressa.</p>
                   
                   <p className="font-bold text-emerald-900">3. Política de Reembolso</p>
                   <p>Oferecemos uma garantia de satisfação de 7 dias. Se você não estiver satisfeito com o produto, pode solicitar o reembolso total dentro de 7 dias após a compra. O reembolso será processado através da plataforma de pagamento utilizada no momento da compra.</p>
                   
                   <p className="font-bold text-emerald-900">4. Acesso e Conta</p>
                   <p>O acesso ao curso é individual e intransferível. O compartilhamento de credenciais de acesso com terceiros pode resultar na suspensão imediata da conta sem aviso prévio e sem direito a reembolso (pirataria).</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
              <button 
                onClick={closeModal}
                className="bg-emerald-900 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all shadow-lg transform active:scale-95"
              >
                Entendi e Concordo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;