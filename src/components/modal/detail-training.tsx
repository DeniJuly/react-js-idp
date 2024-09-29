import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import useSWR from "swr";
import { Training } from "@/types/data-types";
import { formatDate } from "@/utils/formatDate";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idTraining: number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const DetailTraining = ({
  openModal,
  handleClose,
  idTraining,
}: DataTableProps) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/${idTraining}`,
    fetcher
  );
  const trainingData: Training = data?.data;
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Detail Data Pelatihan"
      handleClose={handleClose}
      hideFooter
    >
      <div className="pb-4 md:pb-0">
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
                Tema
              </p>
              <p className="text-sm md:text-base">: {trainingData.tema}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Pengajar
              </p>
              <p className="text-sm md:text-base">: {trainingData?.pengajar}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Tanggal Dibuat
              </p>
              <p className="text-sm md:text-base">
                :{" "}
                {trainingData?.created_date
                  ? formatDate(trainingData?.created_date)
                  : ""}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Terakhir Diubah
              </p>
              <p className="text-sm md:text-base">
                :{" "}
                {trainingData?.updated_date
                  ? formatDate(trainingData?.updated_date)
                  : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </ResponsiveFormDialog>
  );
};

export default DetailTraining;
