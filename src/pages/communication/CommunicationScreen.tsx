import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Send, PhoneOff, Mic, Volume2, Video, Phone, PhoneCall } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import { Input } from "@/components/ui/input";
import doctorMale from "@/assets/doctor-male.jpg";
import doctorFemale from "@/assets/doctor-female.jpg";
import doctorFemale2 from "@/assets/doctor-female-2.jpg";

type Tab = "chat" | "calls";
type View = "list" | "chatDetail" | "calling";

const chatList = [
  { name: "Dr. Sanjay Mehta", tag: "Doctor", lastMsg: "Your reports look great!", time: "2h ago", unread: 2, img: doctorMale },
  { name: "Care Advisor — Neha", tag: "Sales", lastMsg: "Welcome to RecoverWell!", time: "1d ago", unread: 0, img: doctorFemale },
  { name: "Diet Expert — Ritu", tag: "Nutritionist", lastMsg: "Try adding more fiber to breakfast", time: "2d ago", unread: 1, img: doctorFemale2 },
  { name: "Support Team", tag: "Support", lastMsg: "How can we help you today?", time: "3d ago", unread: 0, img: doctorFemale },
];

const callList = [
  { name: "Dr. Sanjay Mehta", tag: "Doctor", time: "Feb 15, 10:00 AM", duration: "12 min", type: "incoming" as const, img: doctorMale },
  { name: "Care Advisor — Neha", tag: "Sales", time: "Feb 12, 3:30 PM", duration: "5 min", type: "outgoing" as const, img: doctorFemale },
  { name: "Support Team", tag: "Support", time: "Feb 10, 11:00 AM", duration: "8 min", type: "missed" as const, img: doctorFemale2 },
];

const tagColors: Record<string, string> = {
  Doctor: "bg-primary/10 text-primary",
  Sales: "bg-warning/10 text-warning",
  Nutritionist: "bg-success/10 text-success",
  Support: "bg-accent/10 text-accent",
};

const mockMessages = [
  { from: "them", text: "Hi Rahul! Your latest blood reports look great. Your HbA1c has come down to 6.8%.", time: "10:00 AM" },
  { from: "them", text: "Keep following the diet plan. We'll review again next week.", time: "10:01 AM" },
  { from: "me", text: "Thank you Doctor! That's great news 🙏", time: "10:05 AM" },
  { from: "me", text: "Should I continue the same medication?", time: "10:05 AM" },
  { from: "them", text: "Yes, continue Metformin 500mg twice daily. No changes needed right now.", time: "10:08 AM" },
];

const CommunicationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedContact, setSelectedContact] = useState<typeof chatList[0] | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [callingContact, setCallingContact] = useState<typeof callList[0] | null>(null);

  if (currentView === "chatDetail" && selectedContact) {
    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col">
        <div className="px-4 pt-12 pb-4 flex items-center gap-3 border-b border-border bg-card">
          <button onClick={() => setCurrentView("list")} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
          <img src={selectedContact.img} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">{selectedContact.name}</p>
            <p className="text-[10px] text-primary">● Online</p>
          </div>
          <button onClick={() => { setCallingContact({ name: selectedContact.name, tag: selectedContact.tag, time: "", duration: "", type: "outgoing", img: selectedContact.img }); setCurrentView("calling"); }} className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
          {mockMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.from === "me" ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-card shadow-card text-foreground rounded-bl-md"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[9px] mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 bg-card border-t border-border flex items-center gap-2">
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 h-10 rounded-full bg-secondary border-0 px-4 text-sm text-foreground" />
          <button className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-button flex-shrink-0">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "calling" && callingContact) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
          <img src={callingContact.img} alt="" className="w-28 h-28 rounded-full object-cover shadow-elevated animate-pulse" />
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-foreground">{callingContact.name}</h2>
            <p className="text-primary text-sm mt-1 font-medium">Calling...</p>
          </div>
          <div className="flex items-center gap-6 mt-12">
            <button className="w-14 h-14 rounded-full bg-card shadow-card flex items-center justify-center"><Mic className="w-6 h-6 text-foreground" /></button>
            <button className="w-14 h-14 rounded-full bg-card shadow-card flex items-center justify-center"><Volume2 className="w-6 h-6 text-foreground" /></button>
            <button className="w-14 h-14 rounded-full bg-card shadow-card flex items-center justify-center"><Video className="w-6 h-6 text-foreground" /></button>
          </div>
          <button onClick={() => setCurrentView("list")} className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center mt-8 shadow-elevated">
            <PhoneOff className="w-7 h-7 text-destructive-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">Communication</h1>
        </div>

        <div className="flex bg-card rounded-2xl p-1 shadow-card mb-4">
          {([{ key: "chat" as Tab, label: "Chat", emoji: "💬" }, { key: "calls" as Tab, label: "Calls", emoji: "📞" }]).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"}`}>
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 h-10 rounded-xl bg-card border-border text-foreground shadow-card" />
        </div>

        {activeTab === "chat" && (
          <div className="space-y-2 animate-fade-in">
            {chatList.map((c, i) => (
              <button key={i} onClick={() => { setSelectedContact(c); setCurrentView("chatDetail"); }}
                className="w-full card-glossy rounded-2xl p-4 flex items-center gap-3 text-left">
                <img src={c.img} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground truncate">{c.name}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${tagColors[c.tag] || "bg-muted text-muted-foreground"}`}>{c.tag}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  {c.unread > 0 && <span className="w-5 h-5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{c.unread}</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "calls" && (
          <div className="space-y-2 animate-fade-in">
            {callList.map((c, i) => (
              <div key={i} className="card-glossy rounded-2xl p-4 flex items-center gap-3">
                <img src={c.img} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground truncate">{c.name}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${tagColors[c.tag] || "bg-muted text-muted-foreground"}`}>{c.tag}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{c.time} • {c.duration}</p>
                  <span className={`text-[9px] font-semibold ${c.type === "missed" ? "text-destructive" : c.type === "incoming" ? "text-primary" : "text-muted-foreground"}`}>
                    {c.type === "missed" ? "❌ Missed" : c.type === "incoming" ? "📥 Incoming" : "📤 Outgoing"}
                  </span>
                </div>
                <button onClick={() => { setCallingContact(c); setCurrentView("calling"); }} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 text-primary" />
                </button>
              </div>
            ))}
          </div>
        )}
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default CommunicationScreen;
