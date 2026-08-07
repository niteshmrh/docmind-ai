import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(100, "Name is too long"),
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").max(50, "Password is too long"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Zod derives the TypeScript type from the schema:
// This means the validation rules and the TypeScript type stay in sync.
export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;