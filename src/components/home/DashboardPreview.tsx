import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl" />
      <motion.div
        className="relative glass-panel neu-soft rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[10px] text-white/30 ml-2 font-mono">eduai.app/dashboard</span>
        </div>
        <div className="p-4 sm:p-5 grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-3">
            <div className="h-24 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-white/10 p-3">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Today&apos;s focus</p>
              <p className="text-sm font-medium text-white/90">Trees → Graph traversal</p>
              <motion.div
                className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.2 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["AI Summary", "Deadlines"].map((label, i) => (
                <div
                  key={label}
                  className="h-16 rounded-lg bg-white/[0.03] border border-white/10 p-2 flex flex-col justify-between"
                >
                  <span className="text-[9px] text-white/40">{label}</span>
                  <motion.span
                    className="text-lg font-semibold text-gradient-accent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  >
                    {i === 0 ? "Ready" : "3 due"}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
              <motion.div
                key={d}
                className="flex items-end gap-1 h-8"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                style={{ originY: 1 }}
              >
                <div
                  className="flex-1 rounded-sm bg-gradient-to-t from-violet-600/60 to-cyan-400/40"
                  style={{ height: `${30 + i * 12}%` }}
                />
              </motion.div>
            ))}
            <p className="text-[8px] text-white/30 text-center pt-1">Study hours</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
