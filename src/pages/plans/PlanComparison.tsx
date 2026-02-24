import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Star, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "standard",
    name: "Standard Care",
    price: "₹14,999",
    duration: "45 Days",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
    features: ["2 Doctor Consultations", "Basic Diet Plan", "Exercise Guide", "Community Access", "Email Support"],
  },
  {
    id: "premium",
    name: "Premium Care",
    price: "₹24,999",
    duration: "45 Days",
    icon: Star,
    color: "text-warning",
    bg: "bg-warning/10",
    popular: true,
    features: ["6 Doctor Consultations", "Personalized Diet Plan", "Video Exercise Guides", "Priority Support", "Batch Community", "Progress Tracking"],
  },
  {
    id: "special",
    name: "Special Care",
    price: "₹44,999",
    duration: "90 Days",
    icon: Crown,
    color: "text-accent",
    bg: "bg-accent/10",
    features: ["Unlimited Consultations", "Custom Diet + Recipes", "Personal Trainer", "24/7 Support", "VIP Community", "Lab Report Reviews", "Home Visit (1)"],
  },
];

const PlanComparison = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("premium");

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero px-6 pt-12 pb-10 rounded-b-[2rem]">
        <button onClick={() => navigate(-1)} className="mb-4 text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-primary-foreground">Doctor Reviewed Your Case</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Choose your recovery plan</p>
      </div>

      <div className="px-5 -mt-4 pb-8 space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`bg-card rounded-2xl p-5 shadow-card relative transition-all cursor-pointer ${
              selected === plan.id ? "ring-2 ring-primary" : ""
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2 right-4 px-3 py-0.5 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full">RECOMMENDED</span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${plan.bg} flex items-center justify-center`}>
                <plan.icon className={`w-5 h-5 ${plan.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground">{plan.duration}</p>
              </div>
              <span className="ml-auto text-lg font-bold text-foreground">{plan.price}</span>
            </div>
            <div className="space-y-1.5">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button onClick={() => navigate("/batch-activation")} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button border-0">
          Select {plans.find((p) => p.id === selected)?.name}
        </Button>
      </div>
    </div>
  );
};

export default PlanComparison;
