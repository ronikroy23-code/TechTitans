import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    step: "01",
    title: "Upload syllabus",
    desc: "Import your course outline, PDFs, or topic lists in seconds.",
    icon: "📤",
  },
  {
    step: "02",
    title: "AI analyzes learning path",
    desc: "Our engine maps dependencies and builds your personalized roadmap.",
    icon: "🧠",
  },
  {
    step: "03",
    title: "Get personalized guidance",
    desc: "Summaries, deadlines, and daily recommendations — all in one place.",
    icon: "🚀",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="How it works"
          title="Three steps to smarter learning"
          subtitle="From syllabus upload to AI-powered study plans — effortless and intuitive."
        />

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto rounded-2xl glass-panel neu-soft flex items-center justify-center text-3xl mb-6 border border-white/10"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {s.icon}
                </motion.div>
                <span className="text-xs font-mono text-violet-400/80 tracking-widest">{s.step}</span>
                <h3 className="text-xl font-semibold text-white/95 mt-2 mb-3">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
