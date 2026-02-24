import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import webinarThumb from "@/assets/webinar-thumb.jpg";

const WebinarDetail = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [pollAnswer, setPollAnswer] = useState<string | null>(null);

  if (showPoll) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="card-glossy neon-border rounded-2xl p-6 w-full max-w-sm">
          <h2 className="text-lg font-extrabold text-foreground text-center mb-2">📊 Quick Poll</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Are you interested in starting your recovery program?</p>
          <div className="space-y-3">
            <button onClick={() => setPollAnswer("yes")} className={`w-full p-4 rounded-xl text-sm font-bold transition-all ${pollAnswer === "yes" ? "gradient-primary text-primary-foreground shadow-button" : "bg-secondary text-secondary-foreground"}`}>✅ Yes, I'm interested!</button>
            <button onClick={() => setPollAnswer("no")} className={`w-full p-4 rounded-xl text-sm font-bold transition-all ${pollAnswer === "no" ? "bg-muted text-muted-foreground" : "bg-secondary text-secondary-foreground"}`}>Not right now</button>
          </div>
          {pollAnswer === "yes" && (
            <div className="mt-6 bg-primary/10 neon-border rounded-xl p-4 text-center">
              <p className="text-sm font-medium text-primary">🎉 Our Care Advisor will contact you soon!</p>
              <Button onClick={() => navigate("/assessment")} className="mt-3 gradient-primary text-primary-foreground rounded-xl h-10 w-full border-0 shadow-button text-sm font-bold">💬 Chat with Advisor</Button>
            </div>
          )}
          {pollAnswer === "no" && (
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="mt-4 w-full rounded-xl border-border text-foreground">Back to Dashboard</Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="relative">
        <img src={webinarThumb} alt="" className="w-full h-52 object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-5 w-9 h-9 rounded-xl glass neon-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <div className="card-glossy neon-border rounded-2xl p-5">
          <h1 className="text-lg font-extrabold text-foreground">🎙️ Reversing Diabetes Naturally</h1>
          <p className="text-xs text-muted-foreground mt-1 font-medium">By Dr. Sanjay Mehta</p>
          <div className="flex gap-4 mt-4 mb-4">
            <span className="text-xs text-muted-foreground font-medium">📆 Feb 18, 2026</span>
            <span className="text-xs text-muted-foreground font-medium">🕐 7:00 PM</span>
            <span className="text-xs text-muted-foreground font-medium">👥 234 joined</span>
          </div>
          <h3 className="font-bold text-foreground text-sm mb-2">About this Webinar</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Learn how lifestyle changes and proper medical guidance can help reverse Type 2 Diabetes. Dr. Mehta will share proven strategies and real patient stories.
          </p>
        </div>

        {registered && (
          <div className="card-glossy neon-border rounded-2xl p-5 mt-4 text-center">
            <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center mb-4">
              <Video className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">Webinar will start soon</p>
            <Button onClick={() => setShowPoll(true)} className="gradient-primary text-primary-foreground rounded-xl border-0 shadow-button w-full font-bold">📊 Show Poll →</Button>
          </div>
        )}

        <Button onClick={() => setRegistered(true)} className="w-full mt-4 h-12 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0 text-base">
          {registered ? "✅ Registered — Set Reminder" : "🎟️ Register for Free"}
        </Button>
      </div>
    </div>
  );
};

export default WebinarDetail;
