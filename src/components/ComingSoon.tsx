
import { AlertCircle } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
  className?: string;
}

const ComingSoon = ({ title, description, className = '' }: ComingSoonProps) => {
  return (
    <div className={`glass-card p-5 rounded-xl ${className}`}>
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
          <AlertCircle className="h-6 w-6 text-astro-gold" />
        </div>
        <h3 className="text-lg font-medium font-montserrat text-white mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-white/70">{description}</p>
        )}
        <div className="mt-4">
          <span className="chip bg-astro-purple/30 text-white border-astro-purple/30">
            Em desenvolvimento
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
