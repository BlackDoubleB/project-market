'use client';
import { createProduct, StateProduct } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { ProductFetch } from '@/app/lib/definitions';

export default function Form({ products }: { products: ProductFetch[] }) {
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    product_id: string;
    category_id: string;
    category_name: string;
    image_url: string;
    price: number;
  }>>([]);

  const initialState: StateProduct = { message: null, errors: {} };
  const [state, formAction] = useActionState(createProduct, initialState);
  console.log(state);
  
  // Función para manejar el cambio de selección de producto
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find((product) => product.product_id === selectedProductId);

    if (selectedProduct) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index] = {
        product_id: selectedProduct.product_id,
        category_id: selectedProduct.category_id,
        category_name: selectedProduct.category_name,
        image_url: selectedProduct.image_url,
        price: selectedProduct.price,
      };
      setSelectedProducts(updatedProducts);
    }
  }

  // Función para añadir un nuevo conjunto de campos
  function addProduct() {
    setSelectedProducts([...selectedProducts, {
      product_id: "",
      category_id: "",
      category_name: "",
      image_url: "",
      price: 0,
    }]);
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <button type="button" id="add_product" onClick={addProduct}>
          Añadir Producto
        </button>

        {/* Renderizar los campos para cada producto seleccionado */}
        {selectedProducts.map((product, index) => (
          <div key={index}>
            {/* Product Name */}
            <div className="mb-4">
              <label htmlFor={`product_id_${index}`} className="mb-2 block text-sm font-medium">
                Choose Product
              </label>
              <div className="relative">
                <select
                  id={`product_id_${index}`}
                  name={`product_id_${index}`}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  value={product.product_id}
                  onChange={(e) => handleChange(e, index)}
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
              </div>
            </div>

            {/* Category Name */}
            <div className="mb-4">
              <label htmlFor={`category_id_${index}`} className="mb-2 block text-sm font-medium">
                Category
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  {/* Input solo para mostrar el nombre de la categoría */}
                  <input
                    type="text"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    value={product.category_name}
                    readOnly
                  />

                  {/* Input oculto que envía solo el category_id */}
                  <input
                    type="hidden"
                    name={`category_id_${index}`}
                    value={product.category_id}
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label htmlFor={`image_url_${index}`} className="mb-2 block text-sm font-medium">
                Image
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  {/* Solo para mostrar la imagen */}
                  <img
                    src={product.image_url}
                    alt="Product"
                    className="block w-full rounded-md border border-gray-200 w-40 h-40"
                  />

                  {/* Input oculto para enviar la URL de la imagen */}
                  <input
                    type="hidden"
                    name={`image_url_${index}`}
                    value={product.image_url}
                  />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor={`price_${index}`} className="mb-2 block text-sm font-medium">
                Price
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  {/* Input solo para mostrar */}
                  <input
                    type="number"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    value={product.price}
                    readOnly
                  />

                  {/* Input oculto que envía */}
                  <input
                    type="hidden"
                    name={`price_${index}`}
                    value={product.price}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
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