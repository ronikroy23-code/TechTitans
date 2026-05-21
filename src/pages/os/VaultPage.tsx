import { useWorkflowStore } from "../../stores/useWorkflowStore";

const friends = [
  { name: "Alex", streak: 14 },
  { name: "Jordan", streak: 9 },
  { name: "Sam", streak: 12 },
];

export default function VaultPage() {
  const { resourceName, step } = useWorkflowStore();

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gradient mb-2">Study Vault</h1>
      <p className="text-white/45 text-sm mb-6">Shared notes, flashcards, friend streaks.</p>

      {step !== "idle" && resourceName && (
        <div className="glass-panel rounded-xl p-4 mb-6 border border-violet-500/20">
          <p className="text-xs text-violet-300/80 mb-1">Shared note</p>
          <p className="text-sm text-white/80">Summary: {resourceName}</p>
          <p className="text-xs text-emerald-400/80 mt-2">Visible to study group ✓</p>
        </div>
      )}

      <p className="text-sm text-white/50 mb-3">Friend streaks</p>
      <div className="space-y-2">
        {friends.map((f, i) => (
          <div
            key={f.name}
            className="glass-panel rounded-xl p-4 flex justify-between items-center"
          >
            <span className="text-white/80">{f.name}</span>
            <span className="text-gradient-accent font-semibold">🔥 {f.streak + (i === 0 ? 0 : 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
