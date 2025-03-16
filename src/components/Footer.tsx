
import { Calendar, Mail, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 pt-12 pb-6 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-astro-gold" />
              <h3 className="font-montserrat font-semibold text-xl text-white">Astro Hermetis</h3>
            </div>
            <p className="text-white/70 mb-4">
              Seu assistente astrológico de IA, oferecendo interpretações de mapa astral
              baseadas em astrologia tradicional e moderna.
            </p>
            <div className="mt-auto">
              <p className="text-white/50 text-sm">
                © {currentYear} Astro Hermetis. Todos os direitos reservados.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-lg text-white mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-astro-gold transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-white/70 hover:text-astro-gold transition-colors">
                  Resultados
                </Link>
              </li>
              <li>
                <Link to="/academy" className="text-white/70 hover:text-astro-gold transition-colors">
                  Academia
                </Link>
              </li>
              <li>
                <span className="text-white/50 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Previsões (Em breve)</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-lg text-white mb-4">
              Contato
            </h4>
            <div className="flex items-center space-x-2 text-white/70 mb-3">
              <Mail className="h-4 w-4 text-astro-purple" />
              <span>contato@astrohermetis.com</span>
            </div>
            <div className="mt-6">
              <h5 className="font-montserrat font-medium text-white/90 mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="cosmic-input rounded-r-none text-sm flex-1"
                />
                <button className="bg-astro-purple hover:bg-astro-purple/90 text-white font-medium py-2 px-4 rounded-r-lg transition-colors">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Astro Hermetis não é um substituto para aconselhamento profissional.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-astro-purple/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-astro-deep-blue/10 blur-3xl"></div>
    </footer>
  );
};

export default Footer;
