import type { AuthError } from "@supabase/supabase-js";

export function mapAuthError(error: AuthError): string {
  const msg = error.message.toLowerCase();

  if (msg.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }
  if (msg.includes("user already registered")) {
    return "An account with this email already exists. Try logging in.";
  }
  if (msg.includes("email not confirmed")) {
    return "Please confirm your email before signing in. Check your inbox.";
  }
  if (msg.includes("password") && msg.includes("weak")) {
    return "Password is too weak. Use at least 8 characters with mixed characters.";
  }
  if (msg.includes("rate limit") || msg.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (msg.includes("signup is disabled")) {
    return "Sign up is currently disabled. Contact support.";
  }

  return error.message;
}
