import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Play, Clock, Flame } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";

const exercises = [
  { name: "Brisk Walking", duration: "20 min", cal: "150 kcal", type: "Cardio" },
  { name: "Stretching Routine", duration: "10 min", cal: "40 kcal", type: "Flexibility" },
  { name: "Breathing Exercises", duration: "5 min", cal: "15 kcal", type: "Wellness" },
  { name: "Bodyweight Squats", duration: "10 min", cal: "80 kcal", type: "Strength" },
];

const ExerciseModule = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(completed);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setCompleted(next);
  };

  const compliance = Math.round((completed.size / exercises.length) * 100);

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Today's Exercises</h1>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4 flex items-center gap-4">
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-foreground">45 min</p>
            <p className="text-[10px] text-muted-foreground">Total</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-foreground">285 kcal</p>
            <p className="text-[10px] text-muted-foreground">Burn</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-primary">{compliance}%</p>
            <p className="text-[10px] text-muted-foreground">Done</p>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-3">
          {exercises.map((ex, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <button onClick={() => toggle(i)} className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${completed.has(i) ? "bg-success text-success-foreground" : "bg-secondary"}`}>
                  {completed.has(i) ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-5 h-5 text-muted-foreground" />}
                </button>
                <div className="flex-1">
                  <h3 className={`font-medium text-sm ${completed.has(i) ? "line-through text-muted-foreground" : "text-foreground"}`}>{ex.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {ex.duration}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3" /> {ex.cal}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{ex.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity log */}
        <div className="mt-6">
          <h2 className="font-semibold text-foreground mb-3">Activity Log</h2>
          <div className="bg-card rounded-2xl p-4 shadow-card space-y-2">
            {["Feb 15 — 40 min — 250 kcal", "Feb 14 — 35 min — 220 kcal", "Feb 13 — 45 min — 290 kcal"].map((log) => (
              <div key={log} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </MobileLayout>
      <BottomNav variant="paid" />
    </>
  );
};

export default ExerciseModule;
