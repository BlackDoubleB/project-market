'use client';
import { createCategory, StateCategory } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/app/ui/button';

export default function Form() {
    const initialState: StateCategory = { message: null, errors: {} };
    const [state, formAction] = useActionState(createCategory, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/* Category Name */}
                <div className="mb-4">
                    <label htmlFor="category_name" className="mb-2 block text-sm font-medium" aria-describedby="category_name">
                        Category Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="category_name"
                                name="category_name"
                                type="text"
                                placeholder="Enter an Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                            />
                            <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                        </div>
                    </div>

                    {/* Validation */}
                    <div id="category_name" aria-live="polite" aria-atomic="true">
                        {state.errors?.category_name &&
                            state.errors.category_name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>

                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link href="/dashboard/categories" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <Button type="submit">Create Category</Button>
            </div>

        </form>
    );
}
