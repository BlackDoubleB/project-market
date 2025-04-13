"use client";
import { updateRole, StateRole } from "@/app/lib/actions";
import { useActionState } from "react";
import { RoleById } from "@/app/lib/definitions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function EditRoleForm({ roleById }: { roleById: RoleById }) {
  const initialState: StateRole = { message: null, errors: {} };
  const updateRoleWithId = updateRole.bind(null, roleById.role_id);
  const [state, formAction] = useActionState(updateRoleWithId, initialState);
  console.log(state, "state");

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 border-1 border-gray-300">
        {/* Role Name */}
        <div className="mb-4">
          <label htmlFor="role_name" className="mb-2 block text-sm font-medium">
            Role Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="role_name"
                name="role_name"
                type="text"
                defaultValue={roleById.role_name}
                placeholder="Enter role name"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                 focus:outline-none border-1 ring-0 outline-none border-gray-300 focus:border-blue-200  focus:ring-blue-200  focus:shadow-md focus:shadow-blue-200/50"
              />
              <Icon
                icon="material-symbols:person-book"
                className="absolute top-3 left-3 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/roles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className="cursor-pointer">
          Edit Role
        </Button>
      </div>
    </form>
  );
}
