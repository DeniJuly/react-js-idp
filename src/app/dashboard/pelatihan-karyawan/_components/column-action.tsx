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
import { StaffTraining } from "@/types/data-types";
import EditStaffTraining from "@/components/modal/edit-staff-training";
import DetailStaffTraining from "@/components/modal/detail-staff-training";
import toast from "react-hot-toast";
import { delStaffTraining } from "@/data/actions/staff-training-action";
import { mutate } from "swr";

const ColumnAction = ({ row }: { row: Row<StaffTraining> }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleCloseDetail = (open: boolean) => setOpenDetail(open);
  const handleCloseEdit = (open: boolean) => setOpenEdit(open);
  const handleCloseDelete = (open: boolean) => setOpenDelete(open);
  const data: StaffTraining = row.original;
  const handleDelete = async () => {
    if (data.id) {
      const toastId = toast.loading("Menghapus data...");
      setLoadingDelete(true);
      try {
        const res = await delStaffTraining(data.id);
        if (res.data.status === "200") {
          toast.success("Data Berhasil dihapus", {
            id: toastId,
          });
          setOpenDelete(false);
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/list?page=0&size=10`
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
        <DetailStaffTraining
          openModal={openDetail}
          handleClose={handleCloseDetail}
          idStaffTraining={data.id}
        />
      )}
      {openEdit && data.id && (
        <EditStaffTraining
          openModal={openEdit}
          handleClose={handleCloseEdit}
          idStaffTraining={data.id}
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
            Edit Pelatihan Pegawai
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDelete(true)}
          >
            Hapus Pelatihan Pegawai
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnAction;
