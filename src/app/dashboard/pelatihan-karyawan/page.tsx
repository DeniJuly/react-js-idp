"use client";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Staff, StaffTraining, Training } from "@/types/data-types";
import Pagination from "../_components/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function DemoPage() {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [dataKaryawan, setDataKaryawan] = useState<Staff[]>([]);
  const [dataTraining, setDataTraining] = useState<Training[]>([]);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/list?page=${page}&size=${pageSize}`,
    fetcher
  );
  const fetchStaff = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/list?page=0&size=999999999`,
    fetcher
  );
  const fetchTraining = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/list?page=0&size=999999999`,
    fetcher
  );
  useEffect(() => {
    if (fetchStaff.data?.data) {
      setDataKaryawan(fetchStaff.data?.data.content);
    }
  }, [fetchStaff.data]);
  useEffect(() => {
    if (fetchTraining.data?.data) {
      setDataTraining(fetchTraining.data?.data.content);
    }
  }, [fetchTraining.data]);

  const dataStaffTraining: StaffTraining[] =
    data?.data?.content?.map((item: StaffTraining, index: number) => ({
      id: item.id,
      no: index + 1,
      training: item.training,
      karyawan: item.karyawan,
      training_date: item.training_date,
    })) || [];
  const totalPages = data?.data?.totalPages || 1;
  const currentPage = data?.data?.pageable?.pageNumber || 0;
  const totalData = data?.data?.totalElements || 0;

  return (
    <div className="py-4 md:py-10">
      <DataTable
        columns={columns}
        data={dataStaffTraining}
        dataKaryawan={dataKaryawan}
        dataPelatihan={dataTraining}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setPage}
        loading={isLoading}
        totalData={totalData}
      />
    </div>
  );
}
