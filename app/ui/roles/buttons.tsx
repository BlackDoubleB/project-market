// import { deleteRole } from "@/app/lib/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function CreateRole() {
  return (
    <Link
      href="/dashboard/roles/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Role</span>{" "}
      <Icon icon="mdi:plus" className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateRole({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/roles/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Icon icon="mdi:pencil" className="w-5" />
    </Link>
  );
}

// export function DeleteRole({ id }: { id: string }) {
//   const deleteRoleWithId = deleteRole.bind(null, id);
//   return (
//     <>
//       <form action={deleteRoleWithId}>
//       <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <Icon icon="tabler:trash" className="w-4" />
//       </button>
//     </form>
//     </>
//   );
// }
