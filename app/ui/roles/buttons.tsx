// import { deleteRole } from "@/app/lib/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function UpdateRole({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/roles/${id}/edit`}
      className="rounded-md border p-2 hover:bg-yellow-300 bg-yellow-400"
    >
      <Icon icon="mdi:pencil" className="w-5 text-white" />
    </Link>
  );
}
