import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

const MOCK_SUMMARY = `## Key concepts
- Arrays: contiguous memory, O(1) index access
- Linked lists: dynamic nodes, O(n) traversal
- Trees: hierarchical structure for search

## Exam focus
Understand when to use each structure and trade-offs.`;

const CARDS = [
  { front: "Array access time?", back: "O(1) index" },
  { front: "Linked list insertion?", back: "O(1) if pointer known" },
  { front: "Tree use case?", back: "Hierarchical search" },
];

export default function PreparationPage() {
  const { step, resourceName, setStep } = useWorkflowStore();
  const [flipped, setFlipped] = useState<number | null>(null);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const navigate = useNavigate();

  const generateFlashcards = () => setStep("flashcards");

  const addToPlanner = () => {
    setStep("task_added");
    navigate("/app/planner");
  };

  const sendChat = () => {
    if (!chat.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: chat },
      {
        role: "ai",
        text: `Based on ${resourceName ?? "your material"}, focus on core definitions and practice problems.`,
      },
    ]);
    setChat("");
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gradient mb-2">Preparation Zone</h1>
      <p className="text-white/45 text-sm mb-6">AI chat, summaries, flashcards, study mode.</p>

      {(step === "summarized" || step === "flashcards" || step === "task_added") && (
        <div className="glass-panel rounded-2xl p-5 mb-6 border border-cyan-500/20">
          <p className="text-xs text-cyan-300/80 mb-2">AI Summary · {resourceName}</p>
          <pre className="text-sm text-white/70 whitespace-pre-wrap font-sans">{MOCK_SUMMARY}</pre>
          {step === "summarized" && (
            <button
              type="button"
              onClick={generateFlashcards}
              className="mt-4 btn-premium text-sm px-4 py-2 rounded-lg text-white"
            >
              Generate flashcards →
            </button>
          )}
        </div>
      )}

      {(step === "flashcards" || step === "task_added") && (
        <div className="mb-6">
          <p className="text-sm text-white/50 mb-3">Flashcards</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {CARDS.map((c, i) => (
              <motion.button
                key={c.front}
                type="button"
                onClick={() => setFlipped(flipped === i ? null : i)}
                className="glass-panel rounded-xl p-4 min-h-[100px] text-left hover:border-violet-500/40 border border-white/10"
                whileHover={{ y: -4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={flipped === i ? "back" : "front"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-white/80"
                  >
                    {flipped === i ? c.back : c.front}
                  </motion.p>
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
          {step === "flashcards" && (
            <button
              type="button"
              onClick={addToPlanner}
              className="mt-4 btn-premium text-sm px-4 py-2 rounded-lg text-white"
            >
              Add revision to Planner →
            </button>
          )}
        </div>
      )}

      <div className="glass-panel rounded-2xl p-4">
        <p className="text-xs text-white/40 mb-3">AI Chat</p>
        <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
          {messages.map((m, i) => (
            <p
              key={i}
              className={`text-sm ${m.role === "user" ? "text-violet-300" : "text-white/60"}`}
            >
              {m.role === "user" ? "You: " : "Neuron: "}
              {m.text}
            </p>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendChat()}
            placeholder="Ask about your syllabus..."
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/40"
          />
          <button type="button" onClick={sendChat} className="btn-premium px-4 py-2 rounded-xl text-sm text-white">
            Send
          </button>
        </div>
      </div>

      {step === "idle" && (
        <p className="mt-6 text-sm text-amber-400/80">
          Upload a file in Smart Storage first, then run AI Summarize.
        </p>
      )}
    </div>
  );
}
