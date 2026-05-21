import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const nodes = [
  { id: "arrays", label: "Arrays", x: 12, y: 50, color: "#6366f1" },
  { id: "linked", label: "Linked Lists", x: 32, y: 35, color: "#818cf8" },
  { id: "trees", label: "Trees", x: 55, y: 48, color: "#22d3ee" },
  { id: "graphs", label: "Graphs", x: 78, y: 38, color: "#a78bfa" },
  { id: "dp", label: "Dynamic Prog.", x: 88, y: 62, color: "#f472b6", optional: true },
];

const edges = [
  ["arrays", "linked"],
  ["linked", "trees"],
  ["trees", "graphs"],
  ["trees", "dp"],
];

export default function LearningGraphSection() {
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section id="graph" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="Learning Graph"
          title="See how concepts connect"
          subtitle="EduAI maps prerequisite relationships so you always know what to learn next."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-panel neu-soft rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden"
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] text-emerald-400/80 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI dependency mapping active
          </div>

          <div className="relative aspect-[2/1] sm:aspect-[2.2/1] min-h-[220px]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              {edges.map(([from, to], i) => {
                const a = getNode(from);
                const b = getNode(to);
                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="url(#edgeGlow)"
                    strokeWidth="0.8"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                  />
                );
              })}
            </svg>

            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl glass-panel border border-white/15 text-center min-w-[100px] sm:min-w-[120px]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px -5px ${node.color}66`,
                  }}
                  animate={
                    i === nodes.length - 2
                      ? { boxShadow: ["0 0 0px transparent", `0 0 24px ${node.color}44`, "0 0 0px transparent"] }
                      : {}
                  }
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{ background: node.color }}
                  />
                  <p className="text-xs sm:text-sm font-semibold text-white/90 whitespace-nowrap">
                    {node.label}
                  </p>
                  {node.optional && (
                    <p className="text-[9px] text-white/35 mt-0.5">Recommended next</p>
                  )}
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              className="absolute left-[22%] top-[58%] text-[10px] text-cyan-400/60 font-mono hidden sm:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              prerequisite →
            </motion.div>
          </div>

          <p className="mt-6 text-center text-sm text-white/40">
            Example path: <span className="text-white/70">Arrays → Linked Lists → Trees → Graphs</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
