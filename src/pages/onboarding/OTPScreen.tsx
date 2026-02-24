import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OTPScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-12 pb-8">
        <button onClick={() => navigate(-1)} className="mb-4 w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-2xl font-extrabold text-foreground">Verify OTP 🔐</h1>
        <p className="text-muted-foreground mt-1 text-sm">Code sent to +91 98XXX XXXXX</p>
      </div>

      <div className="flex-1 px-6">
        <div className="card-glossy rounded-2xl p-6">
          <div className="flex gap-3 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-14 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-secondary text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Didn't receive? <button className="text-primary font-semibold">Resend</button>
          </p>
          <Button
            onClick={() => navigate("/profile-setup")}
            className="w-full h-12 mt-6 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0"
          >
            Verify & Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
