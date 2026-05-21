import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import DashboardPreview from "./DashboardPreview";
import RippleButton from "./RippleButton";

type Props = {
  onGetStarted: () => void;
  onTryDemo: () => void;
};

export default function HeroSection({ onGetStarted, onTryDemo }: Props) {
  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-violet-300/90 bg-violet-500/10 border border-violet-500/25 mb-6"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              AI-powered education platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.08] mb-6"
            >
              <span className="text-gradient">Learn Smarter</span>
              <br />
              <span className="text-gradient-accent">with AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Track syllabus, generate summaries, manage deadlines, and receive
              personalized learning guidance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <RippleButton onClick={onGetStarted}>Get Started</RippleButton>
              <RippleButton variant="secondary" onClick={onTryDemo}>
                Try AI Demo
              </RippleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-xs text-white/35"
            >
              {["10k+ summaries", "Smart deadlines", "Learning graphs"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="text-cyan-400">✦</span> {t}
                </span>
              ))}
            </motion.div>
          </div>

          <DashboardPreview />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
