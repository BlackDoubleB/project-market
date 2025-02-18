'use client';
import { createSale, StateSale } from '@/app/lib/actions';
import { useActionState, useState, useEffect } from 'react'; // Importa useEffect
import { ProductFetch, SaleTable } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { Icon } from '@iconify/react';
import { v4 as uuidv4 } from 'uuid';


export default function Form({ products }: { products: ProductFetch[] }) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(''); // Estado para el método de pago
  const [selectedDetailSaleProduct, setSelectedDetailSaleProduct] = useState<Array<SaleTable>>([]);
  const initialState: StateSale = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSale, initialState);
  const [stateSelect, setStateSelect] = useState<Array<string>>([]);

  console.log(state);
  // Función para añadir un nuevo conjunto de campos
  function addDetailSaleProduct() {
    setSelectedDetailSaleProduct([...selectedDetailSaleProduct, {
      id: uuidv4(), // ID único
      product_id: "",
      quantity: 1,
    }]);

    setStateSelect((prevItems) => [...prevItems, ""]);

  }


  // Función para actualizar el product_id de un producto específico
  function updateProductId(index: number, productId: string) {
    const updatedProducts = [...selectedDetailSaleProduct];
    updatedProducts[index].product_id = productId;
    setSelectedDetailSaleProduct(updatedProducts);

    //Hacemos una copia del array
    const updateItems = [...stateSelect];
    // Cambiamos el valor en el índice correspondiente
    updateItems[index] = productId;
    // Actualizamos el estado con la copia modificada
    setStateSelect(updateItems);

  }

  // Función para actualizar la cantidad de un producto específico
  function updateQuantity(index: number, quantity: number) {
    if (isNaN(quantity) || quantity < 1) quantity = 1; // Si no es un número válido o es menor que 1, se establece en 1
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
    console.log("holaaaa",selectedDetailSaleProduct)

    setTotal(newTotal);
  }, [selectedDetailSaleProduct, products]);


  return (
    <form action={formAction}>
      <div className='bg-black py-2 px-6 flex space-between items-center justify-between rounded-md'>

        <div className='flex items-center'>
          <label htmlFor="method" className="block text-sm font-medium pr-3 text-cyan-50">
            Metodo de Pago
          </label>
          <div className="relative ">
            <select
              id="method"
              className="block cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 text-center outline-none h-9 w-36"
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

          <div id="product-error" aria-live="polite" aria-atomic="true">
            {state.errors?.method &&
              state.errors.method.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>

        <div className="flex justify-end items-center">
          <label htmlFor={`total`} className="text-sm font-medium pr-3 text-cyan-50">
            Total :
          </label>

          <div className='relative'>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              S/
            </span>
            <input
              id='total'
              type="number"
              value={total}
              readOnly
              className='bg-gray-50 border pointer-events-none text-center w-44 h-9 rounded-lg pl-8'
            />
          </div>
        </div>
      </div>

      <div className="rounded-md pt-2">
        <div>
          {/* Renderizar los campos para cada producto seleccionado */}
          {selectedDetailSaleProduct.map((dsp, index) => (
            <div className='pb-2' key={dsp.id}>
              <div className='bg-neutral-400 p-4 rounded-md border border-slate-300 shadow-lg shadow-black-500/50'>
                {/* Product Name */}
                <div className="mb-4">
                  <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
                    Choose Product
                  </label>

                  <div className="relative">
                    <select
                      id="product_id"
                      className="bg-white block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 outline-none h-10"
                      aria-describedby={`product_id-error-${index}`}
                      defaultValue=""
                      onChange={(e) => updateProductId(index, e.target.value)}
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

                  {stateSelect[index] === "" ?  state.errors?.products && state.errors?.products.length > 0 &&
                        state.errors.products.find(x => x.index == index) && (
                            <p className="mt-2 text-sm text-red-500" id={`product_id-error-${index}`}>
                              {state.errors.products.find(x => x.index == index)?.message}
                            </p>
                        ): ""}

                 


                  {/*{JSON.stringify(state.errors?.products)}*/}

                </div>
                {/* Category Name */}
                <div className="mb-4 pointer-events-none">
                  <p className="mb-2 block text-sm font-medium">
                    Category
                  </p>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <p className=" block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm outline-2 h-10">
                        {dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.category_name : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image URL */}
                <div className="mb-4 pointer-events-none">
                  <p className="mb-2 block text-sm font-medium">
                    Image
                  </p>
                  <div className="relative mt-2">
                    <div className="relative w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                      {dsp.product_id && Array.isArray(products) &&
                        products.find((product) => product.product_id === dsp.product_id)?.image_url ?
                        (<img src={products.find((product) => product.product_id === dsp.product_id)?.image_url} alt="Product" className="block w-full rounded-lg" />)
                        :
                        (<Icon icon="lets-icons:img-box" className="w-16 h-16 text-gray-400" />)
                      }
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 pointer-events-none">
                  <p className="mb-2 block text-sm font-medium">
                    Price
                  </p>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <p className="block w-full rounded-md border bg-white border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 h-10">
                        {dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.price : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label htmlFor={`quantity`} className="mb-2 block text-sm font-medium">Quantity</label>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative flex items-center">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, dsp.quantity - 1)}
                        className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-neutral-500 h-10"
                      >
                        -
                      </button>
                      <input
                        id='quantity'
                        type="number"
                        min={1}
                        value={dsp.quantity}
                        readOnly
                        className="w-20 text-center bg-white border-t border-b border-gray-200 h-10 pointer-events-none"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, dsp.quantity + 1)}
                        className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-neutral-500  h-10"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      <div>
        <div className='flex items-start  '>
          <div className='bg-yellow-400 flex items-center gap-2 py-1 px-3 rounded-lg hover:cursor-pointer' onClick={addDetailSaleProduct}>
            <Icon icon="gridicons:add" />
            <button type="button" id="add_product">
              Add Product
            </button>
          </div>
        </div>
      </div>



      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/sales" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit" >Create Sale</Button>
      </div>
    </form>
  );
}