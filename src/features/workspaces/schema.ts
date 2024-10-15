import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(2, "Поле обовязкове!"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = z.object({
  name: z.string().trim().min(2, "Мінімум 2 символа!").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;
