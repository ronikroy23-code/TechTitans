import { motion } from "framer-motion";

const NODES = [
  { cx: 15, cy: 25 }, { cx: 35, cy: 15 }, { cx: 55, cy: 30 },
  { cx: 75, cy: 18 }, { cx: 88, cy: 40 }, { cx: 25, cy: 55 },
  { cx: 50, cy: 48 }, { cx: 70, cy: 62 }, { cx: 40, cy: 75 },
  { cx: 85, cy: 72 }, { cx: 12, cy: 70 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7],
  [7, 8], [6, 2], [5, 9], [8, 9], [4, 7], [10, 5], [10, 0],
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-[30%] -left-[20%] w-[90%] h-[90%] rounded-full opacity-50 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 65%)" }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 65%)" }}
        animate={{ x: [0, -25, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] left-[30%] w-[50%] h-[50%] rounded-full opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={`${NODES[a].cx}%`}
            y1={`${NODES[a].cy}%`}
            x2={`${NODES[b].cx}%`}
            y2={`${NODES[b].cy}%`}
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={`${n.cx}%`}
            cy={`${n.cy}%`}
            r="3"
            fill="#22d3ee"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.3], r: [2, 4, 2] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>

      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
          style={{
            left: `${(i * 17 + 7) % 100}%`,
            top: `${(i * 23 + 11) % 100}%`,
          }}
          animate={{
            y: [0, -20 - (i % 5) * 8, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
