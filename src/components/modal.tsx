import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
};

export function Modal({
  title,
  description,
  icon,
  children,
  footer,
  onClose,
}: ModalProps) {
  return (
    // Always open: the URL decides whether this is mounted at all.
    // Escape and backdrop clicks flow through onOpenChange -> onClose -> URL.
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl shadow-brand-deep/30 sm:max-w-md *:data-[slot=dialog-close]:text-white *:data-[slot=dialog-close]:hover:bg-white/15 *:data-[slot=dialog-close]:hover:text-white">
        <div className="brand-surface flex h-28 items-center justify-center">
          {icon && (
            <div className="flex size-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur [&_svg]:size-7 [&_svg]:text-brand-cyan">
              {icon}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 px-6 pb-6">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
          {footer && (
            <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0 sm:justify-center">
              {footer}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
