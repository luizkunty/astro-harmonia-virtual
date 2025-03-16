
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card mb-4 overflow-hidden">
      <button
        className="w-full text-left px-6 py-4 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-montserrat text-white text-lg">{question}</span>
        <span className={`text-2xl text-astro-gold transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      
      <div className={`px-6 pb-4 text-white/80 transition-all overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      question: "O que é um mapa astral?",
      answer: "Um mapa astral é uma representação do céu no momento exato do seu nascimento. Ele mostra as posições dos planetas, do Sol, da Lua e outras configurações astrológicas que influenciam sua personalidade e jornada de vida."
    },
    {
      question: "O Astro Hermetis usa IA para fazer as interpretações?",
      answer: "Sim! O Astro Hermetis utiliza inteligência artificial avançada para interpretar seu mapa astral, combinando conhecimento astrológico tradicional com algoritmos modernos para fornecer insights personalizados."
    },
    {
      question: "Por que preciso informar a hora exata de nascimento?",
      answer: "A hora de nascimento é crucial para calcular seu Ascendente e as casas astrológicas, que são fundamentais para uma interpretação precisa do seu mapa. Sem a hora, algumas informações importantes ficarão incompletas."
    },
    {
      question: "As interpretações são confiáveis?",
      answer: "Nossas interpretações são baseadas em princípios astrológicos estabelecidos e enriquecidas por IA treinada em vasta literatura astrológica. No entanto, a astrologia é uma arte interpretativa e deve ser vista como uma ferramenta de autoconhecimento, não como uma ciência exata."
    },
    {
      question: "Posso acessar meu mapa astral depois?",
      answer: "Sim! Você pode salvar ou baixar seu mapa astral para consulta futura. Também estamos desenvolvendo um sistema de conta que permitirá armazenar todos os seus mapas e análises."
    },
    {
      question: "Como fazer uma doação para o projeto?",
      answer: "Você pode fazer uma doação clicando no botão 'Fazer uma Doação' na página inicial. Aceitamos diversos métodos de pagamento e qualquer valor é muito apreciado para manter nosso projeto."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 page-transition">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-astro-purple/20 mb-4">
              <HelpCircle className="h-8 w-8 text-astro-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre astrologia e o Astro Hermetis
            </p>
          </div>
          
          <div className="mb-16">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
          
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-montserrat text-white mb-4">
              Não encontrou o que procurava?
            </h3>
            <p className="text-white/80 mb-6">
              Entre em contato conosco e responderemos suas dúvidas o mais rápido possível.
            </p>
            <a href="/contact" className="cosmic-button inline-block">
              Entre em Contato
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
