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
import toast from "react-hot-toast";
import { delTraining } from "@/data/actions/training-action";
import { mutate } from "swr";

const ColumnAction = ({ row }: { row: Row<Training> }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleCloseDetail = (open: boolean) => setOpenDetail(open);
  const handleCloseEdit = (open: boolean) => setOpenEdit(open);
  const handleCloseDelete = (open: boolean) => setOpenDelete(open);
  const data: Training = row.original;
  const handleDelete = async () => {
    if (data.id) {
      const toastId = toast.loading("Menghapus data...");
      setLoadingDelete(true);
      try {
        const res = await delTraining(data.id);
        if (res.data.status === "200") {
          toast.success("Data Berhasil dihapus", {
            id: toastId,
          });
          setOpenDelete(false);
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}v1/training/list?page=0&size=10`
          );
          setLoadingDelete(false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error: any) {
        setLoadingDelete(false);
        toast.error(
          error?.message || "Terjadi kesalahan, coba beberapa saat lagi",
          {
            id: toastId,
          }
        );
      }
    }
  };
  return (
    <div className="text-center">
      {openDetail && data.id && (
        <DetailTraining
          openModal={openDetail}
          handleClose={handleCloseDetail}
          idTraining={data.id}
        />
      )}
      {openEdit && data.id && (
        <EditTraining
          openModal={openEdit}
          handleClose={handleCloseEdit}
          idTraining={data.id}
        />
      )}
      {openDelete && data.id && (
        <DialogDeleteData
          openModal={openDelete}
          handleClose={handleCloseDelete}
          onDelete={handleDelete}
          loadingSubmit={loadingDelete}
        />
      )}
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
