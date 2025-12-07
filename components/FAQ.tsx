import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Preciso ter experiência ou dom artístico?",
      answer: "Absolutamente não! O Método Balões Lucrativos foi desenhado justamente para quem está começando do zero. Você vai aprender técnicas mecânicas e replicáveis. Não é 'dom', é método. Se você sabe amarrar um cadarço, você consegue aplicar nossas técnicas."
    },
    {
      question: "Quanto preciso investir para começar?",
      answer: "Essa é a melhor parte: o investimento inicial é baixíssimo. Com cerca de R$150 a R$200 em balões e equipamentos básicos, você já consegue montar sua primeira decoração e faturar seus primeiros R$800 a R$1.200."
    },
    {
      question: "Como funciona a garantia de 7 dias?",
      answer: "É simples e sem letras miúdas. Você se inscreve, entra na plataforma e assiste às aulas. Se por QUALQUER motivo você achar que não é para você, basta enviar um único e-mail para nosso suporte e devolveremos 100% do seu dinheiro. O risco é todo meu."
    },
    {
      question: "O curso é online? Tenho acesso por quanto tempo?",
      answer: "Sim, o curso é 100% online para você assistir do seu celular, tablet ou computador. Nesta oferta exclusiva, o acesso é VITALÍCIO (para sempre), incluindo todas as futuras atualizações gratuitamente."
    },
    {
      question: "E se eu tiver dúvidas durante as aulas?",
      answer: "Você nunca estará sozinha! Temos uma comunidade exclusiva de alunas e suporte técnico dedicado. Abaixo de cada aula você pode deixar sua pergunta que nossa equipe responde em até 24h úteis."
    },
    {
      question: "Em quanto tempo consigo ter resultados?",
      answer: "Temos alunas que fecharam o primeiro contrato em menos de 7 dias. Tudo depende da sua aplicação do método. O módulo 'Vendas Rápidas' foi feito para você recuperar o valor do investimento já na primeira semana."
    }
  ];

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);

    // Rastrear qual dúvida específica foi aberta
    if (isOpening) {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            // Envia o nome da pergunta truncado para não ficar gigante no gerenciador
            const questionTopic = faqs[index].question.substring(0, 30) + '...';
            (window as any).fbq('trackCustom', 'ABRIU-DUVIDA', {
                pergunta: questionTopic
            });
        }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-emerald-100 p-3 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 mt-4">
            Tire suas dúvidas e veja porque o Balões Lucrativos é a escolha segura.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-xl transition-all duration-300 ${
                openIndex === index 
                  ? 'border-green-500 bg-emerald-50 shadow-md' 
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-emerald-900' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-emerald-100/50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;