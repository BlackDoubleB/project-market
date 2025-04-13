"use client";
import { createCategory, StateCategory } from "@/app/lib/actions";
import { useActionState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/app/ui/button";

export default function Form() {
  const initialState: StateCategory = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCategory, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="mb-2 block text-sm font-medium"
            aria-describedby="category_name"
          >
            Category Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category_name"
                name="category_name"
                type="text"
                placeholder="Enter an Name"
                className="  peer block w-full rounded-md  py-2 pl-10 text-sm placeholder:text-gray-500
                border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1
                 focus:shadow-md focus:shadow-blue-200/50 "
              />
              <Icon
                icon="tabler:category-plus"
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
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
        <Link
          href="/dashboard/categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Category</Button>
      </div>
    </form>
  );
}
