import z from "zod";

export const rekeningFormSchema = z.object({
  bank: z
    .string({
      message: "Bank harus diisi",
    })
    .min(3, "Bank minimal 3 karakter")
    .max(100, "Bank maksimal 100 karakter"),
  nama: z
    .string({
      message: "Nama harus diisi",
    })
    .min(4, "Nama minimal 4 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  norek: z.number({
    message: "Nomor Rekening harus diisi",
  }),
});

export type User = z.infer<typeof rekeningFormSchema>;
