
import { useEffect, useState } from 'react';

// This is a simplified chart display component
// In a real app, we would use a proper library to generate the actual chart

interface AstroChartProps {
  birthData?: {
    name: string;
    date: string;
    time: string;
    location: string;
  };
}

const AstroChart = ({ birthData }: AstroChartProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
          {/* Outer circle - Houses */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
          
          {/* Inner circle - Zodiac wheel */}
          <div className="absolute inset-8 border-2 border-white/30 rounded-full"></div>
          
          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-astro-gold rounded-full"></div>
          
          {/* House lines */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div 
              key={`house-${index}`}
              className="absolute top-1/2 left-1/2 h-[50%] w-0.5 bg-white/20 origin-bottom transform"
              style={{ transform: `translateX(-50%) rotate(${index * 30}deg)` }}
            ></div>
          ))}
          
          {/* Planetary positions (simplified) */}
          <div 
            className="absolute h-6 w-6 bg-astro-gold/80 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ top: '20%', left: '70%' }}
          >
            ☉
          </div>
          <div 
            className="absolute h-6 w-6 bg-astro-silver/80 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ top: '30%', left: '25%' }}
          >
            ☽
          </div>
          <div 
            className="absolute h-5 w-5 bg-astro-rose/80 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ top: '75%', left: '60%' }}
          >
            ♀
          </div>
          <div 
            className="absolute h-5 w-5 bg-astro-purple/80 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ top: '50%', left: '80%' }}
          >
            ♂
          </div>
          <div 
            className="absolute h-5 w-5 bg-astro-deep-blue/80 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ top: '65%', left: '35%' }}
          >
            ♃
          </div>
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
