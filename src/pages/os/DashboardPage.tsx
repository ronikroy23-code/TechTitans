import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

const steps = [
  { key: "uploaded", label: "Upload" },
  { key: "summarized", label: "Summary" },
  { key: "flashcards", label: "Flashcards" },
  { key: "task_added", label: "Planner" },
] as const;

export default function DashboardPage() {
  const { step, resourceName, streak } = useWorkflowStore();
  const navigate = useNavigate();
  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gradient mb-2">Command Center</h1>
      <p className="text-white/45 text-sm mb-8">Your Neuron OS — workflows, focus, and AI insights.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div layout className="glass-panel rounded-2xl p-5 sm:col-span-2 border border-violet-500/20">
          <p className="text-xs text-violet-300/80 uppercase tracking-wider mb-2">Focus today</p>
          <p className="text-lg font-medium text-white/90 mb-4">
            {step === "idle"
              ? "Upload a resource to start your AI workflow"
              : `Continue: ${resourceName ?? "Study material"}`}
          </p>
          <button
            type="button"
            onClick={() => navigate("/app/storage")}
            className="btn-premium text-sm px-5 py-2.5 rounded-xl text-white font-medium"
          >
            {step === "idle" ? "Go to Smart Storage" : "Continue workflow →"}
          </button>
        </motion.div>

        <div className="glass-panel rounded-2xl p-5 text-center">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Streak</p>
          <p className="text-4xl font-semibold text-gradient-accent">🔥 {streak}</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs text-cyan-300/80 uppercase tracking-wider mb-2">AI Insight</p>
          <p className="text-sm text-white/55 leading-relaxed">
            {stepIndex >= 2
              ? "Great progress — review flashcards before your next deadline."
              : "Complete the upload → summary workflow to unlock personalized tips."}
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 sm:col-span-2">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Workflow trail</p>
          <div className="flex flex-wrap gap-2">
            {steps.map((s, i) => (
              <span
                key={s.key}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                  stepIndex >= i && step !== "idle"
                    ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200"
                    : "bg-white/[0.03] border-white/10 text-white/35"
                }`}
              >
                {s.label}
                {i < steps.length - 1 && <span className="ml-2 opacity-40">→</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Quick links</p>
          <div className="space-y-2">
            {[
              { label: "Preparation Zone", path: "/app/preparation" },
              { label: "Track & Planner", path: "/app/planner" },
              { label: "Study Vault", path: "/app/vault" },
            ].map((l) => (
              <button
                key={l.path}
                type="button"
                onClick={() => navigate(l.path)}
                className="w-full text-left text-sm text-white/60 hover:text-white py-1.5"
              >
                → {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
