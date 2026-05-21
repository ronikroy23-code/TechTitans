import { useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  primary: "btn-premium text-white",
  secondary:
    "bg-white/[0.04] border border-white/15 text-white/90 hover:bg-white/[0.08] hover:border-white/25",
  ghost: "text-white/60 hover:text-white hover:bg-white/[0.05]",
};

export default function RippleButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: Props) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [
      ...r,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 600);
    onClick?.();
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={`relative overflow-hidden px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            animationDuration: "0.6s",
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
