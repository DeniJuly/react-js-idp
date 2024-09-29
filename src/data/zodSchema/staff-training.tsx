import z from "zod";

export const staffTrainingFormSchema = z.object({
  training_date: z.string({ message: "Tanggal Pelatihan harus diisi" }),
});

export type User = z.infer<typeof staffTrainingFormSchema>;
