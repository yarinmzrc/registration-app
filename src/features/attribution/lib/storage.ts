import { ATTRIBUTION_STORAGE_KEY } from "../constants";
import type { Attribution } from "../types";

export function readAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Attribution;

    // Guard against hand-edited or stale-shaped storage
    if (
      typeof parsed?.capturedAt !== "number" ||
      typeof parsed?.params !== "object" ||
      parsed.params === null
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeAttribution(attribution: Attribution): void {
  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // storage unavailable (private mode, quota) — non-fatal
  }
}

export function clearAttribution(): void {
  try {
    localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    /* no-op */
  }
}
