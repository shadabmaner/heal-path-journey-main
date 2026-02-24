import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import webinarThumb from "@/assets/webinar-thumb.jpg";

const webinars = [
  { id: 1, title: "Reversing Diabetes Naturally", doctor: "Dr. Sanjay Mehta", date: "Feb 18", time: "7:00 PM", live: false },
  { id: 2, title: "Thyroid Management & Diet", doctor: "Dr. Priya Sharma", date: "Feb 20", time: "6:30 PM", live: false },
  { id: 3, title: "PCOS Recovery Program", doctor: "Dr. Anita Gupta", date: "Today", time: "5:00 PM", live: true },
];

const WebinarList = () => {
  const navigate = useNavigate();

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">🎥 Webinars</h1>
        </div>

        <div className="space-y-3">
          {webinars.map((w) => (
            <div key={w.id} onClick={() => navigate(`/webinar/${w.id}`)} className="card-glossy neon-border rounded-2xl overflow-hidden">
              <img src={webinarThumb} alt="" className="w-full h-36 object-cover opacity-70" />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground text-sm flex-1">{w.title}</h3>
                  {w.live && <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[10px] font-bold rounded-full animate-pulse">🔴 LIVE</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">🧑‍⚕️ {w.doctor}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground">📆 {w.date}</span>
                  <span className="text-xs text-muted-foreground">🕐 {w.time}</span>
                </div>
                <Button className={`w-full mt-3 rounded-xl h-9 text-sm border-0 font-bold ${w.live ? "bg-destructive text-destructive-foreground" : "gradient-primary text-primary-foreground shadow-button"}`}>
                  {w.live ? "🔴 Join Now" : "🎟️ Register for Free"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </MobileLayout>
      <BottomNav variant="free" />
    </>
  );
};

export default WebinarList;
