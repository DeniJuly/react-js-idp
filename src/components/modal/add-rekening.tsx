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
import { Staff } from "@/types/data-types";
interface AddRekeningProps {
  dataKaryawan: Staff[];
}
const AddRekening = ({ dataKaryawan }: AddRekeningProps) => {
  const [data, setData] = useState({
    karyawan: "",
    bank: "",
    nama: "",
    norek: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleClose = (status: boolean) => {
    setOpenDialog(status);
  };
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
            <Input type="text" id="bank" placeholder="Masukkan bank rekening" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="nama">Nama</Label>
            <Input type="text" id="nama" placeholder="Masukkan nama rekening" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="norek">No. Rekening</Label>
            <Input
              type="text"
              id="norek"
              placeholder="Masukkan nomor rekening"
            />
          </div>
        </div>
      </ResponsiveFormDialog>
    </>
  );
};

export default AddRekening;
