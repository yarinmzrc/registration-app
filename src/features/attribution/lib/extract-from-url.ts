import { ATTRIBUTION_KEYS, ATTRIBUTION_PREFIX } from "../constants";
import type { AttributionParams } from "../types";

export function extractAttributionParams(
  searchParams: URLSearchParams,
): AttributionParams {
  const params: AttributionParams = {};

  searchParams.forEach((value, key) => {
    const isTracked =
      key.startsWith(ATTRIBUTION_PREFIX) ||
      (ATTRIBUTION_KEYS as readonly string[]).includes(key);

    if (isTracked && value !== "") {
      params[key] = value;
    }
  });

  return params;
}
