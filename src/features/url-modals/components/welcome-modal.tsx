import { Sparkles } from "lucide-react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "../hooks/use-modal";

export function WelcomeModal() {
  const { closeModal } = useModal();

  return (
    <Modal
      icon={<Sparkles />}
      title="Welcome"
      description="Thanks for signing up for our beta."
      onClose={() => closeModal("welcome")}
      footer={
        <Button
          size="lg"
          onClick={() => closeModal("welcome")}
          className="min-w-32"
        >
          Got it
        </Button>
      }
    />
  );
}
