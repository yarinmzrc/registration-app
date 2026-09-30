import { Navigate, useLocation } from "react-router";
import { registerRedirectPath, useAuth } from "@/features/auth";
import { useModal } from "../hooks/use-modal";
import type { OpenModal } from "../types";
import { InviteModal } from "./invite-modal";
import { PromoModal } from "./promo-modal";
import { SignupModal } from "./signup-modal";
import { WelcomeModal } from "./welcome-modal";

export function ModalRenderer() {
  const { openModals } = useModal();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (openModals.length === 0) return null;

  // Unauthenticated users never see a modal — they're sent to /register,
  // carrying the original URL so the modal opens after they sign up.
  if (!isAuthenticated) {
    return (
      <Navigate
        to={registerRedirectPath(location.pathname + location.search)}
        replace
      />
    );
  }

  // Only the top of the stack is mounted: dialogs that mount together each
  // mark the other inert, leaving none of them usable.
  const top = openModals.at(-1);
  if (!top) return null;

  return <ModalFor key={top.type} modal={top} />;
}

function ModalFor({ modal }: { modal: OpenModal }) {
  switch (modal.type) {
    case "welcome":
      return <WelcomeModal />;
    case "promo":
      return <PromoModal code={modal.value} />;
    case "invite":
      return <InviteModal friendId={modal.value} />;
    case "signup":
      return <SignupModal />;
    default: {
      const _exhaustive: never = modal.type;
      return _exhaustive;
    }
  }
}
