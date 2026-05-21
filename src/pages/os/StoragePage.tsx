import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

export default function StoragePage() {
  const [files, setFiles] = useState<string[]>([]);
  const { setStep, step } = useWorkflowStore();
  const navigate = useNavigate();

  const handleUpload = () => {
    const name = `Lecture_Notes_${files.length + 1}.pdf`;
    setFiles((f) => [...f, name]);
    setStep("uploaded", name);
  };

  const runSummary = () => {
    setStep("summarized");
    navigate("/app/preparation");
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gradient mb-2">Smart Storage</h1>
      <p className="text-white/45 text-sm mb-6">PDFs, notes, assignments, and links.</p>

      <motion.button
        type="button"
        onClick={handleUpload}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-2 border-dashed border-violet-500/40 rounded-2xl py-12 mb-6 hover:border-cyan-400/50 hover:bg-violet-500/5 transition-colors"
      >
        <span className="text-3xl block mb-2">📤</span>
        <span className="text-sm font-medium text-white/80">Click to upload (demo)</span>
      </motion.button>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((f) => (
            <div
              key={f}
              className="glass-panel rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium text-white/90">{f}</p>
                <p className="text-xs text-white/40">PDF · Just now</p>
              </div>
              {step === "uploaded" && (
                <button
                  type="button"
                  onClick={runSummary}
                  className="btn-premium text-xs px-4 py-2 rounded-lg text-white shrink-0"
                >
                  AI Summarize →
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
