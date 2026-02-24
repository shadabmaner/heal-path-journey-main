import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Video, ChevronDown, ChevronUp } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import doctorFemale from "@/assets/doctor-female.jpg";
import doctorMale from "@/assets/doctor-male.jpg";

type Protocol = "protocol1" | "protocol2" | "protocol3";

const protocolData: Record<Protocol, { label: string; days: number; description: string }> = {
  protocol1: { label: "Protocol 1 — Foundation", days: 30, description: "Initial assessment, baseline tracking, diet planning" },
  protocol2: { label: "Protocol 2 — Active Phase", days: 20, description: "Intensive tracking, exercise ramp-up, medication review" },
  protocol3: { label: "Protocol 3 — Maintenance", days: 30, description: "Sustained habits, monthly reviews, long-term planning" },
};

const daySchedules: Record<number, { time: string; action: string; assignedBy: string; mode: "online" | "offline"; img: string }[]> = {
  5: [
    { time: "10:00 AM", action: "Consultation Call", assignedBy: "Dr. Neha Sharma", mode: "online", img: "female" },
    { time: "2:00 PM", action: "Diet Plan Review", assignedBy: "Nutritionist Ritu", mode: "online", img: "female" },
  ],
  10: [
    { time: "11:00 AM", action: "Blood Test Review", assignedBy: "Dr. Sanjay Mehta", mode: "offline", img: "male" },
  ],
  15: [
    { time: "9:00 AM", action: "Follow-up Consultation", assignedBy: "Dr. Neha Sharma", mode: "online", img: "female" },
    { time: "4:00 PM", action: "Exercise Assessment", assignedBy: "Fitness Coach Amit", mode: "offline", img: "male" },
  ],
  20: [
    { time: "10:00 AM", action: "Progress Review", assignedBy: "Dr. Sanjay Mehta", mode: "online", img: "male" },
  ],
  25: [
    { time: "3:00 PM", action: "Monthly Assessment", assignedBy: "Dr. Neha Sharma", mode: "online", img: "female" },
  ],
};

const imgMap: Record<string, string> = { male: doctorMale, female: doctorFemale };

const MyProgram = () => {
  const navigate = useNavigate();
  const [activeProtocol, setActiveProtocol] = useState<Protocol>("protocol1");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const protocol = protocolData[activeProtocol];
  const daysArray = Array.from({ length: protocol.days }, (_, i) => i + 1);
  const scheduledDays = Object.keys(daySchedules).map(Number);

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">📋 My Program</h1>
        </div>

        {/* Program overview */}
        <div className="card-glossy rounded-2xl p-4 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <p className="text-xs text-muted-foreground font-semibold">12-Month Recovery Protocol</p>
            <h2 className="text-lg font-extrabold text-foreground mt-1">Batch RW-2026-0342</h2>
            <p className="text-xs text-muted-foreground mt-1">Month 1 of 12 • Feb 1 – Jan 31, 2027</p>
          </div>
        </div>

        {/* Protocol Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {(Object.keys(protocolData) as Protocol[]).map((key) => (
            <button key={key} onClick={() => { setActiveProtocol(key); setSelectedDay(null); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeProtocol === key ? "gradient-primary text-primary-foreground shadow-button" : "bg-card shadow-card text-foreground"
              }`}>
              {protocolData[key].label}
            </button>
          ))}
        </div>

        <div className="card-glossy rounded-2xl p-4 mb-4">
          <p className="text-xs text-muted-foreground">{protocol.description}</p>
          <p className="text-[10px] text-primary font-bold mt-1">{protocol.days} days</p>
        </div>

        {/* Calendar Grid */}
        <h3 className="font-bold text-foreground text-sm mb-3">📅 Schedule Calendar</h3>
        <div className="grid grid-cols-7 gap-1.5 mb-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-center text-[10px] font-bold text-muted-foreground py-1">{d}</div>
          ))}
          {/* Offset for starting day */}
          {[...Array(2)].map((_, i) => <div key={`empty-${i}`} />)}
          {daysArray.map((day) => {
            const hasSchedule = scheduledDays.includes(day);
            const isSelected = selectedDay === day;
            return (
              <button key={day} onClick={() => hasSchedule ? setSelectedDay(isSelected ? null : day) : null}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isSelected ? "gradient-primary text-primary-foreground shadow-button" :
                  hasSchedule ? "bg-primary/10 text-primary border border-primary/20" :
                  "bg-card text-foreground"
                }`}>
                {day}
              </button>
            );
          })}
        </div>

        {/* Day Schedule */}
        {selectedDay && daySchedules[selectedDay] && (
          <div className="space-y-3 animate-fade-in mb-4">
            <h3 className="font-bold text-foreground text-sm">Day {selectedDay} Schedule</h3>
            {daySchedules[selectedDay].map((item, i) => (
              <div key={i} className="card-glossy rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <img src={imgMap[item.img]} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{item.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">🕐 {item.time}</p>
                    <p className="text-[10px] text-muted-foreground">👤 Assigned by: {item.assignedBy}</p>
                    <div className="mt-2">
                      {item.mode === "online" ? (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold inline-flex items-center gap-1">
                          <Video className="w-3 h-3" /> Online
                        </span>
                      ) : (
                        <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Offline / In-Clinic
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedDay && !daySchedules[selectedDay] && (
          <div className="card-glossy rounded-2xl p-6 text-center mb-4">
            <p className="text-muted-foreground text-sm">No schedule for Day {selectedDay}</p>
          </div>
        )}
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default MyProgram;
