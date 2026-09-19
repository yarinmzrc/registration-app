export type ModalType = "welcome" | "promo" | "invite" | "signup";

export type OpenModal = {
  type: ModalType;
  /** The param's value: "1" for flags, a code or id for promo/invite. */
  value: string;
};

export type OpenModalArgs = { type: ModalType; params?: string };
