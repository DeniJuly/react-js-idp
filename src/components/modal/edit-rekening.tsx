import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Staff } from "@/types/data-types";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  dataKaryawan: Staff[];
}
const EditRekening = ({
  openModal,
  handleClose,
  dataKaryawan,
}: DataTableProps) => {
  const [data, setData] = useState({
    karyawan: "",
    bank: "BCA",
    nama: "Deni Juli Setiawan",
    norek: "12345678",
  });
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [target.id]: target.value,
    });
  };
  const handleChangeStaff = (val: string) =>
    setData((pref) => ({
      ...pref,
      karyawan: val,
    }));
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Edit Data Pegawai"
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
          <Label htmlFor="tema">Bank</Label>
          <Input
            type="text"
            id="bank"
            placeholder="Masukkan bank rekening"
            name="bank"
            value={data.bank}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="nama">Nama</Label>
          <Input
            type="text"
            id="nama"
            placeholder="Masukkan nama rekening"
            name="nama"
            value={data.nama}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="norek">No. Rekening</Label>
          <Input
            type="text"
            id="norek"
            placeholder="Masukkan nomor rekening"
            name="norek"
            value={data.norek}
            onChange={handleChange}
          />
        </div>
      </div>
    </ResponsiveFormDialog>
  );
};

export default EditRekening;
