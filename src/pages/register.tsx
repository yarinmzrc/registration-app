import { Gift, ShieldCheck, Users } from "lucide-react";
import { Navigate, useSearchParams } from "react-router";
import { useAuth } from "@/features/auth";
import { RegisterForm } from "@/features/registration";
import { safeReturnTo } from "@/lib";

const PERKS = [
  { icon: Gift, text: "Welcome bonus on your first visit" },
  { icon: Users, text: "Play and share with friends" },
  { icon: ShieldCheck, text: "Secure account, cancel anytime" },
];

export function Register() {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();

  if (isAuthenticated) {
    // Honour returnTo so this can never race the mutation's own redirect
    // and drop the user on /account instead of the modal URL they came from.
    const to = safeReturnTo(searchParams.get("returnTo")) ?? "/account";
    return <Navigate to={to} replace />;
  }

  return (
    <div className="grid overflow-hidden rounded-3xl bg-card shadow-xl shadow-brand-deep/5 ring-1 ring-foreground/5 md:grid-cols-2">
      <section className="brand-surface flex flex-col justify-between gap-10 p-8 sm:p-10">
        <div>
          <p className="brand-caps text-xs text-brand-cyan">Join RealPlay</p>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold uppercase sm:text-4xl">
            Your next favourite game is waiting
          </h1>
          <p className="mt-3 text-white/75">
            Create a free account to unlock bonuses, promo codes and invites.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {PERKS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <Icon className="size-4 text-brand-cyan" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center p-2 sm:p-6">
        <RegisterForm />
      </div>
    </div>
  );
}
