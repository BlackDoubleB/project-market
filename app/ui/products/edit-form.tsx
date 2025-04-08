
'use client';
import { updateProduct, StateProduct } from '@/app/lib/actions';
import { useActionState, useState, startTransition } from 'react';
import { CategoryFetch, ProductById } from '@/app/lib/definitions';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditCategoryForm({ categories, productById }: { categories: CategoryFetch[], productById: ProductById; }) {
    const initialState: StateProduct = { message: null, errors: {} };
    const updateProductWithId = updateProduct.bind(null, productById.product_id);
    const [state, formAction] = useActionState(updateProductWithId, initialState);
    console.log(state, "state");

    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(productById.image_url);


    //
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Generar una URL de vista previa de la imagen
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        if (!form) {
            console.error('Form is null or undefined');
            return;
        }

        const formData = new FormData();
        if (file) {
            // Si hay un nuevo archivo, lo subimos
            formData.append('file', file);
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.url);
                    formData.append('image_url', data.url);
                } else {
                    console.error('Error al subir la imagen');
                    return;
                }
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                return;
            }
        } else {
            // Si no se seleccionó un nuevo archivo, usar la URL existente
            formData.append('image_url', productById.image_url);
        }

        formData.append('product_name', form.product_name.value);
        formData.append('category_id', form.category_id.value);
        formData.append('price', form.price.value);

        startTransition(() => {
            formAction(formData);
        });
    };



    return <form onSubmit={handleSubmit}>
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
                        defaultValue={productById.category_id}
                        aria-describedby="category_id-error">

                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>))}

                    </select>
                    
                </div>

                <div id="category_id-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.category_id &&
                        state.errors.category_id.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            </div>
            {/* Fin Category Name */}

            {/* Product Name */}
            <div className="mb-4">
                <label htmlFor="product_name" className="mb-2 block text-sm font-medium">
                    Product Name
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="product_name"
                            name="product_name"
                            type="text"
                            defaultValue={productById.product_name}
                            aria-describedby="product_name-error"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                       

                    </div>
                </div>

                {/* Validation */}
                <div id="product_name-error" aria-live="polite" aria-atomic="true">
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
            <label htmlFor="file_input" className="mb-2 block text-sm font-medium">
                    File
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        {/* Vista previa de la imagen actual si existe */}

                        <div className="mb-2">
                            <img
                                src={imageUrl || productById.image_url}
                                alt="Imagen seleccionada"
                                className="w-32 h-32 object-cover rounded-md border border-gray-300"
                            />
                        </div>

                        <input
                            id="file_input"
                            name="image_url"
                            type="file"
                            onChange={handleFileChange}
                           
                            aria-describedby="image_url"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-hidden dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
            {/* Fin Image URL */}

            {/* Price */}
            <div className="mb-4">
                <label htmlFor="price" className="mb-2 block text-sm font-medium">
                    Price
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={productById.price}
                            aria-describedby="price-error"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <Icon icon="formkit:currency" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                    </div>
                </div>

                {/* Validation */}
                <div id="price-error" aria-live="polite" aria-atomic="true">
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
            <Link
                href="/dashboard/products"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancel
            </Link>
            <Button type="submit">Edit Category</Button>
        </div>
    </form>
}
