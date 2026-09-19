import { createContext } from "react";
import type { Session } from "../types";

export type AuthContextValue = {
  session: Session | null;
  isAuthenticated: boolean;
  login: (s: Session) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
