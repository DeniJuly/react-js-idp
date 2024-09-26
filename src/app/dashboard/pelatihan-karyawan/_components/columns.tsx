"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";
import { StaffTraining } from "@/types/data-types";

export const columns: ColumnDef<StaffTraining>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("no")}</div>;
    },
  },
  {
    accessorKey: "nama",
    header: "Karyawan",
  },
  {
    accessorKey: "pelatihan",
    header: "Tema",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnAction row={row} />,
  },
];
