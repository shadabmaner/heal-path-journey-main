import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import doctorMale from "@/assets/doctor-male.jpg";
import doctorFemale from "@/assets/doctor-female.jpg";
import doctorFemale2 from "@/assets/doctor-female-2.jpg";

type Tab = "upcoming" | "completed";

const upcomingConsultations = [
  { doctor: "Dr. Sanjay Mehta", specialty: "Diabetologist", date: "Feb 22, 2026", time: "10:00 AM", mode: "online" as const, img: "male" },
  { doctor: "Dr. Priya Sharma", specialty: "Endocrinologist", date: "Feb 28, 2026", time: "3:00 PM", mode: "offline" as const, location: "Apollo Hospital, Mumbai", img: "female" },
];

const completedConsultations = [
  { doctor: "Dr. Priya Sharma", date: "Feb 10, 2026", time: "11:00 AM", type: "Consultation Call", summary: "Initial assessment completed. Started medication.", prescription: true, img: "female" },
  { doctor: "Dr. Sanjay Mehta", date: "Jan 28, 2026", time: "3:00 PM", type: "Follow-up Review", summary: "Adjusted diet plan. Blood sugar levels improving.", prescription: true, img: "male" },
  { doctor: "Dr. Anita Gupta", date: "Jan 15, 2026", time: "10:00 AM", type: "Consultation Call", summary: "Thyroid levels checked. No changes needed.", prescription: false, img: "female2" },
];

const imgMap: Record<string, string> = { male: doctorMale, female: doctorFemale, female2: doctorFemale2 };
const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "5:00 PM", "6:00 PM"];
const dates = ["Feb 22", "Feb 23", "Feb 24", "Feb 25"];

const ConsultationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [view, setView] = useState<"main" | "book" | "map">("main");
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [mapLocation, setMapLocation] = useState("");

  if (view === "map") {
    return (
      <>
        <div className="min-h-screen bg-background pb-24">
          <div className="px-6 pt-12 pb-6">
            <button onClick={() => setView("main")} className="mb-4 w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">📍 Clinic Location</h1>
          </div>
          <div className="px-6">
            <div className="card-glossy rounded-2xl overflow-hidden">
              <div className="w-full h-64 bg-muted flex items-center justify-center">
                <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`} className="w-full h-full border-0" title="Map" />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">📍 {mapLocation}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(mapLocation)}`} target="_blank" rel="noreferrer" className="text-xs text-primary font-semibold mt-2 flex items-center gap-1">
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </>
    );
  }

  if (view === "book") {
    return (
      <>
        <div className="min-h-screen bg-background pb-24">
          <div className="px-6 pt-12 pb-6">
            <button onClick={() => setView("main")} className="mb-4 w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">📅 Schedule Booking</h1>
          </div>
          <div className="px-6 space-y-4">
            <div className="card-glossy rounded-2xl p-1 flex">
              {(["online", "offline"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${mode === m ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"}`}>
                  {m === "online" ? "🎥" : "🏥"} {m === "online" ? "Online" : "In-clinic"}
                </button>
              ))}
            </div>
            <div className="card-glossy rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-3">📆 Select Date</h3>
              <div className="grid grid-cols-4 gap-2">
                {dates.map((d, i) => (
                  <button key={d} onClick={() => setSelectedDate(i)} className={`py-3 rounded-xl text-sm font-bold transition-all ${i === selectedDate ? "gradient-primary text-primary-foreground shadow-button" : "bg-secondary text-secondary-foreground"}`}>{d}</button>
                ))}
              </div>
            </div>
            <div className="card-glossy rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-3">🕐 Available Slots</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((t, i) => (
                  <button key={t} onClick={() => setSelectedTime(i)} className={`py-2.5 rounded-xl text-sm font-bold transition-all ${i === selectedTime ? "gradient-primary text-primary-foreground shadow-button" : "bg-secondary text-secondary-foreground"}`}>{t}</button>
                ))}
              </div>
            </div>
            <Button onClick={() => setView("main")} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0 text-base">
              ✅ Confirm Booking
            </Button>
          </div>
        </div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">Consultations</h1>
        </div>

        <Button onClick={() => setView("book")} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0 mb-4 text-base">
          📅 Schedule New Booking
        </Button>

        <div className="flex bg-card rounded-2xl p-1 shadow-card mb-4">
          {([{ key: "upcoming" as Tab, label: "Upcoming", emoji: "🗓️" }, { key: "completed" as Tab, label: "Completed", emoji: "✅" }]).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"}`}>
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "upcoming" && (
          <div className="space-y-3 animate-fade-in">
            {upcomingConsultations.map((c, i) => (
              <div key={i} className="card-glossy rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <img src={imgMap[c.img]} alt={c.doctor} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{c.doctor}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{c.specialty}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-muted-foreground">📆 {c.date}</span>
                      <span className="text-[10px] text-muted-foreground">🕐 {c.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {c.mode === "online" ? (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">🎥 Online</span>
                      ) : (
                        <button onClick={() => { setMapLocation(c.location!); setView("map"); }} className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          📍 {c.location} <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-3 animate-fade-in">
            {completedConsultations.map((c, i) => (
              <div key={i} className="card-glossy rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <img src={imgMap[c.img]} alt={c.doctor} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground">{c.doctor}</p>
                      <span className="text-[10px] text-muted-foreground">{c.date}</span>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold inline-block mt-1 ${c.type === "Follow-up Review" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"}`}>
                      {c.type === "Follow-up Review" ? "🔄" : "📞"} {c.type}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">{c.summary}</p>
                    {c.prescription && (
                      <Button size="sm" variant="outline" className="rounded-xl text-xs h-7 mt-2 font-semibold border-border text-foreground">📋 Download Prescription</Button>
                    )}
                  </div>
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

export default ConsultationScreen;
