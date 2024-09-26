import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  onDelete: () => void;
}
const DialogDeleteData = ({
  openModal,
  handleClose,
  onDelete,
}: DataTableProps) => {
  return (
    <AlertDialog open={openModal} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Jika data sudah dihapus, data tidak bisa dikembalikan lagi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteData;
