import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Sparkles, Menu, X, GraduationCap, Scale, CreditCard, BookOpen, Calendar, ChevronRight } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import webinarThumb from "@/assets/webinar-thumb.jpg";
import consultationHero from "@/assets/consultation-hero.jpg";
import weightTrackingImg from "@/assets/weight-tracking.jpg";
import healthHero from "@/assets/health-hero.jpg";
import doctorMale from "@/assets/doctor-male.jpg";
import { useTheme } from "@/contexts/ThemeContext";
import throidDr from "@/assets/throid-dr.png";

const PaidDashboard = () => {
  const navigate = useNavigate();
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weight, setWeight] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { activeSpecialty } = useTheme();

  // Specialty-specific data
  const getSpecialtyData = () => {
    switch (activeSpecialty) {
      case 'obesity':
        return {
          todayPlan: [
            { emoji: "💊", label: "Medication", desc: "Orlistat 120mg — Before meals", time: "8:00 AM", path: "/tracking" },
            { emoji: "🥗", label: "Diet Plan", desc: "High-protein oats with nuts", time: "3 meals", path: "/tracking" },
            { emoji: "🏃", label: "Exercise", desc: "Cardio + Strength training", time: "6:00 PM", path: "/tracking" },
          ],
          progressStats: [
            { label: "Weight", value: "77.5 kg", change: "-0.5", emoji: "⚖️" },
            { label: "BMI", value: "24.2", change: "-0.3", emoji: "📊" },
            { label: "Calories", value: "1,850", change: "-150", emoji: "🔥" },
          ],
          weightLabel: "Today's Weight",
        };
      case 'diabetes':
        return {
          todayPlan: [
            { emoji: "💊", label: "Medication", desc: "Metformin 500mg — After Breakfast", time: "8:00 AM", path: "/tracking" },
            { emoji: "🥗", label: "Diet Plan", desc: "Low GI oats with nuts", time: "3 meals", path: "/tracking" },
            { emoji: "🏃", label: "Exercise", desc: "30 min brisk walk + stretching", time: "6:00 PM", path: "/tracking" },
          ],
          progressStats: [
            { label: "Glucose", value: "120 mg/dL", change: "-10", emoji: "🩸" },
            { label: "HbA1c", value: "6.8%", change: "-0.2", emoji: "📊" },
            { label: "Compliance", value: "85%", change: "+5", emoji: "✅" },
          ],
          weightLabel: "Today's Glucose",
        };
      case 'thyroid':
        return {
          todayPlan: [
            { emoji: "💊", label: "Medication", desc: "Levothyroxine 50mcg — Morning", time: "8:00 AM", path: "/tracking" },
            { emoji: "🥗", label: "Diet Plan", desc: "Iodine-rich meals", time: "3 meals", path: "/tracking" },
            { emoji: "🏃", label: "Exercise", desc: "Thyroid yoga + neck stretches", time: "6:00 PM", path: "/tracking" },
          ],
          progressStats: [
            { label: "TSH", value: "2.1 mIU/L", change: "-0.3", emoji: "🦋" },
            { label: "T3/T4", value: "Normal", change: "Stable", emoji: "📊" },
            { label: "Compliance", value: "92%", change: "+2", emoji: "✅" },
          ],
          weightLabel: "Today's TSH",
        };
      default:
        return {
          todayPlan: [],
          progressStats: [],
          weightLabel: "Today's Progress",
        };
    }
  };

  const specialtyData = getSpecialtyData();

  const drawerItems = [
    { icon: GraduationCap, label: "Obesity Course", path: "/course", emoji: "📚" },
    { icon: Calendar, label: "My Program", path: "/my-program", emoji: "📋" },
    { icon: Scale, label: "Weight Tracking", path: "/progress", emoji: "⚖️" },
    { icon: CreditCard, label: "Payment & Invoices", path: "/payments", emoji: "💳" },
    { icon: BookOpen, label: "Knowledge Base", path: "/knowledge", emoji: "📖" },
  ];

  return (
    <>
      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-card shadow-elevated animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-2xl text-primary-foreground font-bold shadow-button">R</div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">Rahul Patel</h3>
                  <p className="text-xs text-muted-foreground">Premium Care Plan</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              {drawerItems.map((item) => (
                <button key={item.label} onClick={() => { navigate(item.path); setDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-secondary/50 transition-colors">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <MobileLayout>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} className="w-10 h-10 rounded-xl bg-card shadow-card flex items-center justify-center">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <p className="text-xs text-muted-foreground font-medium">☀️ Good Morning</p>
              <h1 className="text-xl font-extrabold text-foreground">Hi, Rahul 👋</h1>
            </div>
          </div>
          <button onClick={() => navigate("/notifications")} className="relative w-10 h-10 rounded-xl bg-card shadow-card flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
          </button>
        </div>

        {/* Doctor's Quote */}
        <div className="card-glossy rounded-2xl p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-lg mb-2">💡</p>
              <p className="text-sm text-foreground italic leading-relaxed font-medium">"Health is not just about what you're eating. It's also about what you're thinking and saying."</p>
              <p className="text-xs text-muted-foreground mt-2 font-semibold">— {activeSpecialty === 'thyroid' ? 'Dr. Chandrashree Kulkarni' : 'Dr. Bhagyesh Kulkarni'}</p>
            </div>
            <img 
              src={activeSpecialty === 'thyroid' ? `${throidDr}` : "/doctor-image.webp"} 
              alt={activeSpecialty === 'thyroid' ? "Dr. Chandrashree Kulkarni" : "Dr. Bhagyesh Kulkarni"} 
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Progress Summary */}
        <div className="card-glossy rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <h3 className="font-bold text-foreground text-sm">Progress Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-semibold">Current {activeSpecialty === 'obesity' ? 'Weight' : activeSpecialty === 'diabetes' ? 'Glucose' : 'TSH'}</p>
              <p className="text-xl font-extrabold text-primary">{activeSpecialty === 'obesity' ? '77.5 kg' : activeSpecialty === 'diabetes' ? '120 mg/dL' : '2.1 mIU/L'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-semibold">Target {activeSpecialty === 'obesity' ? 'Weight' : activeSpecialty === 'diabetes' ? 'Glucose' : 'TSH'}</p>
              <p className="text-xl font-extrabold text-primary">{activeSpecialty === 'obesity' ? '72 kg' : activeSpecialty === 'diabetes' ? '110 mg/dL' : '0.5 mIU/L'}</p>
            </div>
          </div>
        </div>

        {/* Next Consultation with image */}
        <div className="rounded-2xl shadow-card mb-4 overflow-hidden bg-card">
          <img src={consultationHero} alt="Consultation" className="w-full h-32 object-cover" />
          <div className="p-4">
            <div className="flex items-center gap-3">
              <img src={doctorMale} alt="Dr. Sanjay" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-sm">Next Consultation</h3>
                <p className="text-muted-foreground text-xs mt-0.5 font-medium">Dr. Sanjay Mehta • Feb 22, 10 AM</p>
              </div>
            </div>
            <Button onClick={() => navigate("/consultation")} size="sm" className="mt-3 rounded-xl gradient-primary text-primary-foreground text-xs h-8 border-0 shadow-button font-bold">
              📋 View Details
            </Button>
          </div>
        </div>

        {/* Today's Plan */}
        <h2 className="font-extrabold text-foreground mb-3">📋 Today's Plan</h2>
        <div className="space-y-3 mb-4">
          {specialtyData.todayPlan.map((item, index) => (
            <div key={index} className="card-glossy rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        {/* Upcoming Webinar */}
        <h2 className="font-extrabold text-foreground mb-3">🎥 Upcoming Webinar</h2>
        <div className="card-glossy rounded-2xl p-4 mb-4">
          <div className="flex gap-3">
            <img src={webinarThumb} alt="Webinar" className="w-20 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Thyroid Health & Hormone Balance</p>
              <p className="text-xs text-muted-foreground">Dr. Bhagesh Kulkarni • Tomorrow, 6 PM</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">Live</span>
                <span className="text-xs text-muted-foreground">45 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress summary */}
        <button onClick={() => navigate("/progress")} className="w-full card-glossy rounded-2xl p-4 mb-4 text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">📊</span>
            <h3 className="font-bold text-foreground">Progress Summary</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {specialtyData.progressStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="text-base font-extrabold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">{s.label}</p>
                <p className="text-[10px] text-primary font-bold">{s.change}</p>
              </div>
            ))}
          </div>
        </button>

        {/* Upcoming Webinars */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-foreground">🎥 Upcoming Webinars</h2>
            <button onClick={() => navigate("/webinars")} className="text-xs text-primary font-bold">View All</button>
          </div>
          <div className="card-glossy rounded-2xl overflow-hidden">
            <img src={webinarThumb} alt="" className="w-full h-36 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-foreground text-sm">Reversing Diabetes Naturally</h3>
              <p className="text-xs text-muted-foreground mt-0.5">By Dr. Mehta • Tomorrow, 7:00 PM</p>
              <Button size="sm" onClick={() => navigate("/webinar/1")} className="gradient-primary text-primary-foreground rounded-xl text-xs h-8 border-0 shadow-button mt-2 font-bold">
                🎟️ Register for Free
              </Button>
            </div>
          </div>
        </div>

        {/* Payment alert */}
        <div className="rounded-2xl p-4 flex items-center gap-3 card-glossy">
          <span className="text-2xl">💳</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Installment Due</p>
            <p className="text-xs text-muted-foreground">₹8,333 due on Feb 25</p>
          </div>
          <Button onClick={() => navigate("/payments")} size="sm" className="gradient-warm text-warning-foreground rounded-xl text-xs h-8 border-0 font-bold">Pay</Button>
        </div>
      </MobileLayout>

      {/* Floating AI Button */}
      <button
        onClick={() => navigate("/assessment")}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full gradient-primary flex items-center justify-center floating-glow z-50 animate-pulse"
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </button>

      <BottomNav />
    </>
  );
};

export default PaidDashboard;
