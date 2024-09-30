import z from "zod";

export const trainingFormSchema = z.object({
  tema: z
    .string({
      message: "Tema harus diisi",
    })
    .min(4, "Tema minimal 4 karakter")
    .max(100, "Tema maksimal 100 karakter"),
  pengajar: z
    .string({
      message: "Pengarang harus diisi",
    })
    .min(4, "Pengarang minimal 4 karakter")
    .max(100, "Pengarang maksimal 100 karakter"),
});
