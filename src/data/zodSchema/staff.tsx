import z from "zod";

export const staffFormSchema = z.object({
  nama: z
    .string({
      message: "Nama harus diisi",
    })
    .min(4, "Nama minimal 4 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  nik: z
    .number({
      message: "NIK harus diisi",
    })
    .min(16, "NIK minimal 16 karakter"),
  tanggal_lahir: z
    .string({
      message: "Tanggal lahir harus diisi",
    })
    .date("Tanggal lahir tidak valid"),
  npwp: z
    .number({
      message: "NPWP harus diisi",
    })
    .min(16, "NPWP minimal 16 karakter"),
  alamat: z.string({
    message: "Alamat harus diisi",
  }),
});
