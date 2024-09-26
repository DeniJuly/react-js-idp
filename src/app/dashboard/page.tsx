import { getDataStaff } from "@/mock/data";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function Staff() {
  const data = await getDataStaff();

  return (
    <div className="py-4 md:py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
