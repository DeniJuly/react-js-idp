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

export const signUpSchema = z.object({
  name: z
    .string({
      message: "Nama harus diisi",
    })
    .min(4, "Minimal 4 karakter")
    .max(100, "Maksimal 100 karakter"),
  phone_number: z
    .string({
      message: "Nomor Telepon harus diisi",
    })
    .min(10, "Minimal Nomor Telepon 10 karakter"),
  domicile: z.string({
    message: "Domisili harus diisi",
  }),
  gender: z.enum(["Laki-Laki", "Perempuan"], {
    message: "Jenis Kelamin harus diisi",
  }),
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
