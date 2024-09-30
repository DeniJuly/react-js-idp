import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormSchema } from "@/data/zodSchema/staff";
import * as z from "zod";
import { addStaff } from "@/data/actions/staff-action";
import toast from "react-hot-toast";
import { Staff } from "@/types/data-types";
import { mutate } from "swr";
type FormData = z.infer<typeof staffFormSchema>;

const AddStaff = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(staffFormSchema),
  });
  const handleClose = (status: boolean) => {
    setOpenDialog(status);
  };
  const submitStaff = async (data: FormData) => {
    const param: Staff = {
      name: data.nama,
      dob: data.tanggal_lahir,
      status: status ? "active" : "not-active",
      address: data.alamat,
      karyawanDetail: {
        nik: data.nik.toString(),
        npwp: data.npwp.toString(),
      },
    };
    try {
      const res = await addStaff(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menyimpan data pegawai");
        reset();
        setOpenDialog(false);
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/list?page=0&size=10`
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
        title="Tambah Data Pegawai"
        handleClose={handleClose}
        onSubmit={handleSubmit(submitStaff)}
        loadingSubmit={isSubmitting}
      >
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="nama">Nama</Label>
            <Input
              {...register("nama", { required: true })}
              type="text"
              id="nama"
              name="nama"
              placeholder="Masukkan nama pegawai"
            />
            {errors?.nama && (
              <p className="text-red-500 text-sm">{errors?.nama?.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
            <Input
              {...register("tanggal_lahir", { required: true })}
              name="tanggal_lahir"
              type="date"
              id="tanggal_lahir"
              placeholder="Masukkan tanggal lahir"
            />
            {errors?.tanggal_lahir && (
              <p className="text-red-500 text-sm">
                {errors?.tanggal_lahir?.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="nik">NIK</Label>
            <Input
              {...register("nik", { required: true, valueAsNumber: true })}
              type="number"
              id="nik"
              placeholder="Masukkan nik pegawai"
            />
            {errors?.nik && (
              <p className="text-red-500 text-sm">{errors?.nik?.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="npwp">NPWP</Label>
            <Input
              {...register("npwp", { required: true, valueAsNumber: true })}
              type="number"
              id="npwp"
              placeholder="Masukkan NPWP pegawai"
            />
            {errors?.npwp && (
              <p className="text-red-500 text-sm">{errors?.npwp?.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea
              {...register("alamat", { required: true })}
              name="alamat"
              id="alamat"
              placeholder="Masukkan alamat pegawai"
            />
            {errors?.alamat && (
              <p className="text-red-500 text-sm">{errors?.alamat?.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={status}
              onCheckedChange={(value) => setStatus(value)}
              name="status"
              id="status"
            />
            <Label htmlFor="status" className="cursor-pointer">
              Pegawai Aktif?
            </Label>
          </div>
        </div>
      </ResponsiveFormDialog>
    </>
  );
};

export default AddStaff;
