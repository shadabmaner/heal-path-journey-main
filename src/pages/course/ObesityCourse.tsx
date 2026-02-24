import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Lock, CheckCircle2, ChevronDown, ChevronUp, Clock } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";

const courseModules = [
  { title: "Module 1: Understanding Obesity", emoji: "🧠", sessions: [
    { title: "What is Obesity?", duration: "12 min", type: "video", completed: true, locked: false },
    { title: "BMI & Body Composition", duration: "8 min", type: "video", completed: true, locked: false },
    { title: "Quiz: Module 1", duration: "5 min", type: "quiz", completed: false, locked: false },
  ]},
  { title: "Module 2: Nutrition Fundamentals", emoji: "🥗", sessions: [
    { title: "Macronutrients Explained", duration: "15 min", type: "video", completed: false, locked: false },
    { title: "Reading Food Labels", duration: "10 min", type: "video", completed: false, locked: false },
    { title: "Meal Planning Basics", duration: "18 min", type: "video", completed: false, locked: false },
    { title: "Quiz: Module 2", duration: "5 min", type: "quiz", completed: false, locked: true },
  ]},
  { title: "Module 3: Exercise for Weight Loss", emoji: "🏃", sessions: [
    { title: "Cardio vs. Strength Training", duration: "14 min", type: "video", completed: false, locked: true },
    { title: "Building a Workout Routine", duration: "12 min", type: "video", completed: false, locked: true },
    { title: "Yoga for Beginners", duration: "20 min", type: "video", completed: false, locked: true },
  ]},
  { title: "Module 4: Behavioral Change", emoji: "🧘", sessions: [
    { title: "Mindful Eating", duration: "10 min", type: "video", completed: false, locked: true },
    { title: "Stress Management", duration: "15 min", type: "video", completed: false, locked: true },
    { title: "Sleep & Weight", duration: "8 min", type: "video", completed: false, locked: true },
  ]},
];

const ObesityCourse = () => {
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState<number>(0);

  const totalSessions = courseModules.reduce((acc, m) => acc + m.sessions.length, 0);
  const completedSessions = courseModules.reduce((acc, m) => acc + m.sessions.filter(s => s.completed).length, 0);
  const progress = Math.round((completedSessions / totalSessions) * 100);

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">📚 Obesity Course</h1>
        </div>

        <div className="card-glossy neon-border rounded-2xl p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <p className="text-muted-foreground text-xs font-semibold">📚 Obesity Reversal Program</p>
            <h2 className="text-lg font-extrabold text-foreground mt-1">Complete Course</h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1">
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <span className="text-primary text-xs font-bold">{progress}%</span>
            </div>
            <p className="text-muted-foreground text-[10px] mt-1">{completedSessions} of {totalSessions} sessions completed</p>
          </div>
        </div>

        <div className="space-y-3">
          {courseModules.map((module, mi) => (
            <div key={mi} className="card-glossy neon-border rounded-2xl overflow-hidden">
              <button onClick={() => setExpandedModule(expandedModule === mi ? -1 : mi)} className="w-full flex items-center gap-3 p-4 text-left">
                <span className="text-2xl">{module.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{module.title}</p>
                  <p className="text-[10px] text-muted-foreground">{module.sessions.length} sessions</p>
                </div>
                {expandedModule === mi ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {expandedModule === mi && (
                <div className="px-4 pb-4 space-y-2 animate-fade-in">
                  {module.sessions.map((session, si) => (
                    <div key={si} className={`flex items-center gap-3 p-3 rounded-xl ${session.locked ? "bg-muted/30 opacity-50" : "bg-secondary/50"}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        session.completed ? "bg-primary/10" : session.locked ? "bg-muted" : "bg-primary/10"
                      }`}>
                        {session.completed ? <CheckCircle2 className="w-4 h-4 text-primary" /> : session.locked ? <Lock className="w-4 h-4 text-muted-foreground" /> : <Play className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">{session.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {session.duration}</span>
                          <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{session.type === "quiz" ? "📝 Quiz" : "🎬 Video"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default ObesityCourse;
