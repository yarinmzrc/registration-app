import { TicketPercent } from "lucide-react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "../hooks/use-modal";

export function PromoModal({ code }: { code: string }) {
  const { closeModal } = useModal();

  return (
    <Modal
      icon={<TicketPercent />}
      title="Your promo code"
      description="This code has been applied to your account."
      onClose={() => closeModal("promo")}
      footer={
        <Button
          size="lg"
          className="min-w-32"
          onClick={() => closeModal("promo")}
        >
          Got it
        </Button>
      }
    >
      <p className="mx-auto rounded-full border border-dashed border-primary/40 bg-secondary px-5 py-2 font-mono text-base font-semibold tracking-widest text-secondary-foreground">
        {code}
      </p>
    </Modal>
  );
}
