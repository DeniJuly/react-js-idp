import { getDataRekening, getDataStaff } from "@/mock/data";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function DemoPage() {
  const data = await getDataRekening();
  const dataKaryawan = await getDataStaff();

  return (
    <div className="py-4 md:py-10">
      <DataTable columns={columns} data={data} dataKaryawan={dataKaryawan} />
    </div>
  );
}
