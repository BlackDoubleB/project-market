"use client";
import { createRole, StateRole } from "@/app/lib/actions";
import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Icon } from "@iconify/react";
export default function Form() {
  const initialState: StateRole = { message: null, errors: {} };
  const [state, formAction] = useActionState(createRole, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* People/Person_name*/}
        <div className="mb-4">
          <label
            htmlFor="role_name"
            className="mb-2 block text-sm font-medium"
            aria-describedby="role_name-error"
          >
            Enter Role
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Icon
                icon="material-symbols:person-book-outline"
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
              <input
                id="role_name"
                name="role_name"
                type="text"
                placeholder="role"
                className="  peer block w-full rounded-md  py-2 pl-10 text-sm placeholder:text-gray-500
                border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1
                 focus:shadow-md focus:shadow-blue-200/50 "
              />
            </div>
          </div>

          {/* Validation */}
          <div id="role_name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.role_name &&
              state.errors.role_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Fin People/People_name */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/roles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Role</Button>
      </div>
    </form>
  );
}
