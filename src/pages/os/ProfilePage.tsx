import { useAuth } from "../../contexts/AuthContext";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

export default function ProfilePage() {
  const { user, isDemo } = useAuth();
  const { streak, step } = useWorkflowStore();

  return (
    <div className="p-4 sm:p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gradient mb-6">Profile</h1>
      <div className="glass-panel rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
          {user?.email?.[0]?.toUpperCase() ?? "?"}
        </div>
        <p className="font-medium text-white/90">{user?.email}</p>
        {isDemo && <p className="text-xs text-cyan-400/80 mt-1">Demo mode active</p>}
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="bg-white/[0.03] rounded-xl p-3">
            <p className="text-[10px] text-white/40">Streak</p>
            <p className="text-lg font-semibold">{streak}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3">
            <p className="text-[10px] text-white/40">Workflow</p>
            <p className="text-lg font-semibold capitalize">{step}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
