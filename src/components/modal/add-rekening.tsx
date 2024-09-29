import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
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
import { Rekening, RekeningForm, Staff } from "@/types/data-types";
import { rekeningFormSchema } from "@/data/zodSchema/rekening";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRekening } from "@/data/actions/rekening-action";
import toast from "react-hot-toast";
import { mutate } from "swr";
interface AddRekeningProps {
  dataKaryawan: Staff[];
}
type FormData = z.infer<typeof rekeningFormSchema>;
const AddRekening = ({ dataKaryawan }: AddRekeningProps) => {
  const [data, setData] = useState({
    karyawan: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(rekeningFormSchema),
  });
  const handleClose = (status: boolean) => {
    setOpenDialog(status);
  };
  const handleChangeStaff = (val: string) =>
    setData((pref) => ({
      ...pref,
      karyawan: val,
    }));
  const submitRekening = async (form: FormData) => {
    const param: RekeningForm = {
      nama: form.nama,
      jenis: form.bank,
      norek: form.norek.toString(),
      karyawan: {
        id: parseInt(data.karyawan),
      },
    };
    try {
      const res = await addRekening(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menambahkan rekening");
        reset();
        setOpenDialog(false);
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
        title="Tambah Data Rekening"
        handleClose={handleClose}
        onSubmit={handleSubmit(submitRekening)}
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
                    !data.karyawan && "text-muted-foreground"
                  )}
                >
                  {data.karyawan
                    ? dataKaryawan.find(
                        (item) => item?.id?.toString() === data.karyawan
                      )?.name
                    : "Pilih Karyawan"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] min-w-lg p-0">
                <Command>
                  <CommandInput placeholder="Cari karyawan..." />
                  <CommandList>
                    <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                    <CommandGroup>
                      {dataKaryawan.map((item) => (
                        <CommandItem
                          value={item?.id?.toString()}
                          key={item.id}
                          onSelect={() => {
                            handleChangeStaff(item?.id?.toString() || "");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item?.id?.toString() === data.karyawan
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
            />
            {errors?.norek && (
              <p className="text-red-500 text-sm">{errors?.norek?.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="norek">No. Rekening</Label>
            <Input
              {...register("norek", { required: true, valueAsNumber: true })}
              type="number"
              id="norek"
              placeholder="Masukkan nomor rekening"
            />
            {errors?.norek && (
              <p className="text-red-500 text-sm">{errors?.norek?.message}</p>
            )}
          </div>
        </div>
      </ResponsiveFormDialog>
    </>
  );
};

export default AddRekening;
