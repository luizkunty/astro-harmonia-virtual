
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, User, Star, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type BirthData = {
  name: string;
  date: string;
  time: string;
  location: string;
};

const BirthDataForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    location: '',
  });
  const [errors, setErrors] = useState<Partial<BirthData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher com dados anteriores se existirem
  useEffect(() => {
    const savedData = sessionStorage.getItem('birthData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error("Erro ao carregar dados salvos:", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpar erro quando o campo é editado
    if (errors[name as keyof BirthData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BirthData> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.date) {
      newErrors.date = 'Data de nascimento é obrigatória';
      isValid = false;
    }
    
    if (!formData.time) {
      newErrors.time = 'Hora de nascimento é obrigatória';
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Local de nascimento é obrigatório';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulando um processamento/cálculo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Armazenar os dados no sessionStorage
      sessionStorage.setItem('birthData', JSON.stringify(formData));
      
      // Notificar o usuário
      toast({
        title: "Mapa Astral preparado!",
        description: "Seus dados foram processados com sucesso.",
      });
      
      // Navegar para a página de resultados
      navigate('/results');
    } catch (error) {
      toast({
        title: "Erro ao processar dados",
        description: "Ocorreu um erro ao processar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {errors.name && <AlertCircle className="h-4 w-4 text-destructive ml-1" />}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            className={`cosmic-input w-full ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="date" className="cosmic-label flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-astro-silver" />
            <span>Data de Nascimento</span>
            {errors.date && <AlertCircle className="h-4 w-4 text-destructive ml-1" />}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className={`cosmic-input w-full ${errors.date ? 'border-destructive' : ''}`}
          />
          {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
        </div>
        
        <div>
          <label htmlFor="time" className="cosmic-label flex items-center space-x-1">
            <Clock className="h-4 w-4 text-astro-silver" />
            <span>Hora de Nascimento</span>
            {errors.time && <AlertCircle className="h-4 w-4 text-destructive ml-1" />}
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className={`cosmic-input w-full ${errors.time ? 'border-destructive' : ''}`}
          />
          {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
          <p className="text-xs text-astro-silver/70 mt-1">
            Se não souber a hora exata, use 12:00
          </p>
        </div>
        
        <div>
          <label htmlFor="location" className="cosmic-label flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-astro-silver" />
            <span>Local de Nascimento</span>
            {errors.location && <AlertCircle className="h-4 w-4 text-destructive ml-1" />}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            placeholder="Cidade, País"
            value={formData.location}
            onChange={handleChange}
            className={`cosmic-input w-full ${errors.location ? 'border-destructive' : ''}`}
          />
          {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-astro-purple to-astro-deep-blue text-white font-montserrat font-medium rounded-lg transition-all duration-300 hover:shadow-neon-purple flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-2" />
                <span>Revele seu Mapa Astral</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthDataForm;
