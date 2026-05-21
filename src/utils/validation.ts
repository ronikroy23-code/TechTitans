export type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Enter a valid email address";
  return undefined;
}

export function validatePassword(password: string, isSignup: boolean): string | undefined {
  if (!password) return "Password is required";
  if (isSignup && password.length < 8) return "At least 8 characters";
  return undefined;
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string | undefined {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return undefined;
}

export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return Math.min(4, Math.max(1, Math.ceil(score * 0.8))) as PasswordStrength;
}

export const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"] as const;
export const strengthColors = [
  "bg-white/10",
  "bg-red-400",
  "bg-amber-400",
  "bg-cyan-400",
  "bg-emerald-400",
] as const;
