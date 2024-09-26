import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
}
const EditStaff = ({ openModal, handleClose }: DataTableProps) => {
  const [data, setdata] = useState({
    nama: "Deni Juli Setiawan",
    tanggal_lahir: "2002-07-18",
    nik: "12345678",
    npwp: "12345678",
    status: true,
    alamat: "Banjarnegara, Jawa Tengah, Indonesia, Bumi",
  });
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setdata({
      ...data,
      [target.id]: target.value,
    });
  };
  const handleChangeStatus = (status: boolean) => {
    setdata({
      ...data,
      status,
    });
  };
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Edit Data Pegawai"
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="nama">Nama</Label>
          <Input
            type="text"
            id="nama"
            placeholder="Masukkan nama pegawai"
            name="nama"
            value={data.nama}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
          <Input
            type="date"
            id="tanggal_lahir"
            placeholder="Masukkan tanggal lahir pegawai"
            name="tanggal_lahir"
            value={data.tanggal_lahir}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="nik">NIK</Label>
          <Input
            type="text"
            id="nik"
            placeholder="Masukkan NIK pegawai"
            name="nik"
            value={data.nik}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="npwp">NPWP</Label>
          <Input
            type="text"
            id="npwp"
            placeholder="Masukkan NPWP pegawai"
            name="npwp"
            value={data.npwp}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="alamat">Alamat</Label>
          <Textarea
            id="alamat"
            placeholder="Masukkan alamat pegawai"
            name="alamat"
            value={data.alamat}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="status"
            name="status"
            checked={data.status}
            onCheckedChange={handleChangeStatus}
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
