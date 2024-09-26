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
const EditTraining = ({ openModal, handleClose }: DataTableProps) => {
  const [data, setdata] = useState({
    tema: "Test Pelatihan",
    pengajar: "Deni Juli Setiawan",
  });
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setdata({
      ...data,
      [target.id]: target.value,
    });
  };
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Edit Data Pelatihan"
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tema">Tema</Label>
          <Input
            type="text"
            id="tema"
            placeholder="Masukkan tema pelatihan"
            name="tema"
            value={data.tema}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="nik">Pengajar</Label>
          <Input
            type="text"
            id="pengajar"
            placeholder="Masukkan nama pengajar"
            name="pengajar"
            value={data.pengajar}
            onChange={handleChange}
          />
        </div>
      </div>
    </ResponsiveFormDialog>
  );
};

export default EditTraining;
