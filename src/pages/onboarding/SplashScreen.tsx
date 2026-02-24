import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Heart } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 backdrop-blur-sm">
          <img 
            src="/doctor-image.webp" 
            alt="Dr. Bhagesh Kulkarni" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Diabetes Free Forever</h1>
          <p className="text-primary text-sm font-semibold mt-3">by Dr. Bhagesh Kulkarni</p>
        </div>
      </div>

      <div className="absolute bottom-16 flex gap-2 z-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
