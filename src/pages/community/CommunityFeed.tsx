import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Image, Video, PenSquare, Plus } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MobileLayout from "@/components/layout/MobileLayout";
import communityImg from "@/assets/community-card.jpg";
import dietImg from "@/assets/diet-card.jpg";
import exerciseImg from "@/assets/exercise-card.jpg";
import doctorMale from "@/assets/doctor-male.jpg";

const posts = [
  { id: 1, user: "Priya M.", avatar: null, time: "2h ago", text: "Completed my first week without sugar! Feeling so much better already 💪", image: dietImg, likes: 24, comments: 8, badge: "Member" },
  { id: 2, user: "Dr. Mehta", avatar: doctorMale, time: "4h ago", text: "Tip: Adding 15 mins of walking after meals can significantly improve blood sugar control.", image: exerciseImg, likes: 89, comments: 15, badge: "Doctor" },
  { id: 3, user: "Amit K.", avatar: null, time: "6h ago", text: "Just got my lab results — HbA1c dropped from 8.2 to 7.1 in 30 days! This program works!", image: null, likes: 156, comments: 32, badge: "Member" },
  { id: 4, user: "RecoverWell Team", avatar: null, time: "1d ago", text: "Join our live community event this Saturday! 🎉", image: communityImg, likes: 200, comments: 45, badge: "Admin" },
];

const CommunityFeed = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showMyPosts, setShowMyPosts] = useState(false);

  const myPosts = posts.filter(post => post.user === "Priya M."); // Assuming current user is Priya M.

  const displayPosts = showMyPosts ? myPosts : posts;

  const toggleLike = (id: number) => {
    const next = new Set(liked);
    if (next.has(id)) next.delete(id); else next.add(id);
    setLiked(next);
  };

  return (
    <>
      <MobileLayout>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card shadow-card flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground flex-1">Community</h1>
          <button className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-button">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        <div className="flex bg-card rounded-2xl p-1 shadow-card mb-4">
          <button 
            onClick={() => setShowMyPosts(false)} 
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${!showMyPosts ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"}`}
          >
            📝 All Posts
          </button>
          <button 
            onClick={() => setShowMyPosts(true)} 
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${showMyPosts ? "gradient-primary text-primary-foreground shadow-button" : "text-muted-foreground"}`}
          >
            👤 My Posts
          </button>
        </div>

        <div className="card-glossy rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">RP</div>
            <div className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm text-muted-foreground">What's on your mind?</div>
          </div>
          <div className="flex gap-2 justify-around border-t border-border pt-3">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Image className="w-4 h-4 text-primary" /> Photo</button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Video className="w-4 h-4 text-accent" /> Video</button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><PenSquare className="w-4 h-4 text-warning" /> Text</button>
          </div>
        </div>

        <div className="space-y-4">
          {displayPosts.map((post) => (
            <div key={post.id} className="card-glossy rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                {post.avatar ? (
                  <img src={post.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    post.badge === "Admin" ? "gradient-warm text-warning-foreground" : "bg-secondary text-secondary-foreground"
                  }`}>{post.user.split(" ").map(w => w[0]).join("")}</div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{post.user}</span>
                    {post.badge !== "Member" && <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${post.badge === "Doctor" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>{post.badge}</span>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{post.time}</span>
                </div>
                <button className="text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>
              </div>

              {post.image && <div className="w-full aspect-square"><img src={post.image} alt="" className="w-full h-full object-cover" /></div>}

              <div className="px-4 py-3">
                <div className="flex items-center gap-5 mb-2">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 ${liked.has(post.id) ? "text-destructive" : "text-muted-foreground"}`}>
                    <Heart className={`w-5 h-5 ${liked.has(post.id) ? "fill-current" : ""}`} />
                  </button>
                  <button className="text-muted-foreground"><MessageCircle className="w-5 h-5" /></button>
                  <button className="text-muted-foreground"><Share2 className="w-5 h-5" /></button>
                </div>
                <p className="text-xs font-bold text-foreground">{post.likes + (liked.has(post.id) ? 1 : 0)} likes</p>
                <p className="text-sm text-foreground mt-1"><span className="font-bold">{post.user}</span> {post.text}</p>
                <button className="text-xs text-muted-foreground mt-1">View all {post.comments} comments</button>
              </div>
            </div>
          ))}
        </div>
      </MobileLayout>
      <BottomNav />
    </>
  );
};

export default CommunityFeed;
