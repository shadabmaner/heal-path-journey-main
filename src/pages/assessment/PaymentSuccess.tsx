import { useNavigate } from "react-router-dom";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-success" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
      <p className="text-muted-foreground text-sm text-center mt-2">Your health assessment has been submitted. Our doctor will review your case within 24 hours.</p>

      <div className="bg-card rounded-2xl p-5 shadow-card w-full mt-8">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Amount Paid</span><span className="font-semibold text-foreground">₹2,499</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Transaction ID</span><span className="font-medium text-foreground">#RW202602180045</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-foreground">Feb 16, 2026</span></div>
        </div>
        <Button variant="outline" className="w-full mt-4 rounded-xl h-9 text-sm">
          <Download className="w-4 h-4 mr-2" /> Download Invoice
        </Button>
      </div>

      <Button onClick={() => navigate("/plans")} className="w-full mt-6 h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button border-0">
        View Recovery Plans <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default PaymentSuccess;
