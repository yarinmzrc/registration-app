import type { Session } from "@/features/auth";
import type { Attribution } from "@/features/attribution";
import type { RegisterInput } from "./schema";

export type RegisterPayload = RegisterInput & {
  attribution: Attribution | null;
};

export type RegisterResponse = Session;
