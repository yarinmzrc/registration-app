import { FLAG_MODALS, FLAG_VALUE, MODAL_PARAMS } from "../constants";
import type { ModalType, OpenModal } from "../types";

const TYPE_BY_PARAM = new Map(
  (Object.entries(MODAL_PARAMS) as [ModalType, string][]).map(
    ([type, param]) => [param, type],
  ),
);

function isValidValue(type: ModalType, value: string | null): value is string {
  if (value === null) return false;
  // ?welcome=1 opens; ?welcome=0 / ?welcome= don't.
  if (FLAG_MODALS.has(type)) return value === FLAG_VALUE;
  // ?promo= with no code has nothing to show.
  return value.trim() !== "";
}

/**
 * The modal stack, bottom → top. Query-param order is push order:
 * openModal() appends its param, so the last one in the URL is on top.
 */
export function parseModalParams(searchParams: URLSearchParams): OpenModal[] {
  const stack: OpenModal[] = [];
  const seen = new Set<ModalType>();

  for (const key of searchParams.keys()) {
    const type = TYPE_BY_PARAM.get(key);
    if (!type || seen.has(type)) continue;
    seen.add(type);

    const value = searchParams.get(key);
    if (isValidValue(type, value)) stack.push({ type, value });
  }

  return stack;
}
