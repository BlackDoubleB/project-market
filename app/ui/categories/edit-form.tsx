"use client";
import { updateCategory, StateCategory } from "@/app/lib/actions";
import { useActionState } from "react";
import { CategoryById } from "@/app/lib/definitions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function EditCategoryForm({
  categoryById,
}: {
  categoryById: CategoryById;
}) {
  const initialState: StateCategory = { message: null, errors: {} };
  const updateCategoryWithId = updateCategory.bind(
    null,
    categoryById.category_id,
  );
  const [state, formAction] = useActionState(
    updateCategoryWithId,
    initialState,
  );
  console.log(state, "state");

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 border-1 border-gray-300">
        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="mb-2 block text-sm font-medium"
          >
            Category Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category_name"
                name="category_name"
                type="text"
                defaultValue={categoryById.category_name}
                className="peer block w-full rounded-md py-2 pl-10 text-sm placeholder:text-gray-500
                focus:outline-none border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1 focus:shadow-md focus:shadow-blue-200/50"
              />
              <Icon
                icon="ant-design:product-filled"
                className="absolute top-3 left-3 text-gray-400"
              />
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
        <Button type="submit" className="cursor-pointer">
          Edit Category
        </Button>
      </div>
    </form>
  );
}
