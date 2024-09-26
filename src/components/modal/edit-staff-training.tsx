import React, { useState } from "react";
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
import { Staff, Training } from "@/types/data-types";
interface EditStaffTrainingProps {
  dataKaryawan: Staff[];
  dataPelatihan: Training[];
  openModal: boolean;
  handleClose: (status: boolean) => void;
}
const EditStaffTraining = ({
  dataKaryawan,
  dataPelatihan,
  openModal,
  handleClose,
}: EditStaffTrainingProps) => {
  const [data, setData] = useState({
    karyawan: "",
    training: "",
  });
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
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Edit Data Pelatihan Karyawan"
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-4">
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
                      (item) => item.id.toString() === data.karyawan
                    )?.nama
                  : "Pilih Karyawan"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-lg p-0">
              <Command>
                <CommandInput placeholder="Cari karyawan..." />
                <CommandList>
                  <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                  <CommandGroup>
                    {dataKaryawan.map((item) => (
                      <CommandItem
                        value={item.id.toString()}
                        key={item.id}
                        onSelect={() => {
                          handleChangeStaff(item.id.toString());
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item.id.toString() === data.karyawan
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.nama}
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
                      (item) => item.id.toString() === data.training
                    )?.tema
                  : "Pilih pelatihan"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-lg p-0">
              <Command>
                <CommandInput placeholder="Cari pelatihan..." />
                <CommandList>
                  <CommandEmpty>Data tidak ditemukkan.</CommandEmpty>
                  <CommandGroup>
                    {dataPelatihan.map((item) => (
                      <CommandItem
                        value={item.id.toString()}
                        key={item.id}
                        onSelect={() => {
                          handleChangeTraining(item.id.toString());
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item.id.toString() === data.training
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
      </div>
    </ResponsiveFormDialog>
  );
};

export default EditStaffTraining;
