/**
 * Validates a `returnTo` value from the URL before navigating to it.
 * Only same-origin relative paths are allowed, so `?returnTo=https://evil.com`
 * can't turn the register page into an open redirect.
 */
export function safeReturnTo(value: string | null | undefined): string | null {
  if (!value) return null;

  // Must be a rooted path: "/", "/account", "/?promo=X"
  if (!value.startsWith("/")) return null;

  // "//evil.com" is protocol-relative — the browser treats it as absolute
  if (value.startsWith("//")) return null;

  // "/\evil.com" — some browsers normalise the backslash to "/"
  if (value.startsWith("/\\")) return null;

  return value;
}
