import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

const nav = [
  { to: "/app", label: "Dashboard", icon: "◉", end: true },
  { to: "/app/storage", label: "Storage", icon: "📁" },
  { to: "/app/preparation", label: "Preparation", icon: "⚡" },
  { to: "/app/planner", label: "Planner", icon: "📅" },
  { to: "/app/news", label: "News", icon: "📰" },
  { to: "/app/vault", label: "Vault", icon: "🏛" },
  { to: "/app/profile", label: "Profile", icon: "👤" },
];

export default function AppShell() {
  const { user, signOut, isDemo } = useAuth();
  const streak = useWorkflowStore((s) => s.streak);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#030308] flex">
      <aside className="hidden md:flex flex-col w-[72px] lg:w-56 border-r border-white/10 glass-panel rounded-none shrink-0 py-6 px-2 lg:px-4">
        <button
          type="button"
          onClick={() => navigate("/app")}
          className="flex items-center gap-2 mb-8 px-2"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-sm font-bold">
            N
          </div>
          <span className="hidden lg:block text-sm font-semibold">
            Neuron{isDemo && <span className="text-cyan-400/80 text-xs ml-1">demo</span>}
          </span>
        </button>

        <nav className="flex-1 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-violet-500/20 text-white border border-violet-500/30 shadow-[0_0_20px_-6px_rgba(139,92,246,0.5)]"
                    : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"
                }`
              }
            >
              <span className="text-base w-6 text-center">{item.icon}</span>
              <span className="hidden lg:block">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block px-3 py-3 rounded-xl bg-white/[0.03] border border-white/10 mt-4">
          <p className="text-[10px] text-white/35 uppercase tracking-wider">Streak</p>
          <p className="text-xl font-semibold text-gradient-accent">🔥 {streak}</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 glass-panel rounded-none">
          <div className="md:hidden flex gap-1 overflow-x-auto">
            {nav.slice(0, 5).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
                    isActive ? "bg-violet-500/30 text-white" : "text-white/40"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <p className="hidden md:block text-sm text-white/50">
            Welcome, <span className="text-white/90">{user?.email?.split("@")[0]}</span>
          </p>
          <button
            type="button"
            onClick={() => signOut().then(() => navigate("/"))}
            className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10"
          >
            Sign out
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          <motion.div
            key={location.pathname + location.search}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
