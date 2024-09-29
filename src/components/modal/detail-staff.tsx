import React from "react";
import { Badge } from "../ui/badge";
import { ResponsiveFormDialog } from "../ui/responsive-form-dialog";
import useSWR from "swr";
import { formatDate } from "@/utils/formatDate";

interface DataTableProps {
  openModal: boolean;
  handleClose: (status: boolean) => void;
  idStaff: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const DetailStaff = ({ openModal, handleClose, idStaff }: DataTableProps) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/${idStaff}`,
    fetcher
  );
  return (
    <ResponsiveFormDialog
      open={openModal}
      title="Detail Data Pegawai"
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
                Nama
              </p>
              <p className="text-sm md:text-base">{data?.data.name}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Tanggal Lahir
              </p>
              <p className="text-sm md:text-base">
                {formatDate(data?.data?.dob)}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                NIK
              </p>
              <p className="text-sm md:text-base">
                {data?.data.karyawanDetail.nik}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                NPWP
              </p>
              <p className="text-sm md:text-base">
                {data?.data.karyawanDetail.npwp}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Status
              </p>
              <div>
                <Badge
                  variant="outline"
                  className={
                    data?.data.status === "active"
                      ? "bg-green-50 border-green-300 text-green-500"
                      : "bg-red-50 border-red-300 text-red-500"
                  }
                >
                  {data?.data.status === "active" ? "Aktif" : "Tidak Aktif"}
                </Badge>
              </div>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold w-32 shrink-0">
                Alamat
              </p>
              <p className="text-sm md:text-base">{data?.data.address}</p>
            </div>
          </div>
        )}
      </div>
    </ResponsiveFormDialog>
  );
};

export default DetailStaff;
