import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, Flame } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";

const meals = [
  { time: "Breakfast", name: "Oats with Berries & Nuts", cal: "320 kcal", done: true, items: ["½ cup oats", "1 cup almond milk", "Mixed berries", "5 almonds"] },
  { time: "Lunch", name: "Grilled Chicken Salad", cal: "450 kcal", done: false, items: ["150g chicken breast", "Mixed greens", "Olive oil dressing", "1 roti"] },
  { time: "Snack", name: "Green Smoothie", cal: "180 kcal", done: false, items: ["Spinach", "Banana", "Protein powder", "Water"] },
  { time: "Dinner", name: "Dal + Brown Rice + Sabzi", cal: "400 kcal", done: false, items: ["1 cup dal", "½ cup brown rice", "Seasonal sabzi", "Salad"] },
];

const DietModule = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    const next = new Set(completed);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setCompleted(next);
  };

  const compliance = Math.round((completed.size / meals.length) * 100);

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Today's Diet Plan</h1>
        </div>

        {/* Compliance */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Diet Compliance</span>
            <span className="text-sm font-bold text-primary">{compliance}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${compliance}%` }} />
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-3">
          {meals.map((meal, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-card">
              <div className="flex items-start gap-3">
                <button onClick={() => toggle(i)} className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${completed.has(i) ? "bg-success text-success-foreground" : "bg-muted"}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{meal.time}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Flame className="w-3 h-3" /> {meal.cal}
                    </div>
                  </div>
                  <h3 className={`font-medium text-sm mt-0.5 ${completed.has(i) ? "line-through text-muted-foreground" : "text-foreground"}`}>{meal.name}</h3>
                  <div className="mt-2 space-y-0.5">
                    {meal.items.map((item) => (
                      <p key={item} className="text-xs text-muted-foreground">• {item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MobileLayout>
      <BottomNav variant="paid" />
    </>
  );
};

export default DietModule;
