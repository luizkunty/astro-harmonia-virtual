
import { useEffect, useState } from 'react';

interface ChartData {
  positions?: any;
  houses?: any;
  aspects?: any;
}

interface AstroChartProps {
  birthData?: {
    name: string;
    date: string;
    time: string;
    location: string;
  };
  chartData?: ChartData;
}

const AstroChart = ({ birthData, chartData }: AstroChartProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [planetSymbols, setPlanetSymbols] = useState<{[key: string]: string}>({
    sun: '☉', 
    moon: '☽', 
    mercury: '☿', 
    venus: '♀', 
    mars: '♂', 
    jupiter: '♃', 
    saturn: '♄', 
    uranus: '♅', 
    neptune: '♆', 
    pluto: '♇'
  });

  // Posições para renderização visual do gráfico
  const [planetPositions, setPlanetPositions] = useState<{[key: string]: {top: string, left: string}}>({});

  useEffect(() => {
    // Simular carregamento e cálculo das posições visuais dos planetas
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Calcular posições visuais aproximadas para cada planeta (simplificado)
      if (chartData?.positions) {
        const positions: {[key: string]: {top: string, left: string}} = {};
        
        Object.entries(chartData.positions).forEach(([planet, data]: [string, any]) => {
          // Cálculo simplificado baseado no signo e grau para posicionar visualmente
          const zodiacIndex = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
                              'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes']
                              .indexOf(data.sign);
          
          const angle = (zodiacIndex * 30) + (data.degree * (30/30)); // ângulo em graus
          const radius = 40 + (data.house * 2); // varia o raio baseado na casa
          
          // Converter ângulo para coordenadas x,y
          const x = 50 + (radius * Math.cos((angle - 90) * Math.PI / 180));
          const y = 50 + (radius * Math.sin((angle - 90) * Math.PI / 180));
          
          positions[planet] = {
            top: `${y}%`,
            left: `${x}%`
          };
        });
        
        setPlanetPositions(positions);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-xl glass-panel flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-astro-gold border-t-transparent"></div>
          <p className="mt-4 text-white/70">Calculando mapa astral...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="glass-panel rounded-xl p-8 flex flex-col items-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96 mb-8">
          {/* Círculo externo - Casas */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
          
          {/* Círculo interno - Roda do Zodíaco */}
          <div className="absolute inset-8 border-2 border-white/30 rounded-full"></div>
          
          {/* Ponto central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-astro-gold rounded-full"></div>
          
          {/* Linhas das casas */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div 
              key={`house-${index}`}
              className="absolute top-1/2 left-1/2 h-[50%] w-0.5 bg-white/20 origin-bottom transform"
              style={{ transform: `translateX(-50%) rotate(${index * 30}deg)` }}
            ></div>
          ))}
          
          {/* Símbolos dos signos no círculo do zodíaco */}
          {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((sign, index) => {
            const angle = index * 30;
            const radius = 44; // Posicionar os signos no círculo do meio
            const x = 50 + (radius * Math.cos((angle - 90) * Math.PI / 180));
            const y = 50 + (radius * Math.sin((angle - 90) * Math.PI / 180));
            
            return (
              <div 
                key={`sign-${index}`}
                className="absolute text-white/60 text-xs transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${y}%`, left: `${x}%` }}
              >
                {sign}
              </div>
            );
          })}
          
          {/* Posições planetárias */}
          {Object.entries(planetPositions).map(([planet, position]) => {
            const symbol = planetSymbols[planet] || '?';
            const color = 
              planet === 'sun' ? 'bg-astro-gold/80' :
              planet === 'moon' ? 'bg-astro-silver/80' :
              planet === 'venus' ? 'bg-astro-rose/80' :
              planet === 'mars' ? 'bg-astro-purple/80' :
              planet === 'jupiter' ? 'bg-astro-deep-blue/80' :
              'bg-white/70';
            
            return (
              <div 
                key={planet}
                className={`absolute h-6 w-6 ${color} rounded-full flex items-center justify-center text-xs font-bold transform -translate-x-1/2 -translate-y-1/2`}
                style={{ top: position.top, left: position.left }}
                title={`${planet} em ${chartData?.positions?.[planet]?.sign} (${chartData?.positions?.[planet]?.degree}°)`}
              >
                {symbol}
              </div>
            );
          })}
        </div>
        
        <h3 className="text-xl font-montserrat text-white mb-2">
          {birthData?.name || 'Seu Mapa Astral'}
        </h3>
        <p className="text-white/70">
          {birthData?.date && `Nascimento: ${new Date(birthData.date).toLocaleDateString('pt-BR')}`}
          {birthData?.time && ` às ${birthData.time}`}
        </p>
        <p className="text-white/70 mb-6">
          {birthData?.location || 'Local não especificado'}
        </p>
        
        <div className="flex space-x-3">
          <button className="cosmic-button-outline">
            Salvar
          </button>
          <button className="cosmic-button-secondary">
            Compartilhar
          </button>
        </div>
      </div>
      
      <div className="absolute -z-10 -inset-10 bg-astro-purple/5 blur-3xl rounded-full"></div>
    </div>
  );
};

export default AstroChart;
