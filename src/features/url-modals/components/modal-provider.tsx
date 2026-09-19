import { useMemo } from "react";
import { ModalContext, type ModalContextValue } from "../context/modal-context";
import { useModalParams } from "../hooks/use-modal-params";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { openModals, open, close } = useModalParams();

  const value = useMemo<ModalContextValue>(
    () => ({
      openModals,
      openModal: ({ type, params }) => open(type, params),
      closeModal: close,
    }),
    [openModals, open, close],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
