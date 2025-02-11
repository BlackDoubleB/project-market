'use client';
import { createStock, StateStock } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/app/ui/button';
import { ProductFetch } from '@/app/lib/definitions';

export default function Form({ products }: { products: ProductFetch[] }) {
    const initialState: StateStock = { message: null, errors: {} };
    const [state, formAction] = useActionState(createStock, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
                        Choose Product
                    </label>
                    <div className="relative">
                        <select
                            id="product_id"
                            name="product_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="product_id-error"
                        >
                            <option value="" disabled>
                                Select a Product
                            </option>
                            {products.map((product) => (
                                    <option key={product.product_id} value={product.product_id}>
                                        {product.product_name}
                                    </option>
                                
                            ))}

                        </select>
                        <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="product_id-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.product_id &&
                            state.errors.product_id.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/*  */}

                {/* Quantity */}
                <div className="mb-4">
                    <label htmlFor="quantity" className="mb-2 block text-sm font-medium" >
                     Quantity
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="Enter an quantity"
                                aria-describedby="quantity-error"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {/* Validation */}
                    <div id="quantity-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.quantity &&
                            state.errors.quantity.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link href="/dashboard/stock" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <Button type="submit">Create Stock</Button>
            </div>

        </form>
    );
}
