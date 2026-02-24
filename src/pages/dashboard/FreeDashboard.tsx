import { useNavigate } from "react-router-dom";
import { Bell, Video, ClipboardCheck, Pill, UtensilsCrossed, Dumbbell, Scale } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";

const FreeDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <MobileLayout>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Good Morning,</p>
            <h1 className="text-xl font-extrabold text-foreground">Rahul 👋</h1>
          </div>
          <button onClick={() => navigate("/notifications")} className="relative w-10 h-10 rounded-full glass neon-border flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
          </button>
        </div>

        <div className="card-glossy neon-border rounded-2xl p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <p className="text-lg mb-2">💡</p>
          <p className="text-sm text-foreground italic leading-relaxed">"The greatest wealth is health. Small steps lead to big changes."</p>
          <p className="text-xs text-muted-foreground mt-2">— Daily Motivation</p>
        </div>

        <div className="gradient-primary rounded-2xl p-5 shadow-neon mb-4">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="w-8 h-8 text-primary-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-primary-foreground">Take Full Health Assessment</h3>
              <p className="text-primary-foreground/80 text-xs mt-1">Get a personalized recovery plan crafted by our doctors</p>
              <Button onClick={() => navigate("/assessment")} className="mt-3 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-xl h-9 text-sm border border-primary-foreground/20">
                Start Assessment →
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Upcoming Webinars</h2>
            <button onClick={() => navigate("/webinars")} className="text-xs text-primary font-bold">View All</button>
          </div>
          <div className="card-glossy neon-border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-button">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-sm">Reversing Diabetes Naturally</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Tomorrow, 7:00 PM • Dr. Mehta</p>
            </div>
            <Button size="sm" onClick={() => navigate("/webinars")} className="gradient-primary text-primary-foreground rounded-xl text-xs h-8 border-0 shadow-button font-bold">Join</Button>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-bold text-foreground mb-3">Daily Tracking</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Pill, label: "Medication", value: "2/3 taken", color: "text-primary" },
              { icon: UtensilsCrossed, label: "Diet", value: "1 meal logged", color: "text-success" },
              { icon: Dumbbell, label: "Exercise", value: "15 min", color: "text-warning" },
              { icon: Scale, label: "Weight", value: "78 kg", color: "text-accent" },
            ].map((item) => (
              <div key={item.label} className="card-glossy neon-border rounded-2xl p-4">
                <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glossy neon-border rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-1">Health Community</h3>
          <p className="text-xs text-muted-foreground mb-3">Connect with others on the same journey</p>
          <Button variant="outline" onClick={() => navigate("/community")} className="rounded-xl h-9 text-sm w-full border-border text-foreground">
            Join Community →
          </Button>
        </div>
      </MobileLayout>
      <BottomNav variant="free" />
    </>
  );
};

export default FreeDashboard;
