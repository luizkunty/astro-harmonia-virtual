
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar, MessageSquare, Star } from 'lucide-react';
import BirthDataForm from '../components/BirthDataForm';
import ComingSoon from '../components/ComingSoon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  // Create star field
  const [stars, setStars] = useState<Array<{ size: number; top: string; left: string; delay: number }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const numStars = 100;
      
      for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 2 + 1;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const delay = Math.random() * 5;
        
        newStars.push({ size, top, left, delay });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Star field background */}
      <div className="star-field">
        {stars.map((star, index) => (
          <div
            key={index}
            className={`star stars-${star.size > 1.5 ? 'lg' : star.size > 1 ? 'md' : 'sm'}`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        ))}
      </div>

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-20 pt-8 pb-12 relative">
            <div className="absolute -top-10 -left-20 w-64 h-64 bg-astro-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-astro-deep-blue/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold mb-6 text-white animate-fade-in">
                Seu mapa astral interpretado por{' '}
                <span className="text-astro-gold">IA</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in">
                Sou Astro Hermetis, seu assistente astrológico. Conheça seu mapa astral e descubra 
                os segredos que os astros revelam sobre sua personalidade e destino.
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="mb-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="animate-slide-in-left">
                <h2 className="section-title mb-6">
                  Descubra Seu Mapa Astral
                </h2>
                
                <p className="text-white/80 mb-6">
                  Forneça seus dados de nascimento para gerar um mapa astral personalizado.
                  Quanto mais precisos os dados, mais acurada será a interpretação.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Posição dos planetas', 'Signos ascendente e descendente', 'Casas astrológicas', 'Aspectos e trânsitos'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-astro-gold mr-2">✦</span>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="animate-slide-in-right">
                <BirthDataForm />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="section-title text-center mb-12">
              Funcionalidades
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/results" className="feature-card animate-fade-in">
                <div className="h-12 w-12 rounded-full bg-astro-deep-blue/30 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-astro-gold" />
                </div>
                <h3 className="text-xl font-montserrat font-medium text-white mb-2">Mapa Astral</h3>
                <p className="text-white/70">
                  Visualize e interprete seu mapa astral completo com análises detalhadas.
                </p>
              </Link>
              
              <ComingSoon 
                title="Previsões"
                description="Análise astrológica para os próximos 12 meses baseada em trânsitos planetários."
                className="animate-fade-in"
              />
              
              <Link to="/academy" className="feature-card animate-fade-in">
                <div className="h-12 w-12 rounded-full bg-astro-deep-blue/30 flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-astro-emerald" />
                </div>
                <h3 className="text-xl font-montserrat font-medium text-white mb-2">Academia 🎓</h3>
                <p className="text-white/70">
                  Aprenda sobre astrologia com artigos e tutoriais detalhados.
                </p>
              </Link>
              
              <ComingSoon 
                title="Chat com Astro Hermetis"
                description="Converse com nossa IA astrológica e faça perguntas sobre seu mapa."
                className="animate-fade-in"
              />
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="section-title text-center mb-12">
              O que Dizem Sobre Nós
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "As interpretações do meu mapa astral foram surpreendentemente precisas!",
                  author: "Carlos M."
                },
                {
                  quote: "Nunca vi uma análise astrológica tão detalhada e acessível.",
                  author: "Ana Paula L."
                },
                {
                  quote: "A academia astrológica me ajudou a entender conceitos que sempre achei complexos.",
                  author: "Roberto F."
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-6 animate-fade-in">
                  <div className="flex flex-col h-full">
                    <div className="text-3xl text-astro-gold mb-4">"</div>
                    <p className="text-white/90 mb-6 flex-grow">
                      {testimonial.quote}
                    </p>
                    <div className="text-right">
                      <p className="text-astro-silver font-medium">— {testimonial.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
