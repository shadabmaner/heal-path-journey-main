import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import healthHero from "@/assets/health-hero.jpg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 px-6 pt-16 pb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-button">
          <Heart className="w-8 h-8 text-primary-foreground" fill="currentColor" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Enter your mobile number to continue</p>
      </div>

      <div className="relative z-10 px-6 mb-6">
        <img src={healthHero} alt="Healthcare" className="w-full h-36 object-cover rounded-2xl shadow-card" />
      </div>

      <div className="relative z-10 flex-1 px-6">
        <div className="card-glossy rounded-3xl p-6">
          <label className="text-sm font-bold text-foreground mb-2 block">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="+91 Enter your number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-11 h-12 text-base rounded-xl border-border bg-secondary/50 text-foreground"
            />
          </div>
          <Button
            onClick={() => navigate("/otp")}
            className="w-full h-12 mt-6 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0"
          >
            Get OTP <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-6 justify-center">
          <Shield className="w-4 h-4 text-primary" />
          <p className="text-xs text-muted-foreground font-medium">Your data is 100% secure with us</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
