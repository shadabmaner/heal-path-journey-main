import { useNavigate } from "react-router-dom";
import { ArrowLeft, Stethoscope, Pill, Video, CreditCard, Award } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const notifications = [
  { icon: Pill, title: "Medication Reminder", desc: "Time to take Metformin 500mg", time: "Just now", color: "text-primary", bg: "bg-primary/10", unread: true },
  { icon: Stethoscope, title: "Consultation Confirmed", desc: "Dr. Mehta — Feb 22, 10:00 AM", time: "1h ago", color: "text-success", bg: "bg-success/10", unread: true },
  { icon: Video, title: "Webinar Starting Soon", desc: "Reversing Diabetes Naturally in 30 min", time: "2h ago", color: "text-accent", bg: "bg-accent/10", unread: false },
  { icon: CreditCard, title: "Payment Reminder", desc: "Installment of ₹8,333 due Feb 25", time: "1d ago", color: "text-warning", bg: "bg-warning/10", unread: false },
  { icon: Award, title: "Milestone Unlocked!", desc: "You completed your first week! 🎉", time: "2d ago", color: "text-warning", bg: "bg-warning/10", unread: false },
];

const NotificationCenter = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-xl font-extrabold text-foreground">🔔 Notifications</h1>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div key={i} className={`card-glossy neon-border rounded-2xl p-4 flex items-start gap-3 ${n.unread ? "border-l-4 border-l-primary" : ""}`}>
            <div className={`w-10 h-10 rounded-xl ${n.bg} flex items-center justify-center flex-shrink-0`}>
              <n.icon className={`w-5 h-5 ${n.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground">{n.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-glow" />}
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default NotificationCenter;
