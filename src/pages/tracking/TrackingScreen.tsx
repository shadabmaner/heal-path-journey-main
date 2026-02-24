import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

type Tab = "medication" | "diet" | "exercise";

const activePrescriptions = [
  { name: "Metformin 500mg", frequency: "Twice daily — After meals", type: "Tablet", emoji: "💊" },
  { name: "Vitamin D3 60K", frequency: "Once weekly — Morning", type: "Capsule", emoji: "🟡" },
  { name: "Omega-3 Fish Oil", frequency: "Once daily — After lunch", type: "Softgel", emoji: "🐟" },
];

const prescriptionHistory = [
  { date: "Feb 10, 2026", doctor: "Dr. Sanjay Mehta", items: [
    { name: "Metformin 500mg", frequency: "Twice daily", emoji: "💊" },
    { name: "Vitamin D3 60K", frequency: "Once weekly", emoji: "🟡" },
  ]},
  { date: "Jan 25, 2026", doctor: "Dr. Priya Sharma", items: [
    { name: "Metformin 250mg", frequency: "Once daily", emoji: "💊" },
    { name: "Calcium 500mg", frequency: "Once daily", emoji: "🦴" },
  ]},
];

const activeDiet = {
  startDate: "Feb 10, 2026", endDate: "Mar 10, 2026",
  meals: [
    { type: "Breakfast", time: "8:00 AM", items: "Oats with nuts, green tea, 1 boiled egg", followed: true, emoji: "🌅" },
    { type: "Lunch", time: "1:00 PM", items: "Brown rice, dal, sabzi, salad, curd", followed: true, emoji: "🍛" },
    { type: "Snack", time: "4:30 PM", items: "Fruits, handful of almonds", followed: false, emoji: "🍎" },
    { type: "Dinner", time: "7:30 PM", items: "Multigrain roti, paneer sabzi, soup", followed: false, emoji: "🍲" },
  ],
};

const dietHistory = [
  { period: "Jan 15 – Feb 9, 2026", meals: [
    { type: "Breakfast", items: "Poha, milk, fruit", emoji: "🌅" },
    { type: "Lunch", items: "Rice, sambar, vegetables", emoji: "🍛" },
    { type: "Dinner", items: "Chapati, dal, sabzi", emoji: "🍲" },
  ]},
];

const currentWorkout = [
  { name: "Brisk Walking", duration: "30 min", completed: true, emoji: "🚶" },
  { name: "Yoga Stretches", duration: "15 min", completed: false, emoji: "🧘" },
  { name: "Light Strength Training", duration: "20 min", completed: false, emoji: "💪" },
  { name: "Breathing Exercises", duration: "10 min", completed: true, emoji: "🌬️" },
];

const activityLog = [
  { date: "Feb 15", change: "Added strength training — 20 min", emoji: "💪" },
  { date: "Feb 10", change: "Program started — Walking + Yoga assigned", emoji: "🚀" },
  { date: "Feb 5", change: "Initial assessment — Basic stretches recommended", emoji: "📋" },
];

const TrackingScreen = () => {
  const navigate = useNavigate();
  const { activeSpecialty } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("medication");
  const [expandedHistory, setExpandedHistory] = useState<number | null>(null);
  const [expandedDietHistory, setExpandedDietHistory] = useState<number | null>(null);

  // Specialty-specific data
  const getSpecialtyData = () => {
    switch (activeSpecialty) {
      case 'obesity':
        return {
          activePrescriptions: [
            { name: "Orlistat 120mg", frequency: "Once daily — Before meals", type: "Capsule", emoji: "💊" },
            { name: "Multivitamin", frequency: "Once daily — After breakfast", type: "Tablet", emoji: "🟡" },
            { name: "Omega-3", frequency: "Once daily — After lunch", type: "Softgel", emoji: "🐟" },
          ],
          activeDiet: {
            startDate: "Feb 10, 2026", endDate: "Mar 10, 2026",
            meals: [
              { type: "Breakfast", time: "8:00 AM", items: "Protein oats with nuts, green tea", followed: true, emoji: "🌅" },
              { type: "Lunch", time: "1:00 PM", items: "Grilled chicken salad, quinoa", followed: true, emoji: "🍛" },
              { type: "Snack", time: "4:30 PM", items: "Greek yogurt with berries", followed: false, emoji: "🍎" },
              { type: "Dinner", time: "7:30 PM", items: "Grilled fish with steamed vegetables", followed: false, emoji: "🍲" },
            ],
          },
          currentWorkout: [
            { name: "Cardio Training", duration: "30 min", completed: true, emoji: "🏃" },
            { name: "Strength Training", duration: "45 min", completed: false, emoji: "💪" },
            { name: "HIIT Workout", duration: "20 min", completed: false, emoji: "🔥" },
            { name: "Cool Down Stretching", duration: "10 min", completed: true, emoji: "🧘" },
          ],
          activityLog: [
            { date: "Feb 15", change: "Added strength training — 45 min", emoji: "💪" },
            { date: "Feb 10", change: "Program started — Cardio + Strength", emoji: "🚀" },
            { date: "Feb 5", change: "Initial assessment — BMI calculated", emoji: "📋" },
          ],
        };
      case 'diabetes':
        return {
          activePrescriptions: [
            { name: "Metformin 500mg", frequency: "Twice daily — After meals", type: "Tablet", emoji: "💊" },
            { name: "Vitamin D3 60K", frequency: "Once weekly — Morning", type: "Capsule", emoji: "🟡" },
            { name: "Omega-3 Fish Oil", frequency: "Once daily — After lunch", type: "Softgel", emoji: "🐟" },
          ],
          activeDiet: {
            startDate: "Feb 10, 2026", endDate: "Mar 10, 2026",
            meals: [
              { type: "Breakfast", time: "8:00 AM", items: "Low GI oats with nuts, green tea", followed: true, emoji: "🌅" },
              { type: "Lunch", time: "1:00 PM", items: "Brown rice, dal, sabzi, salad", followed: true, emoji: "🍛" },
              { type: "Snack", time: "4:30 PM", items: "Fruits, handful of almonds", followed: false, emoji: "🍎" },
              { type: "Dinner", time: "7:30 PM", items: "Multigrain roti, paneer sabzi, soup", followed: false, emoji: "🍲" },
            ],
          },
          currentWorkout: [
            { name: "Brisk Walking", duration: "30 min", completed: true, emoji: "🚶" },
            { name: "Yoga Stretches", duration: "15 min", completed: false, emoji: "🧘" },
            { name: "Light Strength Training", duration: "20 min", completed: false, emoji: "💪" },
            { name: "Breathing Exercises", duration: "10 min", completed: true, emoji: "🌬️" },
          ],
          activityLog: [
            { date: "Feb 15", change: "Added strength training — 20 min", emoji: "💪" },
            { date: "Feb 10", change: "Program started — Walking + Yoga assigned", emoji: "🚀" },
            { date: "Feb 5", change: "Initial assessment — Basic stretches recommended", emoji: "📋" },
          ],
        };
      case 'thyroid':
        return {
          activePrescriptions: [
            { name: "Levothyroxine 50mcg", frequency: "Once daily — Morning empty stomach", type: "Tablet", emoji: "💊" },
            { name: "Vitamin D3 60K", frequency: "Once weekly — Morning", type: "Capsule", emoji: "🟡" },
            { name: "Selenium 100mcg", frequency: "Once daily — After breakfast", type: "Tablet", emoji: "🟢" },
          ],
          activeDiet: {
            startDate: "Feb 10, 2026", endDate: "Mar 10, 2026",
            meals: [
              { type: "Breakfast", time: "8:00 AM", items: "Iodine-rich oats with seaweed", followed: true, emoji: "🌅" },
              { type: "Lunch", time: "1:00 PM", items: "Selenium-rich fish with vegetables", followed: true, emoji: "🍛" },
              { type: "Snack", time: "4:30 PM", items: "Brazil nuts and pumpkin seeds", followed: false, emoji: "🍎" },
              { type: "Dinner", time: "7:30 PM", items: "Zinc-rich lean protein with greens", followed: false, emoji: "🍲" },
            ],
          },
          currentWorkout: [
            { name: "Thyroid Yoga", duration: "20 min", completed: true, emoji: "🧘" },
            { name: "Low Impact Cardio", duration: "25 min", completed: false, emoji: "🚶" },
            { name: "Neck Stretches", duration: "15 min", completed: false, emoji: "🦋" },
            { name: "Breathing Exercises", duration: "10 min", completed: true, emoji: "🌬️" },
          ],
          activityLog: [
            { date: "Feb 15", change: "Added neck stretches — 15 min", emoji: "🦋" },
            { date: "Feb 10", change: "Program started — Thyroid yoga assigned", emoji: "🚀" },
            { date: "Feb 5", change: "Initial assessment — TSH levels checked", emoji: "📋" },
          ],
        };
      default:
        return {
          activePrescriptions: [],
          activeDiet: { meals: [] },
          currentWorkout: [],
          activityLog: [],
        };
    }
  };

  const specialtyData = getSpecialtyData();

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "medication", label: "Medication", emoji: "💊" },
    { key: "diet", label: "Diet", emoji: "🥗" },
    { key: "exercise", label: "Exercise", emoji: "🏃" },
  ];

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">Daily Tracking</h1>
        </div>

        <div className="flex bg-card rounded-2xl p-1 shadow-card mb-4">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"
              }`}>
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "medication" && (
          <div className="space-y-4 animate-fade-in">
            <div className="card-glossy rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-foreground text-sm">Active Prescriptions</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">✅ Active</span>
              </div>
              <p className="text-[10px] text-muted-foreground mb-3 flex items-center gap-1">📆 Feb 10, 2026 • 🧑‍⚕️ Dr. {activeSpecialty === 'thyroid' ? 'Sharma' : activeSpecialty === 'obesity' ? 'Patel' : 'Mehta'}</p>
              <Button size="sm" variant="outline" className="rounded-xl text-xs h-8 font-semibold mb-4 border-border text-foreground">📋 View Prescription</Button>
              <div className="space-y-2">
                {specialtyData.activePrescriptions.map((med, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">{med.emoji}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{med.name}</p>
                      <p className="text-[10px] text-muted-foreground">🕐 {med.frequency}</p>
                    </div>
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{med.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glossy rounded-2xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-3">📜 Prescription History</h3>
              <div className="space-y-2">
                {prescriptionHistory.map((entry, i) => (
                  <div key={i} className="border border-border rounded-xl overflow-hidden">
                    <button onClick={() => setExpandedHistory(expandedHistory === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{entry.date}</p>
                        <p className="text-[10px] text-muted-foreground">🧑‍⚕️ {entry.doctor}</p>
                      </div>
                      {expandedHistory === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    {expandedHistory === i && (
                      <div className="px-3 pb-3 space-y-2 animate-fade-in">
                        {entry.items.map((med, j) => (
                          <div key={j} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg">
                            <span className="text-lg">{med.emoji}</span>
                            <div>
                              <p className="text-xs font-semibold text-foreground">{med.name}</p>
                              <p className="text-[10px] text-muted-foreground">{med.frequency}</p>
                            </div>
                          </div>
                        ))}
                        <Button size="sm" variant="outline" className="rounded-lg text-xs h-7 w-full font-semibold border-border text-foreground">📥 Download</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "diet" && (
          <div className="space-y-4 animate-fade-in">
            <div className="card-glossy rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-foreground text-sm">Active Diet Plan</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">✅ Active</span>
              </div>
              <p className="text-[10px] text-muted-foreground mb-3">📆 {specialtyData.activeDiet.startDate} — {specialtyData.activeDiet.endDate}</p>
              <div className="space-y-2">
                {specialtyData.activeDiet.meals.map((meal, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${meal.followed ? "bg-primary/10" : "bg-warning/10"}`}>{meal.emoji}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{meal.type}</p>
                      <p className="text-[10px] text-muted-foreground">{meal.items}</p>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${meal.followed ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glossy rounded-2xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-3">📜 Diet History</h3>
              <div className="space-y-2">
                {dietHistory.map((entry, i) => (
                  <div key={i} className="border border-border rounded-xl overflow-hidden">
                    <button onClick={() => setExpandedDietHistory(expandedDietHistory === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left">
                      <p className="text-sm font-semibold text-foreground">{entry.period}</p>
                      {expandedDietHistory === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    {expandedDietHistory === i && (
                      <div className="px-3 pb-3 space-y-2 animate-fade-in">
                        {entry.meals.map((meal, j) => (
                          <div key={j} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                            <span className="text-lg">{meal.emoji}</span>
                            <div>
                              <p className="text-xs font-semibold text-foreground">{meal.type}</p>
                              <p className="text-[10px] text-muted-foreground">{meal.items}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "exercise" && (
          <div className="space-y-4 animate-fade-in">
            <div className="card-glossy rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-foreground text-sm">Current Workout</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">✅ Active</span>
              </div>
              <div className="space-y-2 mt-3">
                {specialtyData.currentWorkout.map((w, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${w.completed ? "bg-primary/10" : "bg-warning/10"}`}>{w.emoji}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{w.name}</p>
                      <p className="text-[10px] text-muted-foreground">⏱️ {w.duration}</p>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${w.completed ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glossy rounded-2xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-3">📋 Activity Log</h3>
              <div className="space-y-2">
                {specialtyData.activityLog.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                    <span className="text-lg mt-0.5">{log.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{log.date}</p>
                      <p className="text-[10px] text-muted-foreground">{log.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default TrackingScreen;
