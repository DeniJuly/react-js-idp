"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { RekeningForm, Staff } from "@/types/data-types";
import { Check, ChevronsUpDown } from "lucide-react";
import * as z from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import useSWR, { mutate } from "swr";
import { rekeningFormSchema } from "@/data/zodSchema/rekening";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updRekening } from "@/data/actions/rekening-action";
import toast from "react-hot-toast";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idRekening: number;
}
type FormData = z.infer<typeof rekeningFormSchema>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EditRekening = ({
  openModal,
  handleClose,
  idRekening,
}: DataTableProps) => {
  const [dataKaryawan, setDataKaryawan] = useState<Staff[]>([]);
  const [formData, setFormData] = useState({
    karyawan: "",
  });
  const fetchStaff = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/list?page=0&size=999999999`,
    fetcher
  );
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/${idRekening}`,
    fetcher
  );
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(rekeningFormSchema),
  });
  useEffect(() => {
    if (data?.data) {
      reset({
        bank: data?.data?.jenis,
        nama: data?.data?.nama,
        norek: data?.data?.norek,
      });
      setFormData({
        karyawan: data?.data?.karyawan?.id.toString(),
      });
    }
  }, [data, reset]);
  useEffect(() => {
    if (fetchStaff.data?.data) {
      setDataKaryawan(fetchStaff.data?.data.content);
    }
  }, [fetchStaff.data]);
  const handleChangeStaff = (val: string) =>
    setFormData((pref) => ({
      ...pref,
      karyawan: val,
    }));
  const submitStaff = async (form: FormData) => {
    const param: RekeningForm = {
      id: data.data.id,
      nama: form.nama,
      jenis: form.bank,
      norek: form.norek.toString(),
      karyawan: {
        id: parseInt(formData.karyawan),
      },
    };
    try {
      const res = await updRekening(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menyimpan rekening");
        reset();
        handleClose(false);
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/list?page=0&size=10`
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
      title="Edit Data Rekening"
      handleClose={handleClose}
      onSubmit={handleSubmit(submitStaff)}
      loadingSubmit={isSubmitting}
    >
      <div className="flex flex-col gap-4 pb-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="karyawan">Karyawan</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !formData.karyawan && "text-muted-foreground"
                )}
              >
                {formData.karyawan
                  ? dataKaryawan.find(
                      (item) => item?.id?.toString() === formData.karyawan
                    )?.name
                  : "Pilih Karyawan"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-lg p-0">
              <Command>
                <CommandInput placeholder="Cari pegawai..." />
                <CommandList>
                  <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                  <CommandGroup>
                    {dataKaryawan.map((item) => (
                      <CommandItem
                        value={item?.name}
                        key={item.id}
                        onSelect={() => {
                          handleChangeStaff(item?.id?.toString() || "");
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item?.id?.toString() === formData.karyawan
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tema">Bank</Label>
          <Input
            {...register("bank", { required: true })}
            type="text"
            id="bank"
            placeholder="Masukkan bank rekening"
            name="bank"
          />
          {errors?.bank && (
            <p className="text-red-500 text-sm">{errors?.bank?.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="nama">Nama</Label>
          <Input
            {...register("nama", { required: true })}
            type="text"
            id="nama"
            placeholder="Masukkan nama rekening"
            name="nama"
          />
          {errors?.nama && (
            <p className="text-red-500 text-sm">{errors?.nama?.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="norek">No. Rekening</Label>
          <Input
            {...register("norek", { required: true, valueAsNumber: true })}
            type="number"
            id="norek"
            placeholder="Masukkan nomor rekening"
            name="norek"
          />
          {errors?.norek && (
            <p className="text-red-500 text-sm">{errors?.norek?.message}</p>
          )}
        </div>
      </div>
    </ResponsiveFormDialog>
  );
};

export default EditRekening;
