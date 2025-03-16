
import { useState } from 'react';
import { Search, Filter, Star, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const Interpretations = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sign: '',
    planet: '',
    house: '',
  });
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const signs = [
    'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
    'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
  ];
  
  const planets = [
    'Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte', 
    'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão'
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim() && !filters.sign && !filters.planet && !filters.house) {
      toast({
        title: "Busca vazia",
        description: "Por favor, insira um termo de busca ou selecione um filtro.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simular uma busca com resultado após um delay
    setTimeout(() => {
      // Resultados simulados baseados nos filtros
      const mockResults = [
        {
          id: 1,
          title: filters.planet ? `${filters.planet} em ${filters.sign || 'qualquer signo'}` : 
                 filters.sign ? `${filters.sign}` : 'Interpretação Geral',
          excerpt: 'Uma interpretação detalhada baseada na astrologia tradicional e moderna...',
          type: 'planet-sign',
          relevance: 98,
        },
        {
          id: 2,
          title: filters.house ? `Casa ${filters.house}` : 'Casas Astrológicas',
          excerpt: 'Entenda como as casas astrológicas influenciam diferentes áreas da sua vida...',
          type: 'house',
          relevance: 85,
        },
        {
          id: 3,
          title: 'Aspectos Planetários',
          excerpt: 'Os aspectos entre planetas revelam dinâmicas importantes no seu mapa astral...',
          type: 'aspects',
          relevance: 72,
        }
      ];
      
      setResults(mockResults);
      setIsSearching(false);
      
      toast({
        title: "Busca concluída",
        description: `Encontramos ${mockResults.length} resultados para sua busca.`,
      });
    }, 1500);
  };

  const clearFilters = () => {
    setFilters({
      sign: '',
      planet: '',
      house: '',
    });
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="section-title mb-4">
                Busca de Interpretações Astrológicas
              </h2>
              <p className="text-white/80 max-w-xl mx-auto">
                Encontre interpretações detalhadas sobre signos, planetas, casas astrológicas e muito mais.
              </p>
            </div>
            
            {/* Search Form */}
            <div className="glass-panel p-6 rounded-xl mb-10">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-astro-silver/60" />
                  </div>
                  <input
                    type="text"
                    placeholder="Busque por termos como 'ascendente', 'trânsitos', 'regente'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="cosmic-input pl-10 w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="sign" className="cosmic-label mb-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-astro-gold" />
                      <span>Signo</span>
                    </label>
                    <select
                      id="sign"
                      name="sign"
                      value={filters.sign}
                      onChange={handleFilterChange}
                      className="cosmic-input w-full"
                    >
                      <option value="">Todos os Signos</option>
                      {signs.map(sign => (
                        <option key={sign} value={sign}>{sign}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="planet" className="cosmic-label mb-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-astro-silver" />
                      <span>Planeta</span>
                    </label>
                    <select
                      id="planet"
                      name="planet"
                      value={filters.planet}
                      onChange={handleFilterChange}
                      className="cosmic-input w-full"
                    >
                      <option value="">Todos os Planetas</option>
                      {planets.map(planet => (
                        <option key={planet} value={planet}>{planet}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="house" className="cosmic-label mb-1 flex items-center space-x-1">
                      <BookOpen className="h-4 w-4 text-astro-emerald" />
                      <span>Casa</span>
                    </label>
                    <select
                      id="house"
                      name="house"
                      value={filters.house}
                      onChange={handleFilterChange}
                      className="cosmic-input w-full"
                    >
                      <option value="">Todas as Casas</option>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSearching}
                    className="bg-astro-purple hover:bg-astro-purple/90"
                  >
                    {isSearching ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Buscando...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        <span>Buscar</span>
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={clearFilters}
                    className="border-astro-silver/30 text-astro-silver hover:bg-astro-deep-blue/30"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Limpar Filtros</span>
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Search Results */}
            {results.length > 0 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-montserrat text-white mb-4">
                  Resultados da Busca
                </h3>
                
                {results.map((result) => (
                  <div key={result.id} className="glass-card p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-montserrat text-astro-gold">
                        {result.title}
                      </h4>
                      <span className="text-xs bg-astro-gold/20 text-astro-gold px-2 py-1 rounded-full">
                        {result.relevance}% relevante
                      </span>
                    </div>
                    <p className="text-white/80 mb-4">
                      {result.excerpt}
                    </p>
                    <Button 
                      variant="link" 
                      className="text-astro-silver p-0 h-auto hover:text-astro-gold"
                    >
                      Ler interpretação completa
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Empty State */}
            {results.length === 0 && !isSearching && (
              <div className="text-center py-10 text-white/60">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-astro-silver/40" />
                </div>
                <h3 className="text-lg font-montserrat mb-2">Nenhum resultado ainda</h3>
                <p>Use os filtros acima para encontrar interpretações astrológicas.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interpretations;
