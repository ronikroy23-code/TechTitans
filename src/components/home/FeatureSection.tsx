import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const features = [
  {
    icon: "✨",
    title: "AI Summaries",
    desc: "Instant chapter digests tuned to your syllabus and exam style.",
    gradient: "from-violet-500/30 to-purple-600/10",
  },
  {
    icon: "⏰",
    title: "Smart Deadline Tracking",
    desc: "Never miss assignments with intelligent priority alerts.",
    gradient: "from-cyan-500/30 to-blue-600/10",
  },
  {
    icon: "🔗",
    title: "Learning Relationship Graph",
    desc: "Visualize how concepts connect across your entire curriculum.",
    gradient: "from-blue-500/30 to-indigo-600/10",
  },
  {
    icon: "🎯",
    title: "Personalized Recommendations",
    desc: "AI suggests what to study next based on your progress.",
    gradient: "from-pink-500/30 to-violet-600/10",
  },
  {
    icon: "📋",
    title: "Syllabus Management",
    desc: "Upload, organize, and track every topic in one place.",
    gradient: "from-emerald-500/20 to-cyan-600/10",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    desc: "Deep insights into study habits and mastery levels.",
    gradient: "from-amber-500/20 to-orange-600/10",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Capabilities"
          title="Everything you need to learn smarter"
          subtitle="Six powerful modules designed for modern students — interactive, intelligent, and beautiful."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <TiltCard key={f.title}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="group relative h-full glass-panel neu-soft rounded-2xl p-6 sm:p-7 overflow-hidden cursor-default transition-shadow duration-300 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.35)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <motion.div
                  className="relative w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-2xl mb-5"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="relative text-lg font-semibold text-white/95 mb-2">{f.title}</h3>
                <p className="relative text-sm text-white/45 leading-relaxed">{f.desc}</p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </motion.article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
