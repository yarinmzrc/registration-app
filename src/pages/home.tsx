import { ArrowRight, Sparkles, TicketPercent, UserPlus } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth";
import { cn } from "@/lib";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Welcome bonus",
    body: "Start with a warm welcome and a head start the moment you join.",
  },
  {
    icon: TicketPercent,
    title: "Promo codes",
    body: "Redeem codes from our campaigns and partners straight from a link.",
  },
  {
    icon: UserPlus,
    title: "Invite friends",
    body: "Games are better together. Accept invites and bring your crew.",
  },
];

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-12">
      <section className="brand-surface relative overflow-hidden rounded-3xl px-6 py-16 sm:px-12 sm:py-24">
        <p className="brand-caps text-xs text-brand-cyan">Play Tech</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight font-extrabold tracking-tight uppercase sm:text-5xl">
          Games with a fun twist
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/75 sm:text-lg">
          Innovative social games built for valued entertainment. Create your
          free account and jump in.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {isAuthenticated ? (
            <Link to="/account" className={buttonVariants({ size: "lg" })}>
              Go to your account <ArrowRight data-icon="inline-end" />
            </Link>
          ) : (
            <Link to="/register" className={buttonVariants({ size: "lg" })}>
              Get started <ArrowRight data-icon="inline-end" />
            </Link>
          )}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-16 size-72 rounded-full border-28 border-white/5"
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className={cn(
              "rounded-2xl bg-card p-6 ring-1 ring-foreground/5 transition-shadow",
              "hover:shadow-glow",
            )}
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon className="size-5" />
            </div>
            <h2 className="mt-4 text-sm font-bold tracking-[0.15em] uppercase">
              {title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
