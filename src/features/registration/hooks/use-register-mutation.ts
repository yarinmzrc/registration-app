import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/features/auth";
import { clearAttribution } from "@/features/attribution";
import { safeReturnTo } from "@/lib";
import { registerUser } from "../api/register-user";
import type { RegisterInput } from "../schema";
import type { RegisterResponse } from "../types";

export function useRegisterMutation() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: registerUser,
    onSuccess: (session) => {
      // Only clear once the POST succeeded — a failed attempt keeps
      // attribution so a retry still sends it.
      clearAttribution();
      login(session);
      toast.success("Account created", {
        description: `Welcome, ${session.user.email}`,
      });
      navigate(safeReturnTo(searchParams.get("returnTo")) ?? "/account", {
        replace: true,
      });
    },
    onError: (error) => {
      toast.error("Registration failed", { description: error.message });
    },
  });
}
