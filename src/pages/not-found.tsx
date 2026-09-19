import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="bg-linear-to-br from-primary to-brand-cyan bg-clip-text font-heading text-8xl font-extrabold text-transparent">
        404
      </p>
      <h1 className="text-2xl font-bold uppercase">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className={buttonVariants({ size: "lg" })}>
        Back to home
      </Link>
    </div>
  );
}
