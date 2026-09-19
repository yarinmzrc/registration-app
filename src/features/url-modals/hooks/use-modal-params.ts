import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { FLAG_VALUE, MODAL_PARAMS } from "../constants";
import { parseModalParams } from "../lib/parse-modal-params";
import type { ModalType } from "../types";

export function useModalParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derived from the URL — no mirrored state, so cold load,
  // back/forward and in-app navigation all behave identically.
  const openModals = useMemo(
    () => parseModalParams(searchParams),
    [searchParams],
  );

  const open = useCallback(
    (type: ModalType, value = FLAG_VALUE) => {
      setSearchParams(
        (prev) => {
          // Delete then append so a re-opened modal moves to the top.
          const next = new URLSearchParams(prev);
          next.delete(MODAL_PARAMS[type]);
          next.append(MODAL_PARAMS[type], value);
          return next;
        },
        { replace: false }, // opening a modal is a history entry
      );
    },
    [setSearchParams],
  );

  const close = useCallback(
    (type: ModalType) => {
      setSearchParams(
        (prev) => {
          // Copy first: only this modal's param is removed,
          // every other param (including utm_*) survives.
          const next = new URLSearchParams(prev);
          next.delete(MODAL_PARAMS[type]);
          return next;
        },
        { replace: true }, // closing shouldn't add a history entry
      );
    },
    [setSearchParams],
  );

  return { openModals, open, close };
}
