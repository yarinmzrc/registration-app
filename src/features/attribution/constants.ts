export const ATTRIBUTION_STORAGE_KEY = "attribution:data";

/** Exact keys to capture, plus any param starting with "utm_". */
export const ATTRIBUTION_KEYS = ["ref", "gclid", "fbclid"] as const;
export const ATTRIBUTION_PREFIX = "utm_";

/** First-touch window: 30 days in ms. */
export const ATTRIBUTION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
