import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RippleButton from "./RippleButton";

type Props = {
  onGetStarted: () => void;
  onLogin: () => void;
};

const links = [
  { label: "Features", href: "#features" },
  { label: "Learning Graph", href: "#graph" },
  { label: "Analytics", href: "#analytics" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar({ onGetStarted, onLogin }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel border-b border-white/10 py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center group-hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] transition-shadow">
            <span className="text-sm font-bold text-gradient-accent">E</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Edu<span className="text-gradient-accent">AI</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <RippleButton variant="ghost" onClick={onLogin} className="!py-2.5 !px-4 hidden sm:inline-flex">
            Log in
          </RippleButton>
          <RippleButton onClick={onGetStarted} className="!py-2.5 !px-5">
            Get Started
          </RippleButton>
        </div>
      </nav>
    </motion.header>
  );
}
