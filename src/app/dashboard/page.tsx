"use client";
import { useState } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import useSWR from "swr";
import Pagination from "./_components/pagination";
import { Staff } from "@/types/data-types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function StaffPage() {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/list?page=${page}&size=${pageSize}`,
    fetcher
  );

  const karyawanData: Staff[] =
    data?.data?.content?.map((item: Staff, index: number) => ({
      id: item.id,
      no: index + 1,
      address: item.address,
      dob: item.dob,
      name: item.name,
      status: item.status,
      karyawanDetail: {
        nik: item.karyawanDetail.nik,
        npwp: item.karyawanDetail.npwp,
      },
    })) || [];
  const totalPages = data?.data?.totalPages || 1;
  const currentPage = data?.data?.pageable?.pageNumber || 0;
  const totalData = data?.data?.totalElements || 0;

  return (
    <div className="py-4 md:py-10">
      <DataTable columns={columns} data={karyawanData} />
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
