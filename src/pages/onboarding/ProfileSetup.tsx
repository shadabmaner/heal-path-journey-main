import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const genders = ["Male", "Female", "Other"];
const concerns = ["Diabetes", "Thyroid", "PCOS/PCOD", "Obesity", "Heart Health", "Other"];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [concern, setConcern] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="gradient-hero px-6 pt-12 pb-12 rounded-b-[2rem]">
        <button onClick={() => navigate(-1)} className="mb-4 text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">Setup Profile</h1>
        <p className="text-primary-foreground/80 mt-1 text-sm">Tell us about yourself</p>
      </div>

      <div className="flex-1 px-6 pt-8 pb-8 space-y-4">
        <div className="bg-card rounded-2xl p-6 shadow-card -mt-6 space-y-4">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input placeholder="Enter your name" className="mt-1 h-11 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">Age</label>
              <Input type="number" placeholder="Age" className="mt-1 h-11 rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">City</label>
              <Input placeholder="Your city" className="mt-1 h-11 rounded-xl" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Gender</label>
            <div className="flex gap-2 mt-1.5">
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    gender === g
                      ? "gradient-primary text-primary-foreground shadow-button"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Health Concern</label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {concerns.map((c) => (
                <button
                  key={c}
                  onClick={() => setConcern(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    concern === c
                      ? "gradient-primary text-primary-foreground shadow-button"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/welcome")}
          className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button border-0"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
