"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ColumnAction from "./column-action";
import { Staff } from "@/types/data-types";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("no")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "karyawanDetail.nik",
    header: "NIK",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge
            variant="outline"
            className={
              row.getValue("status") === "active"
                ? "bg-green-50 border-green-300 text-green-500"
                : "bg-red-50 border-red-300 text-red-500"
            }
          >
            {row.getValue("status") === "active" ? "Aktif" : "Tidak Aktif"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ColumnAction row={row} />;
    },
  },
];
