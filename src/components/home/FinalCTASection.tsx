import { motion } from "framer-motion";
import RippleButton from "./RippleButton";

type Props = {
  onGetStarted: () => void;
};

export default function FinalCTASection({ onGetStarted }: Props) {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.25) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center glass-panel neu-soft rounded-3xl p-10 sm:p-16 border border-white/10"
      >
        <motion.div
          className="absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 blur-sm -z-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gradient mb-4">
          Ready to learn smarter?
        </h2>
        <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto mb-8">
          Join EduAI today and transform how you study — syllabus to success, powered by AI.
        </p>
        <RippleButton onClick={onGetStarted} className="!px-10 !py-4 text-base">
          Start free — no credit card
        </RippleButton>
        <p className="mt-4 text-xs text-white/30">Free for students · Setup in under 2 minutes</p>
      </motion.div>
    </section>
  );
}
