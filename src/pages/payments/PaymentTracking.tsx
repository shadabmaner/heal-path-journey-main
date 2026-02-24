import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CreditCard, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";

const PaymentTracking = () => {
  const navigate = useNavigate();

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">💳 Payments</h1>
        </div>

        <div className="card-glossy neon-border rounded-2xl p-5 mb-4">
          <p className="text-muted-foreground text-sm">Total Program Cost</p>
          <p className="text-3xl font-extrabold text-foreground mt-1">₹24,999</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-muted-foreground text-xs">Paid</p>
              <p className="text-lg font-bold text-primary">₹10,833</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Pending</p>
              <p className="text-lg font-bold text-warning">₹14,166</p>
            </div>
          </div>
        </div>

        <div className="card-glossy rounded-2xl p-4 mb-4 flex items-center gap-3" style={{ borderColor: 'hsl(45 100% 55% / 0.2)', border: '1px solid' }}>
          <CreditCard className="w-6 h-6 text-warning" />
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Next Installment</p>
            <p className="text-xs text-muted-foreground">₹8,333 due Feb 25, 2026</p>
          </div>
          <Button size="sm" className="gradient-warm text-warning-foreground rounded-xl text-xs h-8 border-0 font-bold">Pay Now</Button>
        </div>

        <h2 className="font-bold text-foreground mb-3">Payment History</h2>
        <div className="space-y-3">
          {[
            { date: "Feb 16, 2026", amount: "₹2,499", desc: "Assessment Fee", status: "paid" },
            { date: "Feb 18, 2026", amount: "₹8,334", desc: "Plan — 1st Installment", status: "paid" },
            { date: "Feb 25, 2026", amount: "₹8,333", desc: "Plan — 2nd Installment", status: "pending" },
            { date: "Mar 05, 2026", amount: "₹5,833", desc: "Plan — Final Installment", status: "pending" },
          ].map((p, i) => (
            <div key={i} className="card-glossy neon-border rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${p.status === "paid" ? "bg-primary/10" : "bg-muted"}`}>
                {p.status === "paid" ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Clock className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{p.desc}</p>
                <p className="text-xs text-muted-foreground">{p.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{p.amount}</p>
                {p.status === "paid" && <button className="text-[10px] text-primary flex items-center gap-1 mt-0.5"><Download className="w-3 h-3" /> Invoice</button>}
              </div>
            </div>
          ))}
        </div>
      </MobileLayout>
      <BottomNav variant="paid" />
    </>
  );
};

export default PaymentTracking;
