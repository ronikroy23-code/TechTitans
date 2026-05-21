import { motion, AnimatePresence } from "framer-motion";
import {
  getPasswordStrength,
  strengthColors,
  strengthLabels,
} from "../utils/validation";

type Props = {
  password: string;
  visible: boolean;
};

export default function PasswordStrengthIndicator({ password, visible }: Props) {
  const strength = getPasswordStrength(password);

  return (
    <AnimatePresence>
      {visible && password.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="flex gap-1.5 mt-2 mb-1">
            {[1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  level <= strength ? strengthColors[strength] : "bg-white/10"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: level * 0.05, duration: 0.2 }}
                style={{ originX: 0 }}
              />
            ))}
          </div>
          <motion.p
            key={strength}
            className="text-xs text-white/40"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {strengthLabels[strength]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
