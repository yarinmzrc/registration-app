import type { Session } from "@/features/auth";
import type { AttributionParams } from "@/features/attribution";
import type { RegisterInput } from "./schema";

export type RegisterPayload = RegisterInput & {
  attribution: AttributionParams | null;
};

export type RegisterResponse = Session;
