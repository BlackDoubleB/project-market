'use client';

import { Icon } from '@iconify/react';
import { Button } from '../button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined,);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="user_name"
            >
              User
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="user_name"
                type="text"
                name="user_name"
                placeholder="Enter your username"
                required
              />
              <Icon icon="heroicons-solid:user" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />


            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                
              />
              <Icon icon="material-symbols:key" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

            </div>
          </div>
        </div>

        <Button className="mt-4 w-full transform transition-transform duration-200 active:scale-95" aria-disabled={isPending}>
          Log in
          <Icon icon="formkit:arrowright" className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

       <Link href={'/login/create'}>
       <div className='flex justify-end mb-3 mt-4 hover:cursor-pointer hover:text-blue-600'>
          <p className='text-xs font-medium text-gray-900 text-inherit'>
            Don&apos;t have an account? Sign Up
          </p>
        </div>
       </Link>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <Icon icon="tabler:exclamation-circle-filled" className="h-5 w-5 text-red-500" />

              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
