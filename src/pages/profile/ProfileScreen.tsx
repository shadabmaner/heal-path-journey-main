import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Bell, Shield, LogOut, ChevronRight, Globe, Headphones } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { useTheme } from "@/contexts/ThemeContext";

type Specialty = "obesity" | "diabetes" | "thyroid";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { activeSpecialty, setActiveSpecialty } = useTheme();

  const menuItems = [
    { label: "Notification Settings", path: "/notifications", emoji: "🔔" },
    { label: "Privacy Policy", path: "#", emoji: "🛡️" },
    { label: "Support", path: "#", emoji: "🎧" },
    { label: "Language", path: "#", extra: "English", emoji: "🌐" },
  ];

  const specialties: { key: Specialty; label: string; emoji: string }[] = [
    { key: "obesity", label: "Weight Loss / Obesity", emoji: "⚖️" },
    { key: "diabetes", label: "Diabetes", emoji: "🩸" },
    { key: "thyroid", label: "Thyroid", emoji: "🦋" },
  ];

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">Profile</h1>
        </div>

        {/* Patient Profile */}
        <div className="card-glossy rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-3xl text-primary-foreground font-bold shadow-button">R</div>
            <div className="flex-1">
              <h2 className="text-lg font-extrabold text-foreground">Rahul Patel</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span>👨 Male</span>
                <span>🎂 32 yrs</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3 text-primary" /> Mumbai
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">📱 +91 98XXX XXXXX</p>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="card-glossy rounded-2xl p-4 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-12 translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 text-xl shadow-button">👑</div>
              <div>
                <p className="text-foreground text-sm font-extrabold">Premium Care Plan</p>
                <p className="text-primary text-[10px] font-medium">Active Plan</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Batch ID", value: "RW-2026-0342" },
                { label: "Current Month", value: "1 of 12" },
                { label: "Start Date", value: "Feb 1, 2026" },
                { label: "End Date", value: "Jan 31, 2027" },
              ].map(item => (
                <div key={item.label} className="bg-secondary/50 rounded-xl p-2.5">
                  <p className="text-muted-foreground text-[9px] font-semibold">{item.label}</p>
                  <p className="text-foreground text-xs font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="card-glossy rounded-2xl overflow-hidden mb-4">
          {menuItems.map((item, i) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-secondary/30 transition-colors ${i < menuItems.length - 1 ? "border-b border-border" : ""}`}>
              <span className="text-lg">{item.emoji}</span>
              <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
              {item.extra && <span className="text-xs text-muted-foreground">{item.extra}</span>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Specialty Blocks */}
        <h3 className="font-extrabold text-foreground mb-3">🏥 Specialties</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {specialties.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSpecialty(s.key)}
              className={`p-4 rounded-2xl text-center transition-all border ${
                activeSpecialty === s.key ? "bg-primary/10 text-primary border-primary/20 shadow-card" : "bg-card border-border"
              }`}
            >
              <span className="text-2xl block mb-1">{s.emoji}</span>
              <p className="text-[10px] font-bold text-foreground leading-tight">{s.label}</p>
            </button>
          ))}
        </div>
        <div className="card-glossy rounded-2xl p-4 mb-4">
          <p className="text-xs text-muted-foreground">
            {activeSpecialty === "obesity" && "Dashboard shows weight tracking, BMI trends, calorie intake, and exercise metrics."}
            {activeSpecialty === "diabetes" && "Dashboard shows blood sugar tracking, HbA1c trends, insulin dosage, and glucose logs."}
            {activeSpecialty === "thyroid" && "Dashboard shows TSH/T3/T4 levels, medication compliance, and hormone trend analysis."}
          </p>
        </div>

        {/* Logout */}
        <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-2xl px-5 py-4">
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="text-sm font-bold text-destructive">Logout</span>
        </button>
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default ProfileScreen;
