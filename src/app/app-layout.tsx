import { Link, NavLink, Outlet, useLocation } from "react-router";
import { cn } from "@/lib";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth";

const NAV = [
  // The wordmark already links home, so "Home" is dropped on narrow screens.
  { to: "/", label: "Home", end: true, className: "hidden sm:inline-flex" },
  { to: "/account", label: "Account", end: false, className: "" },
];

export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
          <Link
            to="/"
            aria-label="RealPlay home"
            className="flex items-center"
          >
            <Wordmark />
          </Link>

          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    item.className,
                    isActive && "bg-secondary text-secondary-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <HeaderAction />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <Outlet />
      </main>

      <footer className="bg-brand-ink text-white/70">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:flex-row">
          <Wordmark inverted />
          <p>© {new Date().getFullYear()} RealPlay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function HeaderAction() {
  const { session } = useAuth();
  const { pathname } = useLocation();

  if (session) {
    return (
      <span
        className="ml-2 hidden max-w-48 truncate rounded-full border px-3 py-1.5 text-xs text-muted-foreground sm:inline"
        title={session.user.email}
      >
        {session.user.email}
      </span>
    );
  }

  // Already on the sign-up form.
  if (pathname === "/register") return null;

  return (
    <Link to="/register" className={cn(buttonVariants(), "ml-2")}>
      Sign up
    </Link>
  );
}

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="brand-caps text-sm">
      <span className={inverted ? "text-white" : "text-primary"}>Real</span>
      <span className={inverted ? "text-brand-cyan" : "text-foreground"}>
        Play
      </span>
    </span>
  );
}
