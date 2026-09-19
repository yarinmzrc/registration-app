import { UserPlus } from "lucide-react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "../hooks/use-modal";

export function InviteModal({ friendId }: { friendId: string }) {
  const { closeModal } = useModal();

  return (
    <Modal
      icon={<UserPlus />}
      title="Your friend invited you"
      description={`Friend ${friendId} has invited you to join their account.`}
      onClose={() => closeModal("invite")}
      footer={
        <Button
          size="lg"
          onClick={() => closeModal("invite")}
          className="min-w-32"
        >
          Got it
        </Button>
      }
    />
  );
}
