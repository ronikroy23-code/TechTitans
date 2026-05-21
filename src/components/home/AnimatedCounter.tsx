import { useEffect, useState } from "react";
import { useSpring, useTransform, useMotionValueEvent } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  active: boolean;
};

export default function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  active,
}: Props) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );

  useEffect(() => {
    if (active) spring.set(value);
  }, [active, value, spring]);

  const [text, setText] = useState("0");

  useMotionValueEvent(display, "change", (v) => setText(String(v)));

  return (
    <span className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}
