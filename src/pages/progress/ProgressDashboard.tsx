import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import weightTrackingImg from "@/assets/weight-tracking.jpg";
import healthHero from "@/assets/health-hero.jpg";
import consultationHero from "@/assets/consultation-hero.jpg";
import { useTheme } from "@/contexts/ThemeContext";

const ProgressDashboard = () => {
  const navigate = useNavigate();
  const { activeSpecialty } = useTheme();

  // Specialty-specific data
  const getSpecialtyData = () => {
    switch (activeSpecialty) {
      case 'obesity':
        return {
          weeklyData: [
            { day: "Mon", weight: 78.0 }, { day: "Tue", weight: 77.8 }, { day: "Wed", weight: 77.5 }, 
            { day: "Thu", weight: 77.6 }, { day: "Fri", weight: 77.2 }, { day: "Sat", weight: 77.0 }, { day: "Sun", weight: 76.8 },
          ],
          currentWeight: 76.8,
          targetWeight: 72,
          title: "Weight Progress",
          heroImage: weightTrackingImg,
          heroAlt: "Weight tracking",
          logButton: "Log Today's Weight",
          compliance: [
            { label: "Diet", value: 85, emoji: "🥗", color: "text-primary" },
            { label: "Exercise", value: 70, emoji: "🏃", color: "text-warning" },
            { label: "Medication", value: 95, emoji: "💊", color: "text-accent" },
          ],
        };
      case 'diabetes':
        return {
          weeklyData: [
            { day: "Mon", glucose: 120 }, { day: "Tue", glucose: 118 }, { day: "Wed", glucose: 125 }, 
            { day: "Thu", glucose: 122 }, { day: "Fri", glucose: 119 }, { day: "Sat", glucose: 121 }, { day: "Sun", glucose: 117 },
          ],
          currentWeight: 118,
          targetWeight: 110,
          title: "Glucose Progress",
          heroImage: healthHero,
          heroAlt: "Diabetes Management",
          logButton: "Log Today's Glucose",
          compliance: [
            { label: "Diet", value: 82, emoji: "🥗", color: "text-primary" },
            { label: "Exercise", value: 68, emoji: "🏃", color: "text-warning" },
            { label: "Medication", value: 90, emoji: "💊", color: "text-accent" },
          ],
        };
      case 'thyroid':
        return {
          weeklyData: [
            { day: "Mon", tsh: 2.1, t3: 4.2, t4: 1.8 }, { day: "Tue", tsh: 2.0, t3: 4.1, t4: 1.7 }, 
            { day: "Wed", tsh: 2.2, t3: 4.0, t4: 1.9 }, { day: "Thu", tsh: 2.3, t3: 4.1, t4: 2.0 }, 
            { day: "Fri", tsh: 2.4, t3: 4.2, t4: 2.1 }, { day: "Sat", tsh: 2.2, t3: 4.0, t4: 1.8 }, { day: "Sun", tsh: 2.1, t3: 3.9, t4: 1.7 },
          ],
          currentWeight: 2.1,
          targetWeight: 0.5,
          title: "Thyroid Progress",
          heroImage: "https://drchandrashreekulkarni.com/wp-content/uploads/2022/01/search-disease-pathology-thyroid-gland.png",
          heroAlt: "Thyroid gland pathology",
          logButton: "Log Thyroid Update",
          compliance: [
            { label: "Medication", value: 92, emoji: "💊", color: "text-primary" },
            { label: "Diet", value: 88, emoji: "🥗", color: "text-warning" },
            { label: "Lifestyle", value: 75, emoji: "🧘", color: "text-accent" },
          ],
        };
      default:
        return {
          weeklyData: [],
          currentWeight: 0,
          targetWeight: 0,
          title: "Progress",
          heroImage: healthHero,
          heroAlt: "Health Progress",
          logButton: "Log Progress",
          compliance: [],
        };
    }
  };

  const specialtyData = getSpecialtyData();
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weight, setWeight] = useState("");
  const maxW = Math.max(...specialtyData.weeklyData.map(d => d.weight || d.tsh || d.glucose));
  const minW = Math.min(...specialtyData.weeklyData.map(d => d.weight || d.tsh || d.glucose));

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">{specialtyData.title}</h1>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-4 shadow-card">
          <img 
            src={specialtyData.heroImage} 
            alt={specialtyData.heroAlt} 
            className="w-full h-32 object-cover"
            onError={(e) => {
              e.currentTarget.src = weightTrackingImg; // Fallback to default image
            }}
          />
        </div>

        <div className="card-glossy rounded-2xl p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -translate-y-10 translate-x-10" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs font-semibold">⚖️ Current {activeSpecialty === 'obesity' ? 'Weight' : activeSpecialty === 'diabetes' ? 'Glucose' : 'TSH'}</p>
                <p className="text-3xl font-extrabold text-foreground">{specialtyData.currentWeight}{activeSpecialty === 'obesity' ? ' kg' : activeSpecialty === 'diabetes' ? ' mg/dL' : ' mIU/L'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs font-semibold">🎯 Target</p>
              <p className="text-3xl font-extrabold text-primary">{specialtyData.targetWeight}{activeSpecialty === 'obesity' ? ' kg' : activeSpecialty === 'diabetes' ? ' mg/dL' : ' mIU/L'}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <p className="text-muted-foreground text-xs font-medium">{(specialtyData.currentWeight - specialtyData.targetWeight).toFixed(1)} {activeSpecialty === 'obesity' ? ' kg to go' : activeSpecialty === 'diabetes' ? ' mg/dL to reduce' : ' mIU/L to optimize'}</p>
          </div>
          <div className="mt-4">
            {!showWeightInput ? (
              <Button onClick={() => setShowWeightInput(true)} size="sm" className="rounded-xl gradient-primary text-primary-foreground border-0 shadow-button text-xs font-bold">
                {specialtyData.logButton}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Input 
                  type={activeSpecialty === 'diabetes' ? "number" : "number"} 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder={activeSpecialty === 'obesity' ? "kg" : activeSpecialty === 'diabetes' ? "mg/dL" : "mIU/L"} 
                  className="w-20 h-8 text-sm rounded-lg bg-secondary border-border text-foreground" 
                />
                <Button onClick={() => setShowWeightInput(false)} size="sm" className="rounded-lg gradient-primary text-primary-foreground border-0 text-xs h-8">✓</Button>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {specialtyData.compliance.map((c) => (
            <div key={c.label} className="card-glossy rounded-2xl p-4 text-center">
              <span className="text-2xl block mb-1">{c.emoji}</span>
              <p className={`text-2xl font-extrabold ${c.color}`}>{c.value}%</p>
              <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Trend */}
        <div className="card-glossy rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📈</span>
            <h3 className="font-bold text-foreground text-sm">{activeSpecialty === 'obesity' ? 'Weekly Trend' : activeSpecialty === 'diabetes' ? 'Glucose Trend' : 'TSH Trend'}</h3>
          </div>
          <div className="flex items-end gap-2 h-32">
            {specialtyData.weeklyData.map((d, i) => {
              const height = ((d.weight || d.tsh || d.glucose) - minW + 0.3) / (maxW - minW + 0.6) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground font-semibold">{d.weight || d.tsh || d.glucose}</span>
                  <div className="w-full rounded-t-lg gradient-primary transition-all" style={{ height: `${height}%` }} />
                  <span className="text-[9px] text-muted-foreground font-bold">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        <div className="card-glossy rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🏆</span>
            <h3 className="font-bold text-foreground text-sm">{activeSpecialty === 'obesity' ? 'Milestones' : 'Milestones'}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(activeSpecialty === 'obesity' ? [
              { label: "First Week", icon: "🏅", unlocked: true },
              { label: "5 Day Streak", icon: "🔥", unlocked: true },
              { label: "10 kg Total Loss", icon: "⚡", unlocked: true },
            ] : activeSpecialty === 'diabetes' ? [
              { label: "First Week", icon: "🏅", unlocked: true },
              { label: "5 Day Streak", icon: "🔥", unlocked: true },
              { label: "Glucose Controlled", icon: "💉", unlocked: true },
            ] : [
              { label: "First Week", icon: "🏅", unlocked: true },
              { label: "5 Day Streak", icon: "🔥", unlocked: true },
              { label: "TSH Optimized", icon: "🎯", unlocked: true },
            ]).map((m) => (
              <div key={m.label} className={`flex-1 text-center p-3 rounded-xl ${m.unlocked ? "bg-primary/10 border border-primary/20" : "bg-muted"}`}>
                <span className="text-2xl mb-1">{m.icon}</span>
                <p className="text-sm font-bold text-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default ProgressDashboard;
