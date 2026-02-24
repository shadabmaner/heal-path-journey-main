import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SplashScreen from "./pages/onboarding/SplashScreen";
import LoginScreen from "./pages/onboarding/LoginScreen";
import OTPScreen from "./pages/onboarding/OTPScreen";
import ProfileSetup from "./pages/onboarding/ProfileSetup";
import WelcomeScreen from "./pages/onboarding/WelcomeScreen";
import FreeDashboard from "./pages/dashboard/FreeDashboard";
import PaidDashboard from "./pages/dashboard/PaidDashboard";
import WebinarList from "./pages/webinar/WebinarList";
import WebinarDetail from "./pages/webinar/WebinarDetail";
import HealthAssessment from "./pages/assessment/HealthAssessment";
import PaymentSuccess from "./pages/assessment/PaymentSuccess";
import PlanComparison from "./pages/plans/PlanComparison";
import BatchActivation from "./pages/plans/BatchActivation";
import ConsultationScreen from "./pages/consultation/ConsultationScreen";
import CommunicationScreen from "./pages/communication/CommunicationScreen";
import DietModule from "./pages/diet/DietModule";
import ExerciseModule from "./pages/exercise/ExerciseModule";
import ProgressDashboard from "./pages/progress/ProgressDashboard";
import CommunityFeed from "./pages/community/CommunityFeed";
import PaymentTracking from "./pages/payments/PaymentTracking";
import ProfileScreen from "./pages/profile/ProfileScreen";
import NotificationCenter from "./pages/notifications/NotificationCenter";
import TrackingScreen from "./pages/tracking/TrackingScreen";
import KnowledgeBase from "./pages/knowledge/KnowledgeBase";
import ObesityCourse from "./pages/course/ObesityCourse";
import MyProgram from "./pages/course/MyProgram";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/dashboard" element={<FreeDashboard />} />
          <Route path="/paid-dashboard" element={<PaidDashboard />} />
          <Route path="/webinars" element={<WebinarList />} />
          <Route path="/webinar/:id" element={<WebinarDetail />} />
          <Route path="/assessment" element={<HealthAssessment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/plans" element={<PlanComparison />} />
          <Route path="/batch-activation" element={<BatchActivation />} />
          <Route path="/consultation" element={<ConsultationScreen />} />
          <Route path="/communication" element={<CommunicationScreen />} />
          <Route path="/diet" element={<DietModule />} />
          <Route path="/exercise" element={<ExerciseModule />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/paid-community" element={<CommunityFeed />} />
          <Route path="/payments" element={<PaymentTracking />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/tracking" element={<TrackingScreen />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/course" element={<ObesityCourse />} />
          <Route path="/my-program" element={<MyProgram />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
