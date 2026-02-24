import { useNavigate } from "react-router-dom";
import { Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Access free health webinars",
  "Track your daily health habits",
  "Join our health community",
  "Get personalized care plans",
];

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-button mb-6">
          <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
        </div>

        <h1 className="text-2xl font-extrabold text-foreground text-center">Welcome to RecoverWell! 🎉</h1>
        <p className="text-muted-foreground text-center mt-2 text-sm">Your journey to better health starts here</p>

        <div className="card-glossy rounded-2xl p-6 mt-8 w-full space-y-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{f}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => navigate("/dashboard")}
          className="w-full h-12 mt-8 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0"
        >
          Get Started <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
