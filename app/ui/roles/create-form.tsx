'use client';
import { createRole, StateRole } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function Form() {
    const initialState: StateRole = { message: null, errors: {} };
    const [state, formAction] = useActionState(createRole, initialState);
  
    return (
      <form action={formAction}>
        <div className='flex justify-center'>
          <h1 className="text-2xl py-10 text-black font-semibold">Registration</h1>
        </div>
        <div className="rounded-md p-4 md:p-6">
         
          {/* People/Person_name*/}
          <div className="mb-4">
            <label htmlFor="role_name" className="mb-2 block text-sm font-medium"
              aria-describedby="role_name-error">
              Enter Role
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="role_name"
                  name="role_name"
                  type="text"
                  placeholder="role"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
  
  
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/roles"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Role</Button>
          </div>
        </div>
      </form>
    );
  }