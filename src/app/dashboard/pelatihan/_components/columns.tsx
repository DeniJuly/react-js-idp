"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";
import { Training } from "@/types/data-types";

export const columns: ColumnDef<Training>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("no")}</div>;
    },
  },
  {
    accessorKey: "tema",
    header: "Tema",
  },
  {
    accessorKey: "pengajar",
    header: "Pengajar",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnAction row={row} />,
  },
];
