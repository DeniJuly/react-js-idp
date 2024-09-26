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
import DialogDeleteData from "@/components/modal/dialog-delete-data";
import EditTraining from "@/components/modal/edit-training";
import DetailTraining from "@/components/modal/detail-training";
import { Training } from "@/types/data-types";

const ColumnAction = ({ row }: { row: Row<Training> }) => {
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
      <DetailTraining openModal={openDetail} handleClose={handleCloseDetail} />
      <EditTraining openModal={openEdit} handleClose={handleCloseEdit} />
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
            Edit Pelatihan
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDelete(true)}
          >
            Hapus Pelatihan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnAction;
