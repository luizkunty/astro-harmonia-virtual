
import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd send this data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 page-transition">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-astro-purple/20 mb-4">
              <Mail className="h-8 w-8 text-astro-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
              Entre em Contato
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tem alguma dúvida, sugestão ou feedback? Estamos aqui para ajudar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-montserrat text-white mb-6">
                  Envie-nos uma mensagem
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="cosmic-label">Nome</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        className="cosmic-input w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="cosmic-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="cosmic-input w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="cosmic-label">Assunto</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="Assunto da mensagem"
                      value={formData.subject}
                      onChange={handleChange}
                      className="cosmic-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="cosmic-label">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Sua mensagem"
                      value={formData.message}
                      onChange={handleChange}
                      className="cosmic-input w-full resize-none"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="cosmic-button flex items-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      <span>Enviar Mensagem</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div>
              <div className="glass-card p-6 rounded-xl h-full">
                <h2 className="text-xl font-montserrat text-white mb-6">
                  Informações de Contato
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-astro-gold font-medium mb-2">Email</h3>
                    <p className="text-white">contato@astrohermetis.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-astro-gold font-medium mb-2">Redes Sociais</h3>
                    <div className="flex space-x-3">
                      <a href="#" className="text-white hover:text-astro-gold transition-colors">
                        Instagram
                      </a>
                      <a href="#" className="text-white hover:text-astro-gold transition-colors">
                        Twitter
                      </a>
                      <a href="#" className="text-white hover:text-astro-gold transition-colors">
                        Facebook
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-astro-gold font-medium mb-2">Horário de Atendimento</h3>
                    <p className="text-white">Segunda a Sexta, 9h às 18h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-astro-purple/30 mb-4">
              <MessageSquare className="h-6 w-6 text-astro-gold" />
            </div>
            <h3 className="text-xl font-montserrat text-white mb-4">
              FAQ
            </h3>
            <p className="text-white/80 mb-6">
              Confira nossa seção de perguntas frequentes, você pode encontrar a resposta que procura!
            </p>
            <a href="/faq" className="cosmic-button-outline inline-block">
              Ver Perguntas Frequentes
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
