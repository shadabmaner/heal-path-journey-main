import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const BatchActivation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-elevated mb-6">
        <Sparkles className="w-8 h-8 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground text-center">Your Program is Ready!</h1>
      <p className="text-muted-foreground text-sm text-center mt-2">Welcome to Batch #RW-045</p>

      <div className="bg-card rounded-2xl p-6 shadow-card w-full mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Batch ID</span>
          <span className="font-semibold text-foreground">#RW-045</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Start Date</span>
          <span className="font-semibold text-foreground">Feb 20, 2026</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Duration</span>
          <span className="font-semibold text-foreground">45 Days</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">End Date</span>
          <span className="font-semibold text-foreground">Apr 05, 2026</span>
        </div>
      </div>

      {/* Mini calendar */}
      <div className="bg-card rounded-2xl p-4 shadow-card w-full mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">45-Day Timeline</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 45 }, (_, i) => (
            <div
              key={i}
              className={`w-full aspect-square rounded-lg text-[10px] flex items-center justify-center font-medium ${
                i === 0 ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => navigate("/paid-dashboard")} className="w-full mt-6 h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button border-0">
        Start Your Program <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default BatchActivation;
