import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, FileText } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import dietImg from "@/assets/diet-card.jpg";
import exerciseImg from "@/assets/exercise-card.jpg";

type Tab = "recipes" | "videos" | "articles";

const recipes = [
  { title: "Low GI Breakfast Bowl", desc: "Oats, nuts, seeds & berries", image: dietImg, emoji: "🥣" },
  { title: "Diabetes-Friendly Lunch", desc: "Brown rice, dal & seasonal veggies", image: dietImg, emoji: "🍛" },
  { title: "High Protein Dinner", desc: "Grilled paneer with salad", image: dietImg, emoji: "🥗" },
];

const videos = [
  { title: "Morning Yoga for Beginners", duration: "15 min", image: exerciseImg, emoji: "🧘" },
  { title: "Understanding Blood Sugar", duration: "10 min", image: exerciseImg, emoji: "🩸" },
  { title: "Healthy Cooking Demo", duration: "20 min", image: dietImg, emoji: "👨‍🍳" },
];

const articles = [
  { title: "Understanding Diabetes Reversal", pages: "12 pages", type: "PDF", emoji: "📄" },
  { title: "Exercise Guidelines for Obesity", pages: "8 pages", type: "PDF", emoji: "📋" },
  { title: "Nutrition Basics", pages: "15 pages", type: "PDF", emoji: "📖" },
];

const KnowledgeBase = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("recipes");

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "recipes", label: "Recipes", emoji: "🍳" },
    { key: "videos", label: "Videos", emoji: "🎬" },
    { key: "articles", label: "Articles", emoji: "📚" },
  ];

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">📚 Knowledge Base</h1>
        </div>

        <div className="flex bg-card rounded-2xl p-1 shadow-card mb-4 neon-border">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"
              }`}>
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "recipes" && (
          <div className="space-y-3 animate-fade-in">
            {recipes.map((r, i) => (
              <div key={i} className="card-glossy neon-border rounded-2xl overflow-hidden flex">
                <img src={r.image} alt="" className="w-24 h-24 object-cover flex-shrink-0 opacity-70" />
                <div className="p-3 flex-1">
                  <p className="text-lg mb-1">{r.emoji}</p>
                  <h3 className="text-sm font-bold text-foreground">{r.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="space-y-3 animate-fade-in">
            {videos.map((v, i) => (
              <div key={i} className="card-glossy neon-border rounded-2xl overflow-hidden relative">
                <img src={v.image} alt="" className="w-full h-40 object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full glass neon-border flex items-center justify-center shadow-neon">
                    <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-foreground">{v.emoji} {v.title}</h3>
                  <p className="text-xs text-muted-foreground">⏱️ {v.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "articles" && (
          <div className="space-y-3 animate-fade-in">
            {articles.map((a, i) => (
              <div key={i} className="card-glossy neon-border rounded-2xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 text-2xl">{a.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{a.pages} • {a.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default KnowledgeBase;
