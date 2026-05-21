import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MouseGlow from "../components/home/MouseGlow";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import LearningGraphSection from "../components/home/LearningGraphSection";
import AnalyticsSection from "../components/home/AnalyticsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FinalCTASection from "../components/home/FinalCTASection";
import Footer from "../components/home/Footer";

type Props = {
  onGetStarted: () => void;
  onLogin: () => void;
};

export default function HomePage({ onGetStarted, onLogin }: Props) {
  const { enterDemoMode } = useAuth();
  const navigate = useNavigate();

  const scrollToDemo = () => {
    document.getElementById("graph")?.scrollIntoView({ behavior: "smooth" });
  };

  const launchDemo = () => {
    enterDemoMode();
    navigate("/app");
  };

  return (
    <div className="relative bg-[#030308] min-h-screen">
      <MouseGlow />
      <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:max-w-xs">
        <button
          type="button"
          onClick={launchDemo}
          className="w-full btn-premium py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg"
        >
          🚀 Launch Neuron Demo OS
        </button>
      </div>
      <Navbar onGetStarted={onGetStarted} onLogin={onLogin} />
      <main>
        <HeroSection onGetStarted={onGetStarted} onTryDemo={scrollToDemo} />
        <FeatureSection />
        <LearningGraphSection />
        <AnalyticsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FinalCTASection onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </div>
  );
}
