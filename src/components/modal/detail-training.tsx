import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
}
const DetailTraining = ({ openModal, handleClose }: DataTableProps) => {
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Detail Data Pelatihan"
      handleClose={handleClose}
      hideFooter
    >
      <div className="flex flex-col gap-4 pb-4 md:pb-0">
        <div>
          <div className="flex flex-col gap-3 text-base">
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Tema
              </p>
              <p className="text-sm md:text-base">: Test Pelatihan</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Pengajar
              </p>
              <p className="text-sm md:text-base">: Deni Juli Setiawan</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Tanggal Dibuat
              </p>
              <p className="text-sm md:text-base">: 18 Juli 2024</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Terakhir Diubah
              </p>
              <p className="text-sm md:text-base">: 18 Juli 2024</p>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveFormDialog>
  );
};

export default DetailTraining;
