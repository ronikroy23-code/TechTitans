import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import AnimatedInput from "./AnimatedInput";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  type FieldErrors,
} from "../utils/validation";
import { supabase } from "../lib/supabase";
import { mapAuthError } from "../utils/authErrors";

export type AuthMode = "login" | "signup";

type Props = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export default function AuthForm({ mode, onModeChange }: Props) {
  const { enterDemoMode } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const isSignup = mode === "signup";

  const clearMessages = () => {
    setGeneralError("");
    setSuccess(false);
    setSuccessMessage("");
  };

  const runValidation = (fields?: string[]) => {
    const next: FieldErrors = {};
    if (!fields || fields.includes("email")) next.email = validateEmail(email);
    if (!fields || fields.includes("password"))
      next.password = validatePassword(password, isSignup);
    if (isSignup && (!fields || fields.includes("confirmPassword")))
      next.confirmPassword = validateConfirmPassword(password, confirmPassword);
    setErrors(next);
    return !next.email && !next.password && (!isSignup || !next.confirmPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearMessages();
    setTouched({ email: true, password: true, confirmPassword: true });
    if (!runValidation()) return;

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setGeneralError(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
      );
      return;
    }

    setSubmitting(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setSuccessMessage("Check your email to confirm your account, then log in.");
          setSuccess(true);
        } else {
          setSuccessMessage("Welcome aboard!");
          navigate("/app");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;
        navigate("/app");
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? mapAuthError(err as import("@supabase/supabase-js").AuthError)
          : "Something went wrong. Please try again.";
      setGeneralError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(forgotEmail);
    if (emailError) {
      setGeneralError(emailError);
      return;
    }

    setSubmitting(true);
    setGeneralError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${window.location.origin}`,
      });
      if (error) throw error;
      setForgotSent(true);
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? mapAuthError(err as import("@supabase/supabase-js").AuthError)
          : "Could not send reset email.";
      setGeneralError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      layout
      className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.1) inset, 0 30px 60px -15px rgba(0,0,0,0.55), 0 0 100px -15px rgba(139,92,246,0.2)",
      }}
    >
      <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-8">
        {(["login", "signup"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              onModeChange(tab);
              setErrors({});
              setTouched({});
              clearMessages();
              setForgotOpen(false);
              setForgotSent(false);
            }}
            className={`relative flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors z-10 ${
              mode === tab ? "text-white" : "text-white/40 hover:text-white/60"
            }`}
          >
            {mode === tab && (
              <motion.div
                layoutId="auth-tab"
                className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{tab === "login" ? "Log in" : "Sign up"}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {generalError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-400/30 text-xs text-red-300"
          >
            {generalError}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {forgotOpen ? (
          <motion.form
            key="forgot"
            onSubmit={handleForgotPassword}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-4"
          >
            <p className="text-sm text-white/50">
              {forgotSent
                ? "Reset link sent. Check your inbox."
                : "Enter your email and we'll send a password reset link."}
            </p>
            {!forgotSent && (
              <AnimatedInput
                id="forgot-email"
                label="Email"
                type="email"
                value={forgotEmail}
                onChange={setForgotEmail}
                placeholder="you@university.edu"
                autoComplete="email"
              />
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setForgotOpen(false);
                  setForgotSent(false);
                  clearMessages();
                }}
                className="flex-1 py-3 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/[0.04]"
              >
                Back
              </button>
              {!forgotSent && (
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-premium text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-70"
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? "Sending…" : "Send link"}
                </motion.button>
              )}
            </div>
          </motion.form>
        ) : (
          <motion.form
            key={mode}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: mode === "login" ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 12 : -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <AnimatedInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(v) => {
                setEmail(v);
                if (touched.email) runValidation(["email"]);
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, email: true }));
                runValidation(["email"]);
              }}
              error={touched.email ? errors.email : undefined}
              placeholder="you@university.edu"
              autoComplete="email"
            />

            <div>
              <AnimatedInput
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(v) => {
                  setPassword(v);
                  if (touched.password) runValidation(["password"]);
                  if (touched.confirmPassword) runValidation(["confirmPassword"]);
                }}
                onBlur={() => {
                  setTouched((t) => ({ ...t, password: true }));
                  runValidation(["password"]);
                }}
                error={touched.password ? errors.password : undefined}
                placeholder={isSignup ? "Min. 8 characters" : "••••••••"}
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
              {isSignup && (
                <PasswordStrengthIndicator password={password} visible={isSignup} />
              )}
            </div>

            <AnimatePresence>
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AnimatedInput
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(v) => {
                      setConfirmPassword(v);
                      if (touched.confirmPassword) runValidation(["confirmPassword"]);
                    }}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, confirmPassword: true }));
                      runValidation(["confirmPassword"]);
                    }}
                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!isSignup && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotOpen(true);
                    clearMessages();
                  }}
                  className="text-xs text-violet-400/90 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={submitting || (success && !isSignup)}
              className="relative w-full btn-premium text-white font-semibold py-3.5 rounded-xl text-sm tracking-wide overflow-hidden disabled:opacity-70"
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 px-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <motion.path
                        d="M4 9l3.5 3.5L14 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </svg>
                    {successMessage || "Done!"}
                  </motion.span>
                ) : submitting ? (
                  <motion.span
                    key="loading"
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    {isSignup ? "Creating account…" : "Signing in…"}
                  </motion.span>
                ) : (
                  <motion.span key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {isSignup ? "Create free account" : "Continue"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-5 pt-5 border-t border-white/10">
        <button
          type="button"
          onClick={() => {
            enterDemoMode();
            navigate("/app");
          }}
          className="w-full py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20 transition-colors"
        >
          🚀 Enter Demo Mode (no login required)
        </button>
        <p className="text-[10px] text-white/30 text-center mt-2">
          Try the full Neuron OS workflow instantly
        </p>
      </div>

      <p className="mt-6 text-center text-[11px] text-white/30 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="#" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="text-white/50 hover:text-white/70 underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </motion.div>
  );
}
