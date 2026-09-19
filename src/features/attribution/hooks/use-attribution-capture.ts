import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAuth } from "@/features/auth";
import { extractAttributionParams } from "../lib/extract-from-url";
import { resolveAttribution } from "../lib/resolve-attribution";
import { readAttribution, writeAttribution } from "../lib/storage";

export function useAttributionCapture(): void {
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  // Re-runs on every query-string change, so cold loads, back/forward and
  // in-app navigations are all captured. resolveAttribution is idempotent,
  // which makes repeated runs (and StrictMode double effects) safe.
  //
  // Each effect closes over its own render's `search`, so a landing URL like
  // /?promo=X&utm_source=fb is captured even though the modal renderer
  // redirects to /register in the same commit.
  useEffect(() => {
    const next = resolveAttribution({
      stored: readAttribution(),
      incoming: extractAttributionParams(new URLSearchParams(search)),
      now: Date.now(),
      hasRegistered: isAuthenticated,
    });

    if (next) writeAttribution(next);
  }, [search, isAuthenticated]);
}
