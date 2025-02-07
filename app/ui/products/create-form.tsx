'use client';
import { createProduct, StateProduct } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/app/ui/button';
import { ProductField } from '@/app/lib/definitions';
import { startTransition } from "react";

export default function Form({ products }: { products: ProductField[] }) {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const initialState: StateProduct = { message: null, errors: {} };
    const [state, formAction] = useActionState(createProduct, initialState);

    const uniqueProducts = Array.from(new Set(products.map((product) => product.category_id))).map((categoryId) => {
        return products.find((product) => product.category_id === categoryId);
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('Por favor, selecciona una imagen');
            return;
        }

        const form = e.currentTarget as HTMLFormElement;
        if (!form) {
            console.error('Form is null or undefined');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Subir la imagen a Cloudinary
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setImageUrl(data.url); // Guardar la URL de la imagen

                // Crear un nuevo FormData para enviar los datos del producto
                const productFormData = new FormData();
                productFormData.append('product_name', form.product_name.value);
                productFormData.append('category_id', form.category_id.value);
                productFormData.append('price', form.price.value);
                productFormData.append('image_url', data.url);

                // ✅ Usa startTransition para ejecutar formAction de forma segura
                startTransition(() => {
                    formAction(productFormData);
                });
            } else {
                console.error('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                            {uniqueProducts.map((product) => (
                                product && (
                                    <option key={product.category_id} value={product.category_id}>
                                        {product.category_name}
                                    </option>
                                )
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
                    <div id="product_name" aria-live="polite" aria-atomic="true">
                        {state.errors?.product_name &&
                            state.errors.product_name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Upload file
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="file_input"
                                name="image_url"
                                type="file"
                                onChange={handleFileChange}
                                aria-describedby="image_url"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                    {imageUrl && <p className="mt-2 text-sm text-gray-500">Imagen subida: {imageUrl}</p>}
                    <div id="image_url" aria-live="polite" aria-atomic="true">
                        {state.errors?.image_url &&
                            state.errors.image_url.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="
                    price" className="mb-2 block text-sm font-medium" aria-describedby="price">
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
                    <div id="price" aria-live="polite" aria-atomic="true">
                        {state.errors?.price &&
                            state.errors.price.map((error: string) => (
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
                <Button type="submit">Create Product</Button>
            </div>
        </form>
    );
}