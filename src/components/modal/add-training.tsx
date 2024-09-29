import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import * as z from "zod";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Training } from "@/types/data-types";
import { addTraining } from "@/data/actions/training-action";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { trainingFormSchema } from "@/data/zodSchema/training";

type FormData = z.infer<typeof trainingFormSchema>;
const AddTraining = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(trainingFormSchema),
  });
  const handleClose = (status: boolean) => {
    setOpenDialog(status);
  };
  const submitTraining = async (data: FormData) => {
    const param: Training = {
      tema: data.tema,
      pengajar: data.pengajar,
    };
    console.table([param]);
    try {
      const res = await addTraining(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menambahkan training");
        reset();
        setOpenDialog(false);
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}v1/training/list?page=0&size=10`
        );
      } else {
        throw new Error(res.data?.message);
      }
    } catch (error: any) {
      toast.error(
        error.message || "Terjadi kesalahan, coba beberapa saat lagi"
      );
    }
  };
  console.log("error", errors);
  return (
    <>
      <Button onClick={() => setOpenDialog(true)} variant="default">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        Tambah
      </Button>
      <ResponsiveFormDialog
        open={openDialog}
        title="Tambah Data Pelatihan"
        handleClose={handleClose}
        onSubmit={handleSubmit(submitTraining)}
        loadingSubmit={isSubmitting}
      >
        <div className="flex flex-col gap-4 pb-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tema">Tema</Label>
            <Input
              {...register("tema", { required: true })}
              type="text"
              id="tema"
              placeholder="Masukkan tema pelatihan"
            />
            {errors?.tema && (
              <p className="text-red-500 text-sm">{errors?.tema?.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="pengajar">Pengajar</Label>
            <Input
              {...register("pengajar", { required: true })}
              type="text"
              id="pengajar"
              placeholder="Masukkan nama pengajar"
            />
            {errors?.pengajar && (
              <p className="text-red-500 text-sm">
                {errors?.pengajar?.message}
              </p>
            )}
          </div>
        </div>
      </ResponsiveFormDialog>
    </>
  );
};

export default AddTraining;
