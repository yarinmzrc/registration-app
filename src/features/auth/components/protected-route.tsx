import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { registerRedirectPath } from "../lib/register-redirect";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={registerRedirectPath(location.pathname + location.search)}
        replace
      />
    );
  }

  return <>{children}</>;
}
