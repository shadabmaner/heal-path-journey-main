import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Send, CheckCircle2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = "personal" | "physical" | "lifestyle" | "medical";

interface Question {
  id: string;
  category: Category;
  question: string;
  voicePrompt: string;
  type: "text" | "number" | "select" | "multiselect";
  options?: string[];
  placeholder?: string;
  unit?: string;
}

const questions: Question[] = [
  { id: "name", category: "personal", question: "What is your full name?", voicePrompt: "Hi there! Let's start with your name. What should I call you?", type: "text", placeholder: "e.g. Shadab Maneer" },
  { id: "age", category: "personal", question: "How old are you?", voicePrompt: "Great! And how old are you?", type: "number", placeholder: "e.g. 32", unit: "years" },
  { id: "gender", category: "personal", question: "What is your gender?", voicePrompt: "Could you tell me your gender?", type: "select", options: ["Male", "Female", "Other"] },
  { id: "city", category: "personal", question: "Which city do you live in?", voicePrompt: "And which city are you based in?", type: "text", placeholder: "e.g. Mumbai" },
  { id: "phone", category: "personal", question: "What's your mobile number?", voicePrompt: "Can I have your contact number please?", type: "text", placeholder: "+91 98XXX XXXXX" },
  { id: "height", category: "physical", question: "What is your height?", voicePrompt: "Now let's talk about your body. What's your height?", type: "number", placeholder: "e.g. 170", unit: "cm" },
  { id: "weight", category: "physical", question: "What is your current weight?", voicePrompt: "And your current weight?", type: "number", placeholder: "e.g. 85", unit: "kg" },
  { id: "targetWeight", category: "physical", question: "What is your target weight?", voicePrompt: "What weight would you like to achieve?", type: "number", placeholder: "e.g. 72", unit: "kg" },
  { id: "waist", category: "physical", question: "What is your waist circumference?", voicePrompt: "Do you know your waist measurement?", type: "number", placeholder: "e.g. 38", unit: "inches" },
  { id: "diet", category: "lifestyle", question: "What is your dietary preference?", voicePrompt: "Let's talk about your lifestyle. What kind of food do you prefer?", type: "select", options: ["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian"] },
  { id: "exercise", category: "lifestyle", question: "How often do you exercise?", voicePrompt: "How active are you physically?", type: "select", options: ["Never", "1-2 times/week", "3-4 times/week", "Daily"] },
  { id: "sleep", category: "lifestyle", question: "How many hours do you sleep?", voicePrompt: "And how many hours of sleep do you usually get?", type: "select", options: ["Less than 5", "5-6 hours", "7-8 hours", "More than 8"] },
  { id: "stress", category: "lifestyle", question: "How would you rate your stress level?", voicePrompt: "On a scale, how stressed do you feel day to day?", type: "select", options: ["Low", "Moderate", "High", "Very High"] },
  { id: "conditions", category: "medical", question: "Do you have any existing conditions?", voicePrompt: "Now for your medical background. Do you have any existing health conditions?", type: "multiselect", options: ["Diabetes", "Thyroid", "PCOS", "Hypertension", "Heart Disease", "None"] },
  { id: "medications", category: "medical", question: "Are you currently on any medications?", voicePrompt: "Are you taking any medications currently?", type: "text", placeholder: "e.g. Metformin 500mg" },
  { id: "allergies", category: "medical", question: "Do you have any allergies?", voicePrompt: "Any known allergies I should note down?", type: "text", placeholder: "e.g. Peanuts, Shellfish" },
  { id: "familyHistory", category: "medical", question: "Any family history of chronic diseases?", voicePrompt: "And lastly, does your family have a history of any chronic conditions?", type: "text", placeholder: "e.g. Father has diabetes" },
];

const categories: Category[] = ["personal", "physical", "lifestyle", "medical"];
const categoryLabels: Record<Category, { label: string; emoji: string }> = {
  personal: { label: "Personal", emoji: "👤" },
  physical: { label: "Physical", emoji: "📏" },
  lifestyle: { label: "Lifestyle", emoji: "🏃" },
  medical: { label: "Medical", emoji: "🏥" },
};

const HealthAssessment = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const currentCategory = q?.category;

  // Determine which categories are complete
  const getCategoryStatus = (cat: Category): "done" | "current" | "pending" => {
    const catQuestions = questions.filter(q => q.category === cat);
    const firstIndex = questions.indexOf(catQuestions[0]);
    const lastIndex = questions.indexOf(catQuestions[catQuestions.length - 1]);
    if (currentQ > lastIndex) return "done";
    if (currentQ >= firstIndex && currentQ <= lastIndex) return "current";
    return "pending";
  };

  useEffect(() => {
    setIsSpeaking(true);
    setSelectedOptions(new Set());
    setInputValue("");
    const timer = setTimeout(() => setIsSpeaking(false), 2000);
    return () => clearTimeout(timer);
  }, [currentQ]);

  useEffect(() => {
    if (!isSpeaking && inputRef.current && (q?.type === "text" || q?.type === "number")) {
      inputRef.current.focus();
    }
  }, [isSpeaking, q?.type]);

  const handleNext = () => {
    const value = q.type === "multiselect" ? Array.from(selectedOptions).join(", ") : inputValue;
    if (!value) return;
    setAnswers(prev => ({ ...prev, [q.id]: value }));
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else setShowSummary(true);
  };

  const handleSelectOption = (option: string) => {
    if (q.type === "multiselect") {
      const next = new Set(selectedOptions);
      if (next.has(option)) next.delete(option); else next.add(option);
      setSelectedOptions(next);
    } else {
      setInputValue(option);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        if (q.type === "select" && q.options) setInputValue(q.options[0]);
        else if (q.type === "multiselect" && q.options) setSelectedOptions(new Set([q.options[0]]));
        else setInputValue(q.placeholder?.replace("e.g. ", "") || "Sample answer");
        setIsListening(false);
      }, 2500);
    }
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="px-6 pt-12 pb-6">
          <button onClick={() => setShowSummary(false)} className="mb-4 text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-extrabold text-foreground">Assessment Complete! 🎉</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's your summary</p>
        </div>
        <div className="flex-1 px-6 pb-8 space-y-4 overflow-y-auto">
          {categories.map((cat) => {
            const catQuestions = questions.filter(q => q.category === cat);
            const catAnswers = catQuestions.filter(q => answers[q.id]);
            if (catAnswers.length === 0) return null;
            return (
              <div key={cat} className="card-glossy rounded-2xl p-4">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  {categoryLabels[cat].emoji} {categoryLabels[cat].label}
                </h3>
                <div className="space-y-2">
                  {catAnswers.map(q => (
                    <div key={q.id} className="flex justify-between items-start">
                      <span className="text-xs text-muted-foreground">{q.question}</span>
                      <span className="text-xs font-bold text-foreground text-right ml-3">{answers[q.id]}{q.unit ? ` ${q.unit}` : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <Button onClick={() => navigate("/payment-success")} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold shadow-button border-0 text-base">
            Submit & Continue ✨
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => currentQ > 0 ? setCurrentQ(currentQ - 1) : navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <span className="text-xs text-muted-foreground font-bold">{currentQ + 1}/{questions.length}</span>
        </div>

        {/* Wizard Steps */}
        <div className="flex items-center gap-1 mb-4">
          {categories.map((cat, i) => {
            const status = getCategoryStatus(cat);
            return (
              <div key={cat} className="flex items-center flex-1">
                <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold w-full justify-center transition-all ${
                  status === "done" ? "bg-primary/10 text-primary" :
                  status === "current" ? "gradient-primary text-primary-foreground shadow-button" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {status === "done" ? <Check className="w-3 h-3" /> : <span>{categoryLabels[cat].emoji}</span>}
                  <span className="hidden sm:inline">{categoryLabels[cat].label}</span>
                  <span className="sm:hidden">{categoryLabels[cat].label.slice(0, 4)}</span>
                </div>
                {i < categories.length - 1 && <div className={`w-2 h-0.5 mx-0.5 flex-shrink-0 ${status === "done" ? "bg-primary" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* AI Avatar */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-6 pb-4">
        <div className="relative mb-6">
          <div className={`w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-3xl shadow-button ${isSpeaking ? "animate-voice-pulse" : ""}`}>
            🤖
          </div>
          {isSpeaking && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute -inset-2 rounded-full border border-primary/10 animate-pulse" />
            </>
          )}
        </div>

        {isSpeaking && (
          <div className="flex items-center gap-1 mb-4">
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="w-1 bg-primary rounded-full animate-wave" style={{ animationDelay: `${i * 0.12}s`, height: '16px' }} />
            ))}
          </div>
        )}

        <div className="w-full card-glossy rounded-2xl p-5 mb-2">
          <p className="text-base font-bold text-foreground leading-relaxed text-center">{q.voicePrompt}</p>
        </div>
        <p className="text-xs text-muted-foreground text-center">{isSpeaking ? "🔊 AI is speaking..." : "Your turn to answer"}</p>
      </div>

      {/* Answer area */}
      <div className="flex-1 relative z-10 px-6 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{q.question}</span>
        </div>

        {(q.type === "text" || q.type === "number") && (
          <div className="relative">
            <Input ref={inputRef} type={q.type === "number" ? "number" : "text"} value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} placeholder={q.placeholder}
              className="h-14 rounded-2xl bg-card border-border text-base px-5 pr-16 text-foreground placeholder:text-muted-foreground shadow-card"
              onKeyDown={(e) => e.key === "Enter" && handleNext()} />
            {q.unit && <span className="absolute right-14 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{q.unit}</span>}
          </div>
        )}

        {q.type === "select" && q.options && (
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt) => (
              <button key={opt} onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl text-sm font-bold transition-all ${
                  inputValue === opt ? "gradient-primary text-primary-foreground shadow-button" : "card-glossy text-foreground hover:border-primary/30"
                }`}>{opt}</button>
            ))}
          </div>
        )}

        {q.type === "multiselect" && q.options && (
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt) => (
              <button key={opt} onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
                  selectedOptions.has(opt) ? "gradient-primary text-primary-foreground shadow-button" : "card-glossy text-foreground hover:border-primary/30"
                }`}>
                {selectedOptions.has(opt) && <CheckCircle2 className="w-4 h-4" />}
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 px-6 pb-8 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={toggleListening}
            className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              isListening ? "bg-destructive shadow-lg animate-pulse" : "bg-card shadow-card"
            }`}>
            {isListening ? <MicOff className="w-6 h-6 text-destructive-foreground" /> : <Mic className="w-6 h-6 text-primary" />}
          </button>
          <Button onClick={handleNext}
            disabled={q.type === "multiselect" ? selectedOptions.size === 0 : !inputValue}
            className="flex-1 h-14 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-button border-0 text-base disabled:opacity-30">
            {currentQ === questions.length - 1 ? "Finish" : "Continue"} <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
        {isListening && (
          <div className="flex items-center justify-center gap-1 mt-3">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-1 bg-destructive rounded-full animate-wave" style={{ animationDelay: `${i * 0.15}s`, height: '12px' }} />
            ))}
            <span className="text-xs text-destructive ml-2 font-semibold">Listening...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAssessment;
