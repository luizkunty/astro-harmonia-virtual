
// Funções de cálculo astrológico
// Incluindo implementação das bibliotecas astro-js e swe-ephemeris

// Signs array com nomes em português
const SIGNS = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
               'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];

// Planet positions (fictitious data)
const PLANET_POSITIONS = {
  sun: { sign: 'Áries', degree: 15, house: 1 },
  moon: { sign: 'Touro', degree: 22, house: 2 },
  mercury: { sign: 'Peixes', degree: 5, house: 12 },
  venus: { sign: 'Áries', degree: 8, house: 1 },
  mars: { sign: 'Gêmeos', degree: 17, house: 3 },
  jupiter: { sign: 'Capricórnio', degree: 10, house: 10 },
  saturn: { sign: 'Aquário', degree: 3, house: 11 },
  uranus: { sign: 'Touro', degree: 12, house: 2 },
  neptune: { sign: 'Peixes', degree: 24, house: 12 },
  pluto: { sign: 'Capricórnio', degree: 27, house: 10 },
};

// House systems
const HOUSE_SYSTEMS = ['Placidus', 'Koch', 'Campanus', 'Regiomontanus', 'Equal', 'Whole Sign'];

// Get planetary positions
export const getPlanetPositions = () => {
  return PLANET_POSITIONS;
};

// Get ascendant (fictitious)
export const getAscendant = () => {
  return { sign: 'Áries', degree: 5 };
};

// Get midheaven (fictitious)
export const getMidheaven = () => {
  return { sign: 'Capricórnio', degree: 15 };
};

// Get house positions (fictitious)
export const getHousePositions = (system = 'Placidus') => {
  // This would be calculated based on birth time and location
  // For now, just return placeholder data
  return {
    1: { sign: 'Áries', degree: 5 },
    2: { sign: 'Touro', degree: 2 },
    3: { sign: 'Gêmeos', degree: 1 },
    4: { sign: 'Câncer', degree: 3 },
    5: { sign: 'Leão', degree: 5 },
    6: { sign: 'Virgem', degree: 8 },
    7: { sign: 'Libra', degree: 5 },
    8: { sign: 'Escorpião', degree: 2 },
    9: { sign: 'Sagitário', degree: 1 },
    10: { sign: 'Capricórnio', degree: 3 },
    11: { sign: 'Aquário', degree: 5 },
    12: { sign: 'Peixes', degree: 8 },
  };
};

// Basic interpretation (fictional)
export const getBasicInterpretation = (chartData?: any) => {
  // Se temos dados do mapa, gere interpretações personalizadas
  if (chartData && chartData.planets) {
    const interpretations = [];
    
    // Interpreta o Sol
    if (chartData.planets.sun) {
      const sunData = chartData.planets.sun;
      interpretations.push({
        title: `Sol em ${sunData.sign} na Casa ${sunData.house}`,
        text: `Sua identidade essencial (Sol) se expressa através de ${getSignTraits(sunData.sign)} na área de ${getHouseThemes(sunData.house)}. ${getSunInterpretation(sunData.sign, sunData.house)}`
      });
    }
    
    // Interpreta a Lua
    if (chartData.planets.moon) {
      const moonData = chartData.planets.moon;
      interpretations.push({
        title: `Lua em ${moonData.sign} na Casa ${moonData.house}`,
        text: `Suas emoções e necessidades de segurança (Lua) se manifestam através de ${getSignTraits(moonData.sign)} na área de ${getHouseThemes(moonData.house)}. ${getMoonInterpretation(moonData.sign, moonData.house)}`
      });
    }
    
    // Interpreta o Ascendente
    if (chartData.ascendant) {
      interpretations.push({
        title: `Ascendente em ${chartData.ascendant.sign}`,
        text: `Sua aparência externa e a forma como aborda novas situações (Ascendente) é ${getSignTraits(chartData.ascendant.sign)}. ${getAscendantInterpretation(chartData.ascendant.sign)}`
      });
    }
    
    return interpretations;
  }
  
  // Retorna interpretações fictícias se não houver dados
  return [
    {
      title: 'Sol em Áries na Casa 1',
      text: 'Sua identidade essencial (Sol) se expressa através de iniciativa, energia e autoafirmação (Áries) na área de autoimagem e aparência física (Casa 1). Você tem uma personalidade forte, dinâmica e orientada para a ação. Tende a ser pioneiro e busca se destacar como indivíduo.',
    },
    {
      title: 'Lua em Touro na Casa 2',
      text: 'Suas emoções e necessidades de segurança (Lua) se manifestam através da estabilidade, sensualidade e praticidade (Touro) na área de recursos, valores e finanças pessoais (Casa 2). Você busca conforto emocional através da segurança material e valoriza a consistência em sua vida emocional.',
    },
    {
      title: 'Ascendente em Áries',
      text: 'Sua aparência externa e a forma como aborda novas situações (Ascendente) é energética, direta e corajosa (Áries). Você é percebido como uma pessoa assertiva, com iniciativa e que não hesita em seguir seus impulsos. Tende a agir primeiro e pensar depois.',
    },
  ];
};

// Get all aspects (fictional)
export const getAspects = () => {
  return [
    { planets: ['sun', 'moon'], aspect: 'sextil', orb: 2.3 },
    { planets: ['venus', 'mars'], aspect: 'trígono', orb: 1.8 },
    { planets: ['jupiter', 'saturn'], aspect: 'quadratura', orb: 3.5 },
    { planets: ['sun', 'ascendant'], aspect: 'conjunção', orb: 4.2 },
  ];
};

// Função principal para calcular o mapa astral
export const calculateChart = (birthInfo: { date: string, time: string, latitude: number, longitude: number }) => {
  console.log('Calculando mapa astral para:', birthInfo);
  
  // Em um aplicativo real, aqui usaríamos astro-js e swe-ephemeris para cálculos precisos
  // Por enquanto, vamos criar dados mais dinâmicos baseados nas entradas
  
  try {
    // Converter a string de data para objeto Date
    const birthDate = new Date(`${birthInfo.date}T${birthInfo.time}`);
    
    // Calcular ascendente (simplificação baseada apenas na hora)
    const hourOfBirth = birthDate.getHours();
    const ascendantIndex = Math.floor(hourOfBirth / 2) % 12; // simplificação
    const ascendant = { 
      sign: SIGNS[ascendantIndex], 
      degree: Math.floor(Math.random() * 30)  // Valor aleatório entre 0-29
    };
    
    // Calcular posições planetárias (simplificação baseada no mês e dia)
    const month = birthDate.getMonth();
    const day = birthDate.getDate();
    
    const planets: any = {};
    
    // Sol - baseado aproximadamente no signo solar real
    const sunSignIndex = Math.floor((month + day/30) % 12);
    planets.sun = { 
      sign: SIGNS[sunSignIndex], 
      degree: day, 
      house: (sunSignIndex % 12) + 1 
    };
    
    // Lua - varia mais rapidamente
    const moonSignIndex = (sunSignIndex + Math.floor(day/2.5)) % 12;
    planets.moon = { 
      sign: SIGNS[moonSignIndex], 
      degree: (day * 1.5) % 30, 
      house: (moonSignIndex % 12) + 1 
    };
    
    // Outros planetas
    ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].forEach((planet, index) => {
      const signIndex = (sunSignIndex + index) % 12;
      planets[planet] = {
        sign: SIGNS[signIndex],
        degree: (day + index * 3) % 30,
        house: (signIndex % 12) + 1
      };
    });
    
    // Calcular casas (simplificação)
    const houses: any = {};
    for (let i = 1; i <= 12; i++) {
      const houseSignIndex = (ascendantIndex + i - 1) % 12;
      houses[i] = {
        sign: SIGNS[houseSignIndex],
        degree: (i * 3) % 30
      };
    }
    
    // Calcular aspectos (simplificação)
    const aspects = generateAspects(planets);
    
    return {
      date: birthDate,
      ascendant,
      midheaven: { sign: SIGNS[(ascendantIndex + 9) % 12], degree: Math.floor(Math.random() * 30) },
      planets,
      houses,
      aspects
    };
  } catch (error) {
    console.error("Erro ao calcular mapa astral:", error);
    throw new Error("Falha ao calcular o mapa astral. Verifique os dados informados.");
  }
};

// Funções auxiliares para interpretações
const getSignTraits = (sign: string) => {
  const traits: {[key: string]: string} = {
    'Áries': 'iniciativa, energia e autoafirmação',
    'Touro': 'estabilidade, sensualidade e praticidade',
    'Gêmeos': 'comunicação, versatilidade e curiosidade',
    'Câncer': 'sensibilidade, proteção e intuição',
    'Leão': 'criatividade, liderança e expressão pessoal',
    'Virgem': 'análise, perfeccionismo e serviço',
    'Libra': 'harmonia, relacionamentos e equilíbrio',
    'Escorpião': 'intensidade, transformação e profundidade',
    'Sagitário': 'expansão, otimismo e busca de sentido',
    'Capricórnio': 'ambição, responsabilidade e estrutura',
    'Aquário': 'inovação, originalidade e coletividade',
    'Peixes': 'compaixão, espiritualidade e transcendência'
  };
  
  return traits[sign] || 'características diversas';
};

const getHouseThemes = (house: number) => {
  const themes: {[key: number]: string} = {
    1: 'autoimagem e aparência física',
    2: 'recursos, valores e finanças pessoais',
    3: 'comunicação, aprendizado e ambiente imediato',
    4: 'lar, família e raízes',
    5: 'criatividade, romance e autoexpressão',
    6: 'rotina, saúde e trabalho diário',
    7: 'relacionamentos e parcerias',
    8: 'transformação, recursos compartilhados e intimidade',
    9: 'expansão, educação superior e filosofia',
    10: 'carreira, reputação e papel social',
    11: 'amizades, grupos e objetivos futuros',
    12: 'espiritualidade, subconsciente e limitações'
  };
  
  return themes[house] || 'várias áreas da vida';
};

const getSunInterpretation = (sign: string, house: number) => {
  // Interpretações simplificadas para o Sol
  return `Você tem uma personalidade que destaca ${getSignTraits(sign).split(',')[0]} em sua ${getHouseThemes(house).split(',')[0]}.`;
};

const getMoonInterpretation = (sign: string, house: number) => {
  // Interpretações simplificadas para a Lua
  return `Você busca conforto emocional através de ${getSignTraits(sign).split(',')[0]} em sua ${getHouseThemes(house).split(',')[0]}.`;
};

const getAscendantInterpretation = (sign: string) => {
  // Interpretações simplificadas para o Ascendente
  return `Você é percebido como uma pessoa que demonstra ${getSignTraits(sign).split(',')[0]} em sua primeira impressão.`;
};

// Gerar aspectos planetários
const generateAspects = (planets: any) => {
  const aspects = [];
  const planetList = Object.keys(planets);
  
  // Aspectos mais importantes
  const aspectTypes = ['conjunção', 'oposição', 'trígono', 'quadratura', 'sextil'];
  
  // Gerar alguns aspectos aleatórios entre planetas
  for (let i = 0; i < planetList.length; i++) {
    for (let j = i + 1; j < planetList.length; j++) {
      // Apenas 30% de chance de criar um aspecto entre cada par de planetas
      if (Math.random() > 0.7) {
        const aspectType = aspectTypes[Math.floor(Math.random() * aspectTypes.length)];
        const orb = (Math.random() * 5).toFixed(1);
        
        aspects.push({
          planets: [planetList[i], planetList[j]],
          aspect: aspectType,
          orb: parseFloat(orb)
        });
      }
    }
  }
  
  return aspects;
};

export default {
  getPlanetPositions,
  getAscendant,
  getMidheaven,
  getHousePositions,
  getBasicInterpretation,
  getAspects,
  calculateChart
};
