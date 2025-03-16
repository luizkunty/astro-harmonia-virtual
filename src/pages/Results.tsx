
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AstroChart from '../components/AstroChart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as astroUtils from '../lib/astroUtils';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [birthData, setBirthData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('chart');
  const [interpretations, setInterpretations] = useState<any[]>([]);
  const [positions, setPositions] = useState<any>(null);
  const [houses, setHouses] = useState<any>(null);
  const [aspects, setAspects] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get data from sessionStorage
    const storedData = sessionStorage.getItem('birthData');
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBirthData(parsedData);
      
      try {
        // Calculate actual chart data using birth details
        const chartData = astroUtils.calculateChart({
          date: parsedData.date,
          time: parsedData.time,
          latitude: 0, // Temporarily hardcoded, should extract from location
          longitude: 0 // Temporarily hardcoded, should extract from location
        });
        
        setPositions(chartData.planets);
        setHouses(chartData.houses);
        setAspects(chartData.aspects);
        setInterpretations(astroUtils.getBasicInterpretation(chartData));
        
        toast({
          title: "Mapa calculado com sucesso",
          description: "Os dados astrológicos foram processados corretamente."
        });
      } catch (error) {
        console.error("Erro ao calcular o mapa astral:", error);
        toast({
          title: "Erro no cálculo",
          description: "Ocorreu um erro ao calcular seu mapa astral. Usando dados de exemplo.",
          variant: "destructive"
        });
        
        // Fallback to sample data
        setPositions(astroUtils.getPlanetPositions());
        setHouses(astroUtils.getHousePositions());
        setAspects(astroUtils.getAspects());
        setInterpretations(astroUtils.getBasicInterpretation());
      }
    } else {
      // If no data, redirect to home to input data
      toast({
        title: "Dados não encontrados",
        description: "Por favor, preencha seus dados de nascimento.",
        variant: "destructive"
      });
      navigate('/');
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  const tabs = [
    { id: 'chart', label: 'Mapa Astral' },
    { id: 'planets', label: 'Posições Planetárias' },
    { id: 'houses', label: 'Casas' },
    { id: 'aspects', label: 'Aspectos' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title mb-10 text-center">
              Seu Mapa Astral
            </h2>

            {/* Tabs */}
            <div className="flex overflow-x-auto no-scrollbar mb-8 pb-2">
              <div className="flex space-x-2 mx-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-lg font-montserrat transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-astro-purple text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="h-[400px] rounded-xl glass-panel flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-astro-gold border-t-transparent"></div>
                  <p className="mt-4 text-white/70">Calculando mapa astral...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chart View */}
                {activeTab === 'chart' && (
                  <div className="mb-12 animate-scale-in">
                    <AstroChart birthData={birthData} chartData={{ positions, houses, aspects }} />
                  </div>
                )}

                {/* Planets View */}
                {activeTab === 'planets' && (
                  <div className="glass-panel rounded-xl p-6 animate-scale-in">
                    <h3 className="text-xl font-montserrat text-white mb-6">
                      Posições Planetárias
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-3 text-left text-white font-montserrat">Planeta</th>
                            <th className="py-3 text-left text-white font-montserrat">Signo</th>
                            <th className="py-3 text-left text-white font-montserrat">Grau</th>
                            <th className="py-3 text-left text-white font-montserrat">Casa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {positions && Object.entries(positions).map(([planet, data]: [string, any]) => (
                            <tr key={planet} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 text-white/90 capitalize">{planet}</td>
                              <td className="py-3 text-white/90">{data.sign}</td>
                              <td className="py-3 text-white/90">{data.degree}°</td>
                              <td className="py-3 text-white/90">{data.house}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Houses View */}
                {activeTab === 'houses' && (
                  <div className="glass-panel rounded-xl p-6 animate-scale-in">
                    <h3 className="text-xl font-montserrat text-white mb-6">
                      Casas Astrológicas
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-3 text-left text-white font-montserrat">Casa</th>
                            <th className="py-3 text-left text-white font-montserrat">Signo na Cúspide</th>
                            <th className="py-3 text-left text-white font-montserrat">Grau</th>
                            <th className="py-3 text-left text-white font-montserrat">Planetas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {houses && Object.entries(houses).map(([houseNum, data]: [string, any]) => {
                            // Encontrar planetas nesta casa
                            const planetsInHouse = positions ? 
                              Object.entries(positions)
                                .filter(([_, planetData]: [string, any]) => planetData.house === Number(houseNum))
                                .map(([planet]: [string, any]) => planet)
                                .join(', ') : '';
                                
                            return (
                              <tr key={houseNum} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-3 text-white/90">Casa {houseNum}</td>
                                <td className="py-3 text-white/90">{data.sign}</td>
                                <td className="py-3 text-white/90">{data.degree}°</td>
                                <td className="py-3 text-white/90">{planetsInHouse}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Aspects View */}
                {activeTab === 'aspects' && (
                  <div className="glass-panel rounded-xl p-6 animate-scale-in">
                    <h3 className="text-xl font-montserrat text-white mb-6">
                      Aspectos Planetários
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-3 text-left text-white font-montserrat">Planeta 1</th>
                            <th className="py-3 text-left text-white font-montserrat">Aspecto</th>
                            <th className="py-3 text-left text-white font-montserrat">Planeta 2</th>
                            <th className="py-3 text-left text-white font-montserrat">Orbe</th>
                          </tr>
                        </thead>
                        <tbody>
                          {aspects && aspects.map((aspect: any, index: number) => (
                            <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 text-white/90 capitalize">{aspect.planets[0]}</td>
                              <td className="py-3 text-white/90">{aspect.aspect}</td>
                              <td className="py-3 text-white/90 capitalize">{aspect.planets[1]}</td>
                              <td className="py-3 text-white/90">{aspect.orb}°</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button className="cosmic-button-outline flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Salvar PDF</span>
              </button>
              <button className="cosmic-button-outline flex items-center space-x-2">
                <Copy className="h-4 w-4" />
                <span>Copiar Link</span>
              </button>
              <button className="cosmic-button-outline flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </button>
            </div>

            {/* Interpretations */}
            <section className="mt-16">
              <h3 className="text-2xl font-montserrat text-white mb-8">
                Interpretação do Mapa
              </h3>
              
              <div className="space-y-8">
                {interpretations.map((item, index) => (
                  <div key={index} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h4 className="text-xl font-montserrat text-astro-gold mb-3">
                      {item.title}
                    </h4>
                    <p className="text-white/80 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
