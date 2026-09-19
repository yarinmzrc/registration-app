import { readAttribution } from "@/features/attribution";
import type { RegisterInput } from "../schema";
import type { RegisterPayload, RegisterResponse } from "../types";

export async function registerUser(
  input: RegisterInput,
): Promise<RegisterResponse> {
  const payload: RegisterPayload = {
    ...input,
    attribution: readAttribution(),
  };

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || "Registration failed");
  }

  return (await res.json()) as RegisterResponse;
}
