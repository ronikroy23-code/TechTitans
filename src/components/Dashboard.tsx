import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import MeshGradientBackground from "./MeshGradientBackground";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <motion.div
      className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MeshGradientBackground />

      <motion.div
        className="relative z-10 glass-panel rounded-3xl p-8 sm:p-10 max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-14 h-14 rounded-2xl btn-premium mx-auto mb-6 flex items-center justify-center text-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          ✓
        </motion.div>

        <h1 className="text-2xl font-semibold tracking-tight text-gradient mb-2">
          You&apos;re signed in
        </h1>
        <p className="text-sm text-white/50 mb-1">Welcome back to EduAI.</p>
        <p className="text-sm text-violet-300/80 font-medium mb-8 break-all">{user?.email}</p>

        <motion.button
          type="button"
          onClick={() => signOut()}
          className="w-full py-3 rounded-xl border border-white/15 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:border-white/25 transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign out
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
