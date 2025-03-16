
import { useState } from 'react';
import { Search, Calendar, Star, Sun, Moon, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Academy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const articles = [
    {
      id: 1,
      title: 'Introdução à Astrologia: Conceitos Básicos',
      excerpt: 'Aprenda os fundamentos da astrologia, incluindo signos, planetas e casas astrológicas.',
      category: 'Fundamentos',
      date: '12 de maio de 2023',
      imageBg: 'bg-gradient-to-br from-astro-deep-blue to-astro-purple',
      icon: Sun
    },
    {
      id: 2,
      title: 'Os Doze Signos do Zodíaco: Características e Elementos',
      excerpt: 'Conheça em detalhes cada um dos doze signos zodiacais e suas características dominantes.',
      category: 'Signos',
      date: '3 de junho de 2023',
      imageBg: 'bg-gradient-to-br from-astro-purple to-astro-rose',
      icon: Moon
    },
    {
      id: 3,
      title: 'Planetas em Astrologia: Influências e Significados',
      excerpt: 'Entenda como cada planeta influencia diferentes aspectos da nossa personalidade e vida.',
      category: 'Planetas',
      date: '17 de julho de 2023',
      imageBg: 'bg-gradient-to-br from-astro-deep-blue to-astro-gold',
      icon: Globe
    },
    {
      id: 4,
      title: 'Casas Astrológicas: Os Domínios da Vida',
      excerpt: 'Descubra como as doze casas astrológicas representam diferentes áreas da nossa existência.',
      category: 'Casas',
      date: '5 de agosto de 2023',
      imageBg: 'bg-gradient-to-br from-astro-gold to-astro-emerald',
      icon: Star
    },
    {
      id: 5,
      title: 'Aspectos Planetários: Relações de Harmonia e Tensão',
      excerpt: 'Aprenda sobre conjunções, trígonos, quadraturas e outros aspectos entre planetas.',
      category: 'Aspectos',
      date: '29 de agosto de 2023',
      imageBg: 'bg-gradient-to-br from-astro-emerald to-astro-silver',
      icon: Calendar
    },
    {
      id: 6,
      title: 'Como Interpretar seu Mapa Astral',
      excerpt: 'Um guia completo para iniciantes sobre como ler e compreender um mapa astral.',
      category: 'Interpretação',
      date: '14 de setembro de 2023',
      imageBg: 'bg-gradient-to-br from-astro-rose to-astro-gold',
      icon: Star
    },
  ];

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['Todos', 'Fundamentos', 'Signos', 'Planetas', 'Casas', 'Aspectos', 'Interpretação'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title mb-8 text-center">
              Academia Astrológica
            </h2>
            
            <p className="text-white/80 text-center max-w-3xl mx-auto mb-12">
              Aprenda sobre astrologia com nossos artigos, tutoriais e guias completos. 
              Navegue pela nossa biblioteca de conhecimento astrológico.
            </p>

            {/* Search and Filter */}
            <div className="mb-12">
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por artigos, tópicos..."
                  className="cosmic-input w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      (category === 'Todos' && searchTerm === '') || 
                      (category !== 'Todos' && searchTerm === category)
                        ? 'bg-astro-purple text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                    onClick={() => setSearchTerm(category === 'Todos' ? '' : category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div key={article.id} className="glass-card rounded-xl overflow-hidden flex flex-col h-full animate-fade-in">
                  <div className={`h-40 ${article.imageBg} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <article.icon className="h-16 w-16 text-white/90" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3">
                      <span className="chip bg-astro-purple/30 text-white border-astro-purple/30">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-montserrat font-medium text-white mb-3">
                      {article.title}
                    </h3>
                    <p className="text-white/70 mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-white/50">{article.date}</span>
                      <button className="text-astro-gold font-medium hover:text-astro-gold/80 transition-colors">
                        Ler mais
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More content prompt */}
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <button className="cosmic-button">
                  Carregar mais artigos
                </button>
              </div>
            )}

            {/* No results */}
            {filteredArticles.length === 0 && (
              <div className="glass-card p-8 text-center animate-fade-in">
                <h3 className="text-xl font-montserrat text-white mb-4">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-white/70 mb-6">
                  Não encontramos artigos correspondentes à sua busca.
                </p>
                <button 
                  className="cosmic-button-outline"
                  onClick={() => setSearchTerm('')}
                >
                  Limpar busca
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Academy;
