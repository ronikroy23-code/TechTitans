import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import AnimatedCounter from "./AnimatedCounter";
import { useInViewOnce } from "../../hooks/useInViewOnce";

const weeklyData = [42, 65, 48, 80, 72, 90, 68];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const progressItems = [
  { label: "Data Structures", value: 78, color: "from-violet-500 to-indigo-500" },
  { label: "Algorithms", value: 62, color: "from-cyan-500 to-blue-500" },
  { label: "System Design", value: 45, color: "from-pink-500 to-violet-500" },
];

export default function AnalyticsSection() {
  const { ref, inView } = useInViewOnce(0.1);

  return (
    <section id="analytics" className="relative py-24 sm:py-32 px-5 sm:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Analytics"
          title="Insights that drive results"
          subtitle="Track progress, study patterns, and AI-powered recommendations in one dashboard."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="glass-panel neu-soft rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-6">
              Weekly study hours
            </h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-violet-600/80 to-cyan-400/60 mx-auto"
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : { height: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="text-[10px] text-white/30">{days[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="glass-panel neu-soft rounded-2xl p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">
              Subject mastery
            </h3>
            {progressItems.map((item, i) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">{item.label}</span>
                  <span className="text-white/40">
                    <AnimatedCounter value={item.value} suffix="%" active={inView} />
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 grid sm:grid-cols-3 gap-4"
          >
            {[
              { label: "Study streak", value: 14, suffix: " days", icon: "🔥" },
              { label: "Topics mastered", value: 47, suffix: "", icon: "✓" },
              { label: "Productivity score", value: 89, suffix: "%", icon: "⚡" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl p-5 border border-white/10 hover:border-cyan-500/30 transition-colors"
              >
                <span className="text-2xl mb-3 block">{stat.icon}</span>
                <p className="text-2xl sm:text-3xl font-semibold text-gradient-accent">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} active={inView} />
                </p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 glass-panel rounded-2xl p-5 sm:p-6 border border-cyan-500/20 bg-cyan-500/5"
          >
            <div className="flex gap-3 items-start">
              <span className="text-xl">🤖</span>
              <div>
                <p className="text-sm font-medium text-cyan-300/90 mb-1">AI Insight</p>
                <p className="text-sm text-white/55 leading-relaxed">
                  You&apos;re strongest in trees this week. Consider reviewing graph traversal
                  before Friday&apos;s deadline — EduAI mapped it as your highest-impact next step.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
