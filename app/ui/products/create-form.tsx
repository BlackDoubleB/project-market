'use client';
import { createProduct, StateProduct } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/app/ui/button';
import { ProductField } from '@/app/lib/definitions';


export default function Form({ products }: { products: ProductField[] }) {
    const initialState: StateProduct = { message: null, errors: {} };
    const [state, formAction] = useActionState(createProduct, initialState);

    return (
        <form action={formAction} 
        >
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/* Category Name */}
                <div className="mb-4">
                    <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
                        Choose Category
                    </label>

                    <div className="relative">
                        <select
                            id="category_id"
                            name="category_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="category_id-error"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {products.map((product) => (
                                <option key={product.category_id} value={product.category_id}>
                                    {product.category_name}
                                </option>
                            ))}

                        </select>
                        <Icon icon="solar:user-circle-bold" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>

                    <div id="product-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.category_id &&
                            state.errors.category_id.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>

                </div>
                {/* Fin Sale Product */}

                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="product_name" className="mb-2 block text-sm font-medium" aria-describedby="product_name">
                        Product Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="product_name"
                                name="product_name"
                                type="text"
                                placeholder="Enter an Name Product"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                            />
                            <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                        </div>
                    </div>

                    {/* Validation */}
                    <div id="product_name" aria-live="polite" aria-atomic="true">
                        {state.errors?.product_name &&
                            state.errors.product_name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>

                </div>
                {/* Fin Product Name */}

                {/* Image URL */}
                <div className="mb-4">
                    <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" aria-describedby="image_url">Upload file</label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="file_input"
                                name="image_url"
                                type="file"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                        </div>
                    </div>

                    {/* Validation */}
                    <div id="image_url" aria-live="polite" aria-atomic="true">
                        {state.errors?.image_url &&
                            state.errors.image_url.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>

                </div>
                {/* Fin Image URL */}

                {/* Price*/}
                <div className="mb-4">
                    <label htmlFor="price" className="mb-2 block text-sm font-medium" aria-describedby="price">
                        Price
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Enter an price"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                            />
                    
                        </div>
                    </div>
                    {/* Validation */}
                    <div id="price" aria-live="polite" aria-atomic="true">
                        {state.errors?.price &&
                            state.errors.price.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Fin Price */}


            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link href="/dashboard/categories" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <Button type="submit">Create Product</Button>
            </div>

        </form>
    );
}
