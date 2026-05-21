import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
};

export default function AnimatedInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
}: Props) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-white/50 tracking-wide">
        {label}
      </label>
      <motion.div
        className={`relative rounded-xl bg-white/[0.04] border transition-colors duration-200 input-glow ${
          error ? "border-red-400/50" : focused ? "border-violet-500/40" : "border-white/10"
        }`}
        whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
      >
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none rounded-xl"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white/70 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
        <AnimatePresence>
          {error && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 00-.75.75v4a.75.75 0 001.5 0v-4A.75.75 0 008 4.5zm0 7a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-xs text-red-400/90"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
