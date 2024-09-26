"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";
import { Rekening } from "@/types/data-types";

export const columns: ColumnDef<Rekening>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("no")}</div>;
    },
  },
  {
    accessorKey: "jenis",
    header: "Bank",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "norek",
    header: "No. Rekening",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnAction row={row} />,
  },
];
