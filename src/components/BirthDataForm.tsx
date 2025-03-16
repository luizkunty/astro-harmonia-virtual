
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, User } from 'lucide-react';

type BirthData = {
  name: string;
  date: string;
  time: string;
  location: string;
};

const BirthDataForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate and process the data
    // For now, we'll just navigate to the results page
    
    // Store the data in sessionStorage to access it on the results page
    sessionStorage.setItem('birthData', JSON.stringify(formData));
    
    // Navigate to results
    navigate('/results');
  };

  return (
    <div className="glass-card max-w-md w-full mx-auto rounded-xl p-6 animate-fade-in">
      <h3 className="text-xl font-montserrat text-white mb-6 font-semibold text-center">
        Insira seus dados de nascimento
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="cosmic-label flex items-center space-x-1">
            <User className="h-4 w-4 text-astro-silver" />
            <span>Nome</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            className="cosmic-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="date" className="cosmic-label flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-astro-silver" />
            <span>Data de Nascimento</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="cosmic-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="time" className="cosmic-label flex items-center space-x-1">
            <Clock className="h-4 w-4 text-astro-silver" />
            <span>Hora de Nascimento</span>
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="cosmic-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="cosmic-label flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-astro-silver" />
            <span>Local de Nascimento</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            placeholder="Cidade, País"
            value={formData.location}
            onChange={handleChange}
            className="cosmic-input w-full"
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-astro-purple to-astro-deep-blue text-white font-montserrat font-medium rounded-lg transition-all duration-300 hover:shadow-neon-purple flex items-center justify-center"
          >
            <Star className="h-4 w-4 mr-2" />
            <span>Revele seu Mapa Astral</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthDataForm;
