import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

export default function PlannerPage() {
  const { step, resourceName, addStreak } = useWorkflowStore();
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    if (step === "task_added" && resourceName) {
      const label = `Revise: ${resourceName}`;
      setTasks((t) => (t.includes(label) ? t : [label, ...t]));
    }
  }, [step, resourceName]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [running, seconds]);

  const finishPomodoro = () => {
    setRunning(false);
    setSeconds(25 * 60);
    addStreak();
  };

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gradient mb-2">Track & Planner</h1>
      <p className="text-white/45 text-sm mb-6">Tasks, pomodoro, goals, streaks.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-8 flex flex-col items-center">
          <p className="text-xs text-white/40 uppercase mb-4">Pomodoro</p>
          <p className="text-5xl font-mono text-gradient-accent tabular-nums">
            {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
          </p>
          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={() => setRunning(!running)}
              className="btn-premium px-5 py-2 rounded-xl text-sm text-white"
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={finishPomodoro}
              className="px-5 py-2 rounded-xl text-sm border border-white/15 text-white/70"
            >
              Complete (+streak)
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase mb-3">Tasks</p>
          {tasks.length === 0 ? (
            <p className="text-sm text-white/40">Complete the workflow to add tasks.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-white/80 flex items-center gap-2"
                >
                  <span className="text-emerald-400">✓</span> {t}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
