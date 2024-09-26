import {
  getDataStaff,
  getDataStaffTraining,
  getDataTraining,
} from "@/mock/data";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function DemoPage() {
  const data = await getDataStaffTraining();
  const dataKaryawan = await getDataStaff();
  const dataPelatihan = await getDataTraining();

  return (
    <div className="py-4 md:py-10">
      <DataTable
        columns={columns}
        data={data}
        dataKaryawan={dataKaryawan}
        dataPelatihan={dataPelatihan}
      />
    </div>
  );
}
