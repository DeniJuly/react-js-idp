"use client";
import useSWR from "swr";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useEffect, useState } from "react";
import { Rekening, Staff } from "@/types/data-types";
import Pagination from "../_components/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function DemoPage() {
  const [page, setPage] = useState(0);
  const [dataKaryawan, setDataKaryawan] = useState<Staff[]>([]);
  const [pageSize] = useState(10);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/list?page=${page}&size=${pageSize}`,
    fetcher
  );
  const fetchStaff = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/list?page=0&size=999999999`,
    fetcher
  );
  useEffect(() => {
    if (fetchStaff.data?.data) {
      setDataKaryawan(fetchStaff.data?.data.content);
    }
  }, [fetchStaff.data]);

  const rekeningData: Rekening[] =
    data?.data?.content?.map((item: Rekening, index: number) => ({
      id: item.id,
      no: index + 1,
      jenis: item.jenis,
      nama: item.nama,
      norek: item.norek,
      karyawan: {
        name: item?.karyawan?.name,
      },
    })) || [];
  const totalPages = data?.data?.totalPages || 1;
  const currentPage = data?.data?.pageable?.pageNumber || 0;
  const totalData = data?.data?.totalElements || 0;

  return (
    <div className="py-4 md:py-10">
      <DataTable
        columns={columns}
        data={rekeningData}
        dataKaryawan={dataKaryawan}
        loading={isLoading}
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
