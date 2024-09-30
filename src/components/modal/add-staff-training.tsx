import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Staff, StaffTrainingForm, Training } from "@/types/data-types";
import { staffTrainingFormSchema } from "@/data/zodSchema/staff-training";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addStaffTraining } from "@/data/actions/staff-training-action";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { Input } from "../ui/input";
interface AddStaffTrainingProps {
  dataKaryawan: Staff[];
  dataPelatihan: Training[];
}
type FormData = z.infer<typeof staffTrainingFormSchema>;
const AddStaffTraining = ({
  dataKaryawan,
  dataPelatihan,
}: AddStaffTrainingProps) => {
  const [data, setData] = useState({
    karyawan: "",
    training: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(staffTrainingFormSchema),
  });
  const handleClose = (status: boolean) => {
    setOpenDialog(status);
  };
  const handleChangeStaff = (val: string) =>
    setData((pref) => ({
      ...pref,
      karyawan: val,
    }));
  const handleChangeTraining = (val: string) =>
    setData((pref) => ({
      ...pref,
      training: val,
    }));
  const submitStaff = async (form: FormData) => {
    const param: StaffTrainingForm = {
      karyawan: {
        id: parseInt(data.karyawan),
      },
      training: {
        id: parseInt(data.training),
      },
      training_date: `${form.training_date.replace("T", " ")}:00`,
    };
    try {
      const res = await addStaffTraining(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menambahkan pelatihan pegawai");
        reset();
        setOpenDialog(false);
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/list?page=0&size=10`
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
        title="Tambah Data Pelatihan Pegawai"
        handleClose={handleClose}
        onSubmit={handleSubmit(submitStaff)}
        loadingSubmit={isSubmitting}
      >
        <div className="flex flex-col gap-4 pb-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="pegawai">Pegawai</Label>
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
              <PopoverContent className="w-[250px] p-0">
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
                            handleChangeStaff(item?.id?.toString() ?? "");
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
            <Label htmlFor="pelatihan">Pelatihan</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !data.training && "text-muted-foreground"
                  )}
                >
                  {data.training
                    ? dataPelatihan.find(
                        (item) => item?.id?.toString() === data.training
                      )?.tema
                    : "Pilih pelatihan"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="Cari pelatihan..." />
                  <CommandList>
                    <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                    <CommandGroup>
                      {dataPelatihan.map((item) => (
                        <CommandItem
                          value={item?.tema}
                          key={item.id}
                          onSelect={() => {
                            handleChangeTraining(item?.id?.toString() ?? "");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item?.id?.toString() === data.training
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.tema}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="training_date">Tanggal Pelatihan</Label>
            <Input
              {...register("training_date", { required: true })}
              name="training_date"
              type="datetime-local"
              id="training_date"
              placeholder="Masukkan tanggal Pelatihan"
            />
            {errors?.training_date && (
              <p className="text-red-500 text-sm">
                {errors?.training_date?.message}
              </p>
            )}
          </div>
        </div>
      </ResponsiveFormDialog>
    </>
  );
};

export default AddStaffTraining;
