import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
