"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { trainingFormSchema } from "@/data/zodSchema/training";
import * as z from "zod";
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Training } from "@/types/data-types";
import { updTraining } from "@/data/actions/training-action";
import toast from "react-hot-toast";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idTraining: number;
}
type FormData = z.infer<typeof trainingFormSchema>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditTraining = ({
  openModal,
  handleClose,
  idTraining,
}: DataTableProps) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/${idTraining}`,
    fetcher
  );
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(trainingFormSchema),
  });
  useEffect(() => {
    if (data?.data) {
      reset({
        tema: data.data.tema,
        pengajar: data.data.pengajar,
      });
    }
  }, [data, reset]);
  const submitTraining = async (form: FormData) => {
    const param: Training = {
      id: data.data.id,
      tema: form.tema,
      pengajar: form.pengajar,
    };
    try {
      const res = await updTraining(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menyimpan training");
        reset();
        handleClose(false);
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
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Edit Data Pelatihan"
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
            name="tema"
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="nik">Pengajar</Label>
          <Input
            {...register("pengajar", { required: true })}
            type="text"
            id="pengajar"
            placeholder="Masukkan pengajar pengajar"
            name="pengajar"
          />
        </div>
      </div>
    </ResponsiveFormDialog>
  );
};

export default EditTraining;
