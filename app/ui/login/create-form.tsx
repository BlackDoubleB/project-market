'use client';
import { createUser, StateUser } from '@/app/lib/actions';
import { useActionState } from 'react';
import { RolesField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/app/ui/button';


export default function Form({ roles }: { roles: RolesField[] }) {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role_id" className="mb-2 block text-sm font-medium">
            Choose Role
          </label>

          <div className="relative">
            <select
              id="role_id"
              name="role_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="roles-error"
            >
              <option value="" disabled>
                Select a Role
              </option>
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}

            </select>
            <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="roles-error" aria-live="polite" aria-atomic="true">
            {state.errors?.role_id &&
              state.errors.role_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Fin Role */}

        {/* People/Person_name*/}
        <div className="mb-4">
          <label htmlFor="person_name" className="mb-2 block text-sm font-medium"
            aria-describedby="person_name-error">
            Enter your name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="person_name"
                name="person_name"
                type="text"
                placeholder="name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
            </div>
          </div>

          {/* Validation */}
          <div id="person_name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.person_name &&
              state.errors.person_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Fin People/People_name */}

        {/* People/lastname */}
        <div className="mb-4">
          <label htmlFor="lastname" className="mb-2 block text-sm font-medium"
            aria-describedby="lastname-error">
            Enter your Lastname
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="lastname"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
            </div>
          </div>

          {/* Validation */}
          <div id="lastname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.lastname &&
              state.errors.lastname.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Fin People/lastname */}

        {/* People/Dni */}
        <div className="mb-4">
          <label htmlFor="dni" className="mb-2 block text-sm font-medium"
            aria-describedby="dni-error">
            Enter your Dni
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="dni"
                name="dni"
                type="text"
                placeholder="dni"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
            </div>
          </div>

          {/* Validation */}
          <div id="dni-error" aria-live="polite" aria-atomic="true">
            {state.errors?.dni &&
              state.errors.dni.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Fin People/Dni */}

        {/* User/User_name */}
        <div className="mb-4">
          <label htmlFor="user_name" className="mb-2 block text-sm font-medium"
            aria-describedby="user_name-error">
            Enter your Username
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="user_name"
                name="user_name"
                type="text"
                placeholder="user_name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
            </div>
          </div>

          {/* Validation */}
          <div id="user_name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.user_name &&
              state.errors.user_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Fin User/user_name */}

         {/* User/Password */}
         <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium"
            aria-describedby="password-error">
            Enter your Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="text"
                placeholder="password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
            </div>
          </div>

          {/* Validation */}
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Fin User/user_name */}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/login"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create User</Button>
      </div>
    </form>
  );
}
