'use client';
import { createUser, StateUser } from '@/app/lib/actions';
import { useActionState } from 'react';
import { RolesField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/app/ui/button';
import { categories } from '@/app/lib/placeholder-data';
import clsx from 'clsx';

export default function Form({ roles}: { roles: RolesField[] }) {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Sale Product */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Choose product
          </label>

          <div className="relative">
            <select
              id="product"
              name="productId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="product-error"
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
            <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"  />
          </div>

          <div id="product-error" aria-live="polite" aria-atomic="true">
          {state.errors?.productId &&
            state.errors.productId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
         </div>

        </div>
        {/* Fin Sale Product */}
      

      {/* Sale Categorie */}
      <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose category
          </label>

          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="category-error"
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
            <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"  />
          </div>

          <div id="product-error" aria-live="polite" aria-atomic="true">
          {state.errors?.categoryId &&
            state.errors.categoryId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
         </div>

        </div>
        {/* Fin Sale Product */}

        {/* Sale Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium"
                 aria-describedby="amount-error">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              
            </div>
          </div>

          {/* Validation */}
          <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.amount &&
            state.errors.amount.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
         </div>

        </div>

        {/* Sale Method */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium"
                  aria-describedby="method-error">
            Set the sale method
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">

              <div className="flex items-center">
                <input
                  id="cash"
                  name="method"
                  type="radio"
                  value= "cash"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={() => handlePaymentMethodChange('cash')}
              
                  checked={paymentMethod === 'cash'}
                />
                <label
                  htmlFor="cash"
                  className={clsx(
                    "ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-green-600 hover:text-white",
                    paymentMethod === 'cash' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                  )}
                >
                    Cash
                    <Icon icon="mdi:cash-multiple" className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="card"
                  name="method"
                  type="radio"
                  value="card"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  checked={paymentMethod === 'card'}
                  onChange={() => handlePaymentMethodChange('card')}
                 
                />
                <label
                  htmlFor="card"
                  className={clsx(
                    "ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-green-600 hover:text-white",
                    paymentMethod === 'card' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                  )}
                >
                  Card 
                  <Icon icon="ion:card" className="h-4 w-4"/>
                </label>
              </div>

            </div>
          </div>

           {/* Validation */}
           <div id="method-error" aria-live="polite" aria-atomic="true">
          {state.errors?.method &&
            state.errors.method.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
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
        <Button type="submit">Create Sale</Button>
      </div>
    </form>
  );
}
