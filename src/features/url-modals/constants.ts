import type { ModalType } from "./types";

/** Query param that drives each modal. */
export const MODAL_PARAMS: Record<ModalType, string> = {
  welcome: "welcome",
  promo: "promo",
  invite: "invite",
  signup: "signup",
};

/** Modals opened by `=1`; the others carry a value (promo code, friend id). */
export const FLAG_MODALS: ReadonlySet<ModalType> = new Set([
  "welcome",
  "signup",
]);

export const FLAG_VALUE = "1";
