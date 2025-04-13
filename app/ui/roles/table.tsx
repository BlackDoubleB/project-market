import { UpdateRole } from "@/app/ui/roles/buttons";
import { fetchFilteredRoles } from "@/app/lib/data";
export default async function RolesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const roles = await fetchFilteredRoles(query, currentPage);

  return (
    <div className=" flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 ">
          {/* Inicio Table*/}
          <table className="min-w-full text-gray-900">
            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal border-b-2 border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap py-5 font-medium pl-6 "
                >
                  Role Name
                </th>
                <th scope="col" className="py-5 font-medium px-8">
                  <div className="flex justify-end">Edit</div>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {roles?.map((role) => (
                <tr
                  key={role.role_id}
                  className=" w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap px-3 py-3 pl-6">
                    {role.role_name}
                  </td>
                  <td className="whitespace-nowrap py-3 px-6">
                    <div className="flex justify-end gap-3">
                      <UpdateRole id={role.role_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Fin Tbody*/}
          </table>
          {/* Fin Table*/}
        </div>
      </div>
    </div>
  );
}
