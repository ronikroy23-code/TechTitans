import { motion } from "framer-motion";
import { useMousePosition } from "../../hooks/useMousePosition";

export default function MouseGlow() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1]"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: x,
          top: y,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)",
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
      />
    </motion.div>
  );
}
