'use client';
import { createSale, StateSale } from '@/app/lib/actions';
import { useActionState, useState, useEffect } from 'react'; // Importa useEffect
import { ProductFetch, SaleTable } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function Form({ products }: { products: ProductFetch[] }) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(''); // Estado para el método de pago
  const [selectedDetailSaleProduct, setSelectedDetailSaleProduct] = useState<Array<SaleTable>>([]);
  const initialState: StateSale = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSale, initialState);
  console.log(state);

  // Función para añadir un nuevo conjunto de campos
  function addDetailSaleProduct() {
    setSelectedDetailSaleProduct([...selectedDetailSaleProduct, {
      id: `${Date.now()}-${Math.random()}`,
      product_id: "",
      quantity: 1,
    }]);
  }

  // Función para actualizar el product_id de un producto específico
  function updateProductId(index: number, productId: string) {
    const updatedProducts = [...selectedDetailSaleProduct];
    updatedProducts[index].product_id = productId;
    setSelectedDetailSaleProduct(updatedProducts);
  }

  // Función para actualizar la cantidad de un producto específico
  function updateQuantity(index: number, quantity: number) {
    if (quantity < 1) quantity = 1; // Evitar valores menores que 1
    const updatedProducts = [...selectedDetailSaleProduct];
    updatedProducts[index].quantity = quantity;
    setSelectedDetailSaleProduct(updatedProducts);
  }

  // Calcular el total cuando cambia selectedDetailSaleProduct
  useEffect(() => {
    let newTotal = 0;
    selectedDetailSaleProduct.forEach((dsp) => {
      const product = products.find((p) => p.product_id === dsp.product_id);
      const price = product?.price ?? 0; // Asegurar que price tenga un valor numérico
      const quantity = dsp.quantity > 0 ? dsp.quantity : 0; // Evitar valores inválidos
      newTotal += price * quantity;
    });
    setTotal(newTotal);
  }, [selectedDetailSaleProduct, products]);

return (
  <form action={formAction}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <button type="button" id="add_product" onClick={addDetailSaleProduct}>
        Añadir Producto
      </button>

      {/* Renderizar los campos para cada producto seleccionado */}
      {selectedDetailSaleProduct.map((dsp, index) => (
        <div key={dsp.id}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
              Choose Product
            </label>
            <div className="relative">
              <select
                id="product_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={(e) => updateProductId(index, e.target.value)}>
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
            <p className="mb-2 block text-sm font-medium">
              Category
            </p>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <p className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                  {dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.category_name : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <p className="mb-2 block text-sm font-medium">
              Image
            </p>
            <div className="relative mt-2 rounded-md">
              <div className="relative w-32 h-32">
                <img
                  src={dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.image_url : "http://www.w3.org/2000/svg"}
                  alt="Product"
                  className="block w-full rounded-md border border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="mb-2 block text-sm font-medium">
              Price
            </p>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <p className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                  {dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.price : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor={`quantity`} className="mb-2 block text-sm font-medium">
              Quantity
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id='quantity'
                  type="number"
                  min={1}
                  value={dsp.quantity}
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Method */}
      <div className="mb-4">
          <label htmlFor="method" className="mb-2 block text-sm font-medium">
            Choose Method
          </label>
          <div className="relative">
            <select
              id="method"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="" disabled>
                Select a Method
              </option>
              <option value="cash">
                cash
              </option>
              <option value="card">
                card
              </option>
            </select>
          </div>
          </div>
      {/* Total */}
      <div className="mb-4">
        <label htmlFor={`total`} className="mb-2 block text-sm font-medium">
          Total
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id='total'
              type="number"
              value={total}
              readOnly
            />
          </div>
        </div>
      </div>

       {/* Campo oculto para enviar selectedDetailSaleProduct */}
       <input
          type="hidden"
          name="selectedDetailSaleProduct"
            value={JSON.stringify({ products: selectedDetailSaleProduct, method: paymentMethod })} 

        />
         {/* Campo oculto para enviar method */}
       <input
          type="hidden"
          name="method"
            value={JSON.stringify({ method: paymentMethod })} />

    </div>

    <div className="mt-6 flex justify-end gap-4">
      <Link href="/dashboard/sales" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
        Cancel
      </Link>
      <Button type="submit">Create Sale</Button>
    </div>
  </form>
);
}