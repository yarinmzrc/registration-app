import { useCallback, useMemo, useState } from "react";
import { AuthContext, type AuthContextValue } from "../context/auth-context";
import { clearSession, readSession, writeSession } from "../lib/storage";
import type { Session } from "../types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback((s: Session) => {
    writeSession(s);
    setSession(s);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ session, isAuthenticated: session !== null, login, logout }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
