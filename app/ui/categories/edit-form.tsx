'use client';
import { updateCategory, StateCategory } from '@/app/lib/actions';
import { useActionState } from 'react';
import { CategoryForm } from '@/app/lib/definitions';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditCategoryForm({categoryById,}: {categoryById: CategoryForm;}) {
  const initialState: StateCategory = { message: null, errors: {} };
  const updateCategoryWithId = updateCategory.bind(null, categoryById.category_id);
  const [state, formAction] = useActionState(updateCategoryWithId, initialState);
  console.log(state, "state");
   
  return <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       
        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="category_name" className="mb-2 block text-sm font-medium">
            Category Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category_name"
                name="category_name"
                type="text"
                defaultValue={categoryById.category_name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            
            </div>
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
        <Button type="submit">Edit Category</Button>
      </div>
    </form>
}
