import { IdCard } from "lucide-react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "../hooks/use-modal";

export function SignupModal() {
  const { closeModal } = useModal();

  return (
    <Modal
      icon={<IdCard />}
      title="Registration"
      description="Your registration is all set. Enjoy the games."
      onClose={() => closeModal("signup")}
      footer={
        <Button
          size="lg"
          onClick={() => closeModal("signup")}
          className="min-w-32"
        >
          Got it
        </Button>
      }
    />
  );
}
