import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./components/AuthPage";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./pages/HomePage";
import AppShell from "./components/shell/AppShell";
import DashboardPage from "./pages/os/DashboardPage";
import StoragePage from "./pages/os/StoragePage";
import PreparationPage from "./pages/os/PreparationPage";
import PlannerPage from "./pages/os/PlannerPage";
import NewsPage from "./pages/os/NewsPage";
import VaultPage from "./pages/os/VaultPage";
import ProfilePage from "./pages/os/ProfilePage";

type Page = "home" | "auth";

function MarketingRoutes() {
  const [page, setPage] = useState<Page>("home");

  return (
    <AnimatePresence mode="wait">
      {page === "home" ? (
        <HomePage
          key="home"
          onGetStarted={() => setPage("auth")}
          onLogin={() => setPage("auth")}
        />
      ) : (
        <AuthPage key="auth" onBack={() => setPage("home")} />
      )}
    </AnimatePresence>
  );
}

function AppRoutes() {
  const { user, loading, authError, enterDemoMode } = useAuth();
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <LoadingScreen onComplete={() => setSplashDone(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030308] gap-4">
        <div className="w-8 h-8 border-2 border-violet-500/30 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-xs text-white/40">Connecting…</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/app/*"
        element={user ? <AppShell /> : <Navigate to="/" replace />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="storage" element={<StoragePage />} />
        <Route path="preparation" element={<PreparationPage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="vault" element={<VaultPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/*"
        element={
          user ? (
            <Navigate to="/app" replace />
          ) : (
            <div>
              {authError && (
                <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-center text-xs text-amber-200">
                  {authError}
                  <button
                    type="button"
                    onClick={enterDemoMode}
                    className="ml-2 underline font-semibold"
                  >
                    Try Demo Mode
                  </button>
                </div>
              )}
              <MarketingRoutes />
            </div>
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
