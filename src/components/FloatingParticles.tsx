import { motion } from "framer-motion";

const PARTICLES = [
  { icon: "📚", label: "Syllabus", x: "8%", y: "18%", delay: 0, size: "text-2xl" },
  { icon: "🧠", label: "Concepts", x: "88%", y: "22%", delay: 0.4, size: "text-xl" },
  { icon: "✨", label: "Summaries", x: "12%", y: "72%", delay: 0.8, size: "text-xl" },
  { icon: "📈", label: "Progress", x: "85%", y: "68%", delay: 1.2, size: "text-2xl" },
  { icon: "💡", label: "Insights", x: "5%", y: "45%", delay: 0.6, size: "text-lg" },
  { icon: "🎯", label: "Goals", x: "92%", y: "48%", delay: 1, size: "text-lg" },
  { icon: "🔬", label: "STEM", x: "78%", y: "12%", delay: 1.4, size: "text-lg" },
  { icon: "📝", label: "Notes", x: "22%", y: "88%", delay: 0.2, size: "text-lg" },
];

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[5] hidden md:block">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={p.label}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            y: [0, -14, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, delay: p.delay },
            y: { duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            scale: { duration: 0.6, delay: 0.3 + p.delay },
          }}
        >
          <motion.div
            className={`${p.size} glass-panel w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.1 }}
            style={{ pointerEvents: "auto" }}
          >
            {p.icon}
          </motion.div>
          <span className="text-[10px] font-medium tracking-wider uppercase text-white/30">
            {p.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
