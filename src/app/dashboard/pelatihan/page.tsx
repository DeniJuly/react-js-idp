"use client";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useState } from "react";
import useSWR from "swr";
import { Training } from "@/types/data-types";
import Pagination from "../_components/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function DemoPage() {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/list?page=${page}&size=${pageSize}`,
    fetcher
  );

  const trainingData: Training[] =
    data?.data?.content?.map((item: Training, index: number) => ({
      id: item.id,
      no: index + 1,
      tema: item.tema,
      pengajar: item.pengajar,
    })) || [];
  const totalPages = data?.data?.totalPages || 1;
  const currentPage = data?.data?.pageable?.pageNumber || 0;
  const totalData = data?.data?.totalElements || 0;

  return (
    <div className="py-4 md:py-10">
      <DataTable columns={columns} data={trainingData} loading={isLoading} />
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
