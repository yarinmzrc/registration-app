import { Toaster } from "@/components/ui/sonner";
import { AttributionCapture } from "@/features/attribution";
import { AuthProvider } from "@/features/auth";
import { ModalProvider, ModalRenderer } from "@/features/url-modals";
import { AppRoutes } from "./app-routes";

export function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        {/* Must stay before ModalRenderer so capture runs before its redirect. */}
        <AttributionCapture />
        <ModalRenderer />
        <AppRoutes />
        <Toaster />
      </ModalProvider>
    </AuthProvider>
  );
}
