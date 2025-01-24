'use client';

import { updateSale, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { ProductField, SaleForm,CategoryField } from '@/app/lib/definitions';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditSaleForm({
  sale,
  products,
  categories
}: {
  sale: SaleForm;
  products: ProductField[];
  categories: CategoryField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateSaleWithId = updateSale.bind(null, sale.id);
  const [state, formAction] = useActionState(updateSaleWithId, initialState);
  console.log(state, "state");
   
  return <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Choose product
          </label>
          <div className="relative">
            <select
              id="product"
              name="productId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={sale.product_id}
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Inicio Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={sale.category_id}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Fin Cateogry */}

        {/* Sale Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={sale.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            
            </div>
          </div>
        </div>

        {/* Sale Method */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the sale method
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">


              <div className="flex items-center">
                <input
                  id="cash"
                  name="method"
                  type="radio"
                  value="cash"
                  defaultChecked={sale.method === 'cash'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="cash"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Cash 
                  <Icon icon="lucide:clock" className="h-4 w-4"/>
                </label>
              </div>



              <div className="flex items-center">
                <input
                  id="card"
                  name="method"
                  type="radio"
                  value="card"
                  defaultChecked={sale.method === 'card'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="card"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Card
                  <Icon icon="material-symbols:check" className="h-4 w-4" />
                </label>
              </div>



            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/sales"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Sale</Button>
      </div>
    </form>
}
