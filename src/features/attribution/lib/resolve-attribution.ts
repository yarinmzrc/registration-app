import { ATTRIBUTION_WINDOW_MS } from "../constants";
import type { Attribution, AttributionParams } from "../types";

type Args = {
  stored: Attribution | null;
  incoming: AttributionParams;
  now: number;
  hasRegistered: boolean;
};

/**
 * Decides what should be persisted.
 * Returns the value to write, or null to leave storage untouched.
 */
export function resolveAttribution({
  stored,
  incoming,
  now,
  hasRegistered,
}: Args): Attribution | null {
  // Attribution is consumed at registration; registered users aren't re-captured.
  if (hasRegistered) return null;

  // Nothing to capture on this visit.
  if (Object.keys(incoming).length === 0) return null;

  // First touch.
  if (!stored) return { params: incoming, capturedAt: now };

  // Within 30 days: first-touch wins, new params are ignored.
  if (now - stored.capturedAt < ATTRIBUTION_WINDOW_MS) return null;

  // Past 30 days and still not registered: overwrite and reset the clock.
  return { params: incoming, capturedAt: now };
}
