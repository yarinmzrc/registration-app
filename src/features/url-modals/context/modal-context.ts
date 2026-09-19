import { createContext } from "react";
import type { ModalType, OpenModal, OpenModalArgs } from "../types";

export type ModalContextValue = {
  openModals: OpenModal[];
  openModal: (args: OpenModalArgs) => void;
  closeModal: (type: ModalType) => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);
