import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const testimonials = [
  {
    quote:
      "EduAI turned my chaotic syllabus into a clear daily plan. I went from cramming to actually understanding topics.",
    name: "Priya Sharma",
    role: "CS Student, IIT Delhi",
    avatar: "PS",
  },
  {
    quote:
      "The learning graph showed me I was skipping fundamentals. My grades improved within one semester.",
    name: "Marcus Chen",
    role: "Engineering Major, MIT",
    avatar: "MC",
  },
  {
    quote:
      "Deadline tracking plus AI summaries saved me 10+ hours a week. This feels like the future of studying.",
    name: "Sofia Alvarez",
    role: "Pre-med, Stanford",
    avatar: "SA",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="Trusted by students"
          title="Loved by learners worldwide"
          subtitle="Join thousands of students who study smarter with EduAI."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TiltCard key={t.name}>
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel neu-soft rounded-2xl p-6 sm:p-7 h-full flex flex-col border border-white/10 hover:border-violet-500/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-amber-400/90 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-medium text-white/90 block">{t.name}</cite>
                    <span className="text-xs text-white/40">{t.role}</span>
                  </div>
                </footer>
              </motion.blockquote>
            </TiltCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12 text-center"
        >
          {[
            { value: "12k+", label: "Active students" },
            { value: "50k+", label: "Summaries generated" },
            { value: "4.9", label: "Average rating" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-semibold text-gradient-accent">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
