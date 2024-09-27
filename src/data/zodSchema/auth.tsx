import z from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      message: "Email harus diisi",
    })
    .email("Email tidak valid"),
  password: z
    .string({
      message: "Password harus diisi",
    })
    .min(8, "Password minimal 8 karakter"),
});

export type User = z.infer<typeof signInSchema>;
