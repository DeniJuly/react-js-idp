import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import DetailStaff from "@/components/modal/detail-staff";
import DialogDeleteData from "@/components/modal/dialog-delete-data";
import EditRekening from "@/components/modal/edit-rekening";
import { Rekening, StaffTraining } from "@/types/data-types";
import DetailRekening from "@/components/modal/detail-rekening";
import EditStaffTraining from "@/components/modal/edit-staff-training";
import DetailStaffTraining from "@/components/modal/detail-staff-training";

const ColumnAction = ({ row }: { row: Row<StaffTraining> }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDetail = (open: boolean) => setOpenDetail(open);
  const handleCloseEdit = (open: boolean) => setOpenEdit(open);
  const handleCloseDelete = (open: boolean) => setOpenDelete(open);
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div className="text-center">
      <DetailStaffTraining
        openModal={openDetail}
        handleClose={handleCloseDetail}
      />
      <EditStaffTraining
        openModal={openEdit}
        handleClose={handleCloseEdit}
        dataKaryawan={[]}
        dataPelatihan={[]}
      />
      <DialogDeleteData
        openModal={openDelete}
        handleClose={handleCloseDelete}
        onDelete={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDetail(true)}
          >
            Lihat Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenEdit(true)}
          >
            Edit Pelatihan Karyawan
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDelete(true)}
          >
            Hapus Pelatihan Karyawan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnAction;
