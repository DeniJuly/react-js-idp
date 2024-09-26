import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";

const AddTraining = () => {
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
        title="Tambah Data Pelatihan"
        handleClose={handleClose}
      >
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tema">Tema</Label>
            <Input
              type="text"
              id="tema"
              placeholder="Masukkan tema pelatihan"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="pengajar">Pengajar</Label>
            <Input
              type="text"
              id="pengajar"
              placeholder="Masukkan nama pengajar"
            />
          </div>
        </div>
      </ResponsiveFormDialog>
    </>
  );
};

export default AddTraining;
