import { UpdateRole, DeleteRole } from '@/app/ui/roles/buttons';
import { fetchFilteredRoles } from '@/app/lib/data';
export default async function RolesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const roles = await fetchFilteredRoles(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Primer sub div */}
          <div className="md:hidden">
            {roles?.map((role) => (
              <div key={role.role_id} className="mb-2 rounded-md bg-white p-4">
                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{role.role_name}</p>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateRole id={role.role_id} />
                    <DeleteRole id={role.role_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Fin primer sub div */}

          {/* Inicio Table*/}
          <table className="hidden min-w-full text-gray-900 md:table">

            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Role Name
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {roles?.map((role) => (
                <tr key={role.role_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                    
                  <td className="whitespace-nowrap px-3 py-3">
                    {role.role_name}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRole id={role.role_id} />
                      <DeleteRole id={role.role_id} />
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
