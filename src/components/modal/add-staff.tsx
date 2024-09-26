import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";

const AddStaff = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClose = (status: boolean) => {
    setOpenDialog(status);
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
      >
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="nama">Nama</Label>
            <Input type="text" id="nama" placeholder="Masukkan nama pegawai" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
            <Input
              type="date"
              id="tanggal_lahir"
              placeholder="Masukkan tanggal lahir"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="nik">NIK</Label>
            <Input type="text" id="nik" placeholder="Masukkan nik pegawai" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="npwp">NPWP</Label>
            <Input type="text" id="npwp" placeholder="Masukkan NPWP pegawai" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea id="alamat" placeholder="Masukkan alamat pegawai" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="status" />
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
