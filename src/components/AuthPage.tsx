import { useState } from "react";
import { motion } from "framer-motion";
import MeshGradientBackground from "./MeshGradientBackground";
import FloatingParticles from "./FloatingParticles";
import AuthForm, { type AuthMode } from "./AuthForm";

const featureCards = [
  { title: "Syllabus tracking", desc: "Never miss a topic again" },
  { title: "Smart summaries", desc: "AI-powered chapter digests" },
  { title: "Concept clarity", desc: "Understand, don't memorize" },
];

type Props = {
  onBack?: () => void;
};

export default function AuthPage({ onBack }: Props) {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <motion.div
      className="min-h-screen min-h-[100dvh] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MeshGradientBackground />
      <FloatingParticles />

      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6">
        <motion.button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-sm font-bold text-gradient-accent">
            E
          </div>
          <span className="text-sm font-semibold tracking-tight text-white/90">
            Edu<span className="text-gradient-accent">AI</span>
          </span>
        </motion.button>
        {onBack && (
          <motion.button
            type="button"
            onClick={onBack}
            className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ← Back to home
          </motion.button>
        )}
      </header>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-5 sm:px-8 pb-10 lg:pb-16 max-w-7xl mx-auto w-full">
        <section className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase text-violet-300/90 bg-violet-500/10 border border-violet-500/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI-powered learning
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-5">
              <span className="text-gradient">Your AI Learning</span>
              <br />
              <span className="text-gradient-accent">Companion</span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Track syllabus, understand concepts, get summaries, and stay ahead.
            </p>
          </motion.div>

          <motion.div
            className="hidden lg:grid grid-cols-3 gap-3 mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="glass-panel rounded-xl p-4 text-left cursor-default"
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <h3 className="text-sm font-medium text-white/90 mb-1">{card.title}</h3>
                <p className="text-xs text-white/40">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="w-full flex justify-center lg:justify-end shrink-0">
          <AuthForm mode={mode} onModeChange={setMode} />
        </section>
      </main>

      <footer className="relative z-10 py-4 text-center text-[10px] text-white/20 tracking-wide">
        © {new Date().getFullYear()} EduAI
      </footer>
    </motion.div>
  );
}
