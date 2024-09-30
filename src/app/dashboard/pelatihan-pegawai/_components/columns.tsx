"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";
import { StaffTraining } from "@/types/data-types";
import { formatDate } from "@/utils/formatDate";

export const columns: ColumnDef<StaffTraining>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("no")}</div>;
    },
  },
  {
    accessorKey: "karyawan.name",
    header: "Karyawan",
  },
  {
    accessorKey: "training.tema",
    header: "Tema",
  },
  {
    accessorKey: "training_date",
    header: "Tanggal Pelatihan",
    cell: ({ row }) => {
      let trainingDate = row.getValue("training_date");
      if (!trainingDate) return <div>-</div>;
      return (
        <div>
          {`${formatDate(row.getValue("training_date"))} ${trainingDate
            ?.toString()
            .substring(11, 16)}`}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnAction row={row} />,
  },
];
