import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email("Невалідний адрес!"),
  password: z.string().min(1, "Поле обовязкове!"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Поле обовязкове!"),
  email: z.string().trim().email("Невалідний адрес!"),
  password: z.string().min(1, "Поле обовязкове!"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
