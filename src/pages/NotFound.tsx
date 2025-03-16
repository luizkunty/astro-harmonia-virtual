
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4">
          <div className="max-w-lg mx-auto text-center glass-card p-10 rounded-xl animate-fade-in">
            <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-astro-silver" />
            </div>
            
            <h1 className="text-4xl font-montserrat font-bold mb-4 text-white">404</h1>
            <p className="text-xl text-white/80 mb-8">
              Os astros não revelaram esta página...
            </p>
            
            <p className="text-white/60 mb-8">
              A página <span className="text-astro-gold font-mono">{location.pathname}</span> não foi encontrada.
            </p>
            
            <Link 
              to="/" 
              className="cosmic-button inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retornar ao Início</span>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
