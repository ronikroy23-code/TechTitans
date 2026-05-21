import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const DEMO_KEY = "neuron_demo_user";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isDemo: boolean;
  authError: string | null;
  signOut: () => Promise<void>;
  enterDemoMode: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const demoUser = {
  id: "demo-user",
  email: "demo@neuron.app",
  app_metadata: {},
  user_metadata: { name: "Demo Student" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as User;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(() => localStorage.getItem(DEMO_KEY) === "1");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (isDemo) {
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured()) {
      setAuthError("Supabase not configured — use Demo Mode or fix .env");
      setLoading(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoading(false);
      setAuthError("Auth timed out. Check your connection or use Demo Mode.");
    }, 8000);

    supabase.auth
      .getSession()
      .then(({ data: { session: s }, error }) => {
        if (error) setAuthError(error.message);
        setSession(s);
        setLoading(false);
      })
      .catch((err: Error) => {
        setAuthError(err.message || "Failed to connect to Supabase");
        setLoading(false);
      })
      .finally(() => clearTimeout(timeout));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
      setAuthError(null);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [isDemo]);

  const signOut = useCallback(async () => {
    localStorage.removeItem(DEMO_KEY);
    setIsDemo(false);
    if (isSupabaseConfigured()) await supabase.auth.signOut();
    setSession(null);
  }, []);

  const enterDemoMode = useCallback(() => {
    localStorage.setItem(DEMO_KEY, "1");
    setIsDemo(true);
    setSession(null);
    setAuthError(null);
    setLoading(false);
  }, []);

  const user = isDemo ? demoUser : session?.user ?? null;

  const value = useMemo(
    () => ({
      user,
      session: isDemo ? null : session,
      loading,
      isDemo,
      authError,
      signOut,
      enterDemoMode,
    }),
    [user, session, loading, isDemo, authError, signOut, enterDemoMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
