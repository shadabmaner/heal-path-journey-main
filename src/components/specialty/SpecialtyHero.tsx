import { useTheme } from '@/contexts/ThemeContext';

interface SpecialtyHeroProps {
  className?: string;
}

const SpecialtyHero = ({ className = "" }: SpecialtyHeroProps) => {
  const { activeSpecialty } = useTheme();

  const getHeroImage = () => {
    switch (activeSpecialty) {
      case 'obesity':
        return {
          image: "/weight-loss-hero.jpg",
          alt: "Weight Loss Program",
          subtitle: "Transform your health with personalized nutrition and exercise plans"
        };
      case 'diabetes':
        return {
          image: "/diabetes-hero.jpg", 
          alt: "Diabetes Management",
          subtitle: "Monitor blood sugar, diet, and medication compliance"
        };
      case 'thyroid':
        return {
          image: "/thyroid-hero.jpg",
          alt: "Thyroid Care",
          subtitle: "Balance hormones and optimize thyroid function"
        };
      default:
        return {
          image: "/health-hero.jpg",
          alt: "Healthcare Management",
          subtitle: "Comprehensive health tracking and management"
        };
    }
  };

  const heroData = getHeroImage();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img 
        src={heroData.image} 
        alt={heroData.alt}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{heroData.alt}</h2>
          <p className="text-white/90 text-sm max-w-md">{heroData.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyHero;
