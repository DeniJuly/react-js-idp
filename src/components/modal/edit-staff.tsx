"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormSchema } from "@/data/zodSchema/staff";
import * as z from "zod";
import useSWR, { mutate } from "swr";
import { Staff } from "@/types/data-types";
import { updStaff } from "@/data/actions/staff-action";
import toast from "react-hot-toast";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idStaff: number;
}
type FormData = z.infer<typeof staffFormSchema>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EditStaff = ({ openModal, handleClose, idStaff }: DataTableProps) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/${idStaff}`,
    fetcher
  );
  const [status, setStatus] = useState(data?.data?.status === "active");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(staffFormSchema),
  });
  useEffect(() => {
    if (data?.data) {
      reset({
        nama: data.data.name,
        tanggal_lahir: data.data.dob ? data.data.dob.substring(0, 10) : "",
        alamat: data.data.address,
        nik: data.data.karyawanDetail?.nik,
        npwp: data.data.karyawanDetail?.npwp,
      });
      setStatus(data.data.status === "active");
    }
  }, [data, reset]);
  const submitStaff = async (form: FormData) => {
    const param: Staff = {
      id: data.data.id,
      name: form.nama,
      dob: form.tanggal_lahir,
      status: status ? "active" : "not-active",
      address: form.alamat,
      karyawanDetail: {
        nik: form.nik.toString(),
        npwp: form.npwp.toString(),
      },
    };
    try {
      const res = await updStaff(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menyimpan karyawan");
        reset();
        handleClose(false);
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
    <ResponsiveFormDialog
      open={openModal}
      title="Edit Data Pegawai"
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
            placeholder="Masukkan nama pegawai"
            name="nama"
          />
          {errors?.nama && (
            <p className="text-red-500 text-sm">{errors?.nama?.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
          <Input
            {...register("tanggal_lahir", { required: true })}
            type="date"
            id="tanggal_lahir"
            placeholder="Masukkan tanggal lahir pegawai"
            name="tanggal_lahir"
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
            placeholder="Masukkan NIK pegawai"
            name="nik"
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
            name="npwp"
          />
          {errors?.npwp && (
            <p className="text-red-500 text-sm">{errors?.npwp?.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="alamat">Alamat</Label>
          <Textarea
            {...register("alamat", { required: true })}
            id="alamat"
            placeholder="Masukkan alamat pegawai"
            name="alamat"
          />
          {errors?.alamat && (
            <p className="text-red-500 text-sm">{errors?.alamat?.message}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="status"
            name="status"
            checked={status}
            onCheckedChange={(val) => setStatus(val)}
          />
          <Label htmlFor="status" className="cursor-pointer">
            Pegawai Aktif?
          </Label>
        </div>
      </div>
    </ResponsiveFormDialog>
  );
};

export default EditStaff;
