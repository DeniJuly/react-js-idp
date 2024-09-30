import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
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
import useSWR, { mutate } from "swr";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffTrainingFormSchema } from "@/data/zodSchema/staff-training";
import { updStaffTraining } from "@/data/actions/staff-training-action";
import toast from "react-hot-toast";
interface EditStaffTrainingProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idStaffTraining: number;
}
type FormData = z.infer<typeof staffTrainingFormSchema>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EditStaffTraining = ({
  openModal,
  handleClose,
  idStaffTraining,
}: EditStaffTrainingProps) => {
  const [dataKaryawan, setDataKaryawan] = useState<Staff[]>([]);
  const [dataTraining, setDataTraining] = useState<Training[]>([]);
  const [formData, setFormData] = useState({
    karyawan: "",
    training: "",
  });
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/${idStaffTraining}`,
    fetcher
  );
  const fetchStaff = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/list?page=0&size=999999999`,
    fetcher
  );
  const fetchTraining = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/list?page=0&size=999999999`,
    fetcher
  );
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(staffTrainingFormSchema),
  });
  useEffect(() => {
    if (data?.data) {
      reset({
        training_date: data.data.training_date,
      });
      setFormData({
        karyawan: data?.data?.karyawan?.id.toString(),
        training: data?.data?.training?.id.toString(),
      });
    }
  }, [data, reset]);
  useEffect(() => {
    if (fetchStaff.data?.data) {
      setDataKaryawan(fetchStaff.data?.data.content);
    }
  }, [fetchStaff.data]);
  useEffect(() => {
    if (fetchTraining.data?.data) {
      setDataTraining(fetchTraining.data?.data.content);
    }
  }, [fetchTraining.data]);
  const handleChangeStaff = (val: string) =>
    setFormData((pref) => ({
      ...pref,
      karyawan: val,
    }));
  const handleChangeTraining = (val: string) =>
    setFormData((pref) => ({
      ...pref,
      training: val,
    }));
  const submitStaff = async (form: FormData) => {
    const param: StaffTrainingForm = {
      id: data?.data?.id,
      karyawan: {
        id: parseInt(formData.karyawan),
      },
      training: {
        id: parseInt(formData.training),
      },
      training_date: `${form.training_date.replace("T", " ")}:00`,
    };
    try {
      const res = await updStaffTraining(param);
      if (res.data.status === "200") {
        toast.success("Berhasil menyimpan pelatihan pegawai");
        reset();
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/list?page=0&size=10`
        );
        handleClose(false);
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
      title="Edit Data Pelatihan Pegawai"
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
            <PopoverContent className="w-[250px] min-w-lg p-0">
              <Command>
                <CommandInput placeholder="Cari Pegawai..." />
                <CommandList>
                  <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                  <CommandGroup>
                    {dataKaryawan.map((item) => (
                      <CommandItem
                        value={item?.name}
                        key={item?.id}
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
          <Label htmlFor="pelatihan">Pelatihan</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !formData.training && "text-muted-foreground"
                )}
              >
                {formData.training
                  ? dataTraining.find(
                      (item) => item?.id?.toString() === formData.training
                    )?.tema
                  : "Pilih pelatihan"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] min-w-lg p-0">
              <Command>
                <CommandInput placeholder="Cari pelatihan..." />
                <CommandList>
                  <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                  <CommandGroup>
                    {dataTraining.map((item) => (
                      <CommandItem
                        value={item?.tema}
                        key={item.id}
                        onSelect={() => {
                          handleChangeTraining(item?.id?.toString() || "");
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item?.id?.toString() === formData.training
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
  );
};

export default EditStaffTraining;
