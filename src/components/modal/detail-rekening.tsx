import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import useSWR from "swr";
import { formatDate } from "@/utils/formatDate";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idRekening: number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const DetailRekening = ({
  openModal,
  handleClose,
  idRekening,
}: DataTableProps) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/${idRekening}`,
    fetcher
  );
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Detail Data Rekening"
      handleClose={handleClose}
      hideFooter
    >
      <div className="gap-4 pb-4 md:pb-0">
        {isLoading ? (
          <div className="flex justify-center">
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
              className="animate-spin size-6"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-base">
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Karyawan
              </p>
              <p className="text-sm md:text-base">
                : {data?.data?.karyawan?.name}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Bank
              </p>
              <p className="text-sm md:text-base">: {data?.data?.jenis}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Nama
              </p>
              <p className="text-sm md:text-base">: {data?.data?.nama}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                No. Rekening
              </p>
              <p className="text-sm md:text-base">: {data?.data?.norek}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Tanggal Dibuat
              </p>
              <p className="text-sm md:text-base">
                : {formatDate(data?.data?.created_date)}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Terakhir Diubah
              </p>
              <p className="text-sm md:text-base">
                : {formatDate(data?.data?.updated_date)}
              </p>
            </div>
          </div>
        )}
      </div>
    </ResponsiveFormDialog>
  );
};

export default DetailRekening;
