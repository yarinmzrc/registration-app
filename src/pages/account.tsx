import { LogOut, Sparkles, TicketPercent, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth";
import { useModal, type OpenModalArgs } from "@/features/url-modals";

const DEMO_MODALS: {
  label: string;
  icon: typeof Sparkles;
  args: OpenModalArgs;
}[] = [
  { label: "Welcome", icon: Sparkles, args: { type: "welcome" } },
  {
    label: "Promo",
    icon: TicketPercent,
    args: { type: "promo", params: "SAVE10" },
  },
  { label: "Invite", icon: UserPlus, args: { type: "invite", params: "f42" } },
];

export function Account() {
  const { session, logout } = useAuth();
  const { openModal } = useModal();

  const email = session?.user.email ?? "";

  return (
    <div className="flex flex-col gap-6">
      <section className="brand-surface flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl font-bold uppercase ring-2 ring-brand-cyan/60">
            {email.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="brand-caps text-xs text-brand-cyan">Account</p>
            <h1 className="truncate text-2xl font-bold">{email}</h1>
          </div>
        </div>

        {/* Logging out makes ProtectedRoute redirect to /register. */}
        <Button
          variant="outline"
          onClick={logout}
          className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          <LogOut data-icon="inline-start" />
          Log out
        </Button>
      </section>

      <section className="rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
        <h2 className="text-sm font-bold tracking-[0.15em] uppercase">
          Preview the modals
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each one is driven by a query param, so you can also open it from any
          URL.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {DEMO_MODALS.map(({ label, icon: Icon, args }) => (
            <Button
              key={label}
              variant="secondary"
              onClick={() => openModal(args)}
            >
              <Icon data-icon="inline-start" />
              {label}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
