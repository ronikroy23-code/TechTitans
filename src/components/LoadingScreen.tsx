import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOADING_WORDS = ["Initializing EduAI", "Mapping your syllabus", "Preparing AI guidance"];

type Props = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((i) => (i + 1) % LOADING_WORDS.length);
    }, 900);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 4 + Math.random() * 8, 100));
    }, 120);

    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 400);
    }, 1200);

    return () => {
      clearInterval(wordTimer);
      clearInterval(progressTimer);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path
              d="M8 20L16 8l8 12"
              stroke="url(#loadGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="22" r="2" fill="#8B5CF6" />
            <defs>
              <linearGradient id="loadGrad" x1="8" y1="8" x2="24" y2="20">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        <motion.div
          className="absolute -inset-2 rounded-3xl border border-violet-500/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      <motion.h1
        className="text-2xl sm:text-3xl font-semibold tracking-tight text-gradient mb-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        EduAI
      </motion.h1>

      <div className="h-6 overflow-hidden mb-8">
        <motion.p
          key={wordIndex}
          className="text-sm text-white/50 font-medium tracking-wide"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {LOADING_WORDS[wordIndex]}…
        </motion.p>
      </div>

      <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400"
          style={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </motion.div>
  );
}
