import { safeReturnTo } from "@/lib";

/**
 * Where to send an unauthenticated user: /register, carrying the current
 * URL so they land back on it (modal params included) after signing up.
 */
export function registerRedirectPath(current: string): string {
  const returnTo = safeReturnTo(current) ?? "/";
  return `/register?returnTo=${encodeURIComponent(returnTo)}`;
}
