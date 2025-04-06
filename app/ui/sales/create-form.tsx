"use client";
import { createSale, StateSale } from "@/app/lib/actions";
import {
  useActionState,
  useState,
  useEffect,
  useCallback,
  startTransition,
} from "react";
import { ProductFetch, SaleTable } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from "uuid";
import CardProduct from "@/app/ui/sales/CardProduct";

export default function Form({ products }: { products: ProductFetch[] }) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(""); // Estado para el método de pago
  const [sales, setSales] = useState<Array<SaleTable>>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const initialState: StateSale = {
    message: null as string | null | undefined,
    errors: {} as Record<string, any>,
  };
  const [state, formAction] = useActionState(createSale, initialState);
  const [stock, setStock] = useState(true);

  // Función para añadir un nuevo conjunto de campos
  function addDetailSaleProduct() {
    setSales((prev) => [
      ...prev,
      {
        id: uuidv4(), // ID único
        product_id: "", // Inicializar sin producto seleccionado
        quantity: 1,
      },
    ]);
  }

  // Calcular el total cuando cambia selectedDetailSaleProduct
  useEffect(() => {
    let newTotal = 0;
    sales.forEach((dsp) => {
      const product = products.find((p) => p.product_id === dsp.product_id);
      const price = product?.price ?? 0; // Asegurar que price tenga un valor numérico
      const quantity = dsp.quantity > 0 ? dsp.quantity : 0; // Evitar valores inválidos
      newTotal += price * quantity;
    });

    console.log("Prueba sales", sales);
    setTotal(newTotal);
  }, [sales, products]);

  const updateItemProductId = (index: number, productId: string) => {
    setSales((prev) => {
      const newSales = [...prev];
      newSales[index].product_id = productId;
      return newSales;
    });
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    setSales((prev) => {
      const newSales = [...prev];
      newSales[index].quantity = quantity;
      return newSales;
    });
  };

  const deleteProduct = (index: number) => {
    setSales((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  const ItemProduct = useCallback(
    (index: number) => {
      return (
        <CardProduct
          key={index}
          index={index}
          products={products}
          messageError={state}
          updateItemProductId={updateItemProductId}
          updateItemQuantity={updateItemQuantity}
          sales={sales}
          deleteProduct={deleteProduct}
          stock={stock}
        />
      );
    },
    [products, state, sales],
  );

  useEffect(() => {
    console.log("Estado actual del mensaje:", state.message);
    console.log("Estado del product stock", state.errors_stock);
    console.log("Datos enviados", sales);
    if (state.message == "Sale created successfully.") {
      console.log("Mostrando modal...");
      setShowSuccessModal(true);

      setPaymentMethod("");
    } else {
      setShowSuccessModal(false);
      if (state.message == "Out of stock") {
        setStock(false);
      }
    }
  }, [state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Crear los datos a enviar
    const formData = new FormData();
    formData.append(
      "selectedDetailSaleProduct",
      JSON.stringify({ products: sales }),
    );
    formData.append("method", JSON.stringify({ method: paymentMethod }));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="bg-black py-2 px-6 flex space-between items-center justify-between rounded-md">
        <div className="flex items-center">
          <label
            htmlFor="method"
            className="block text-sm font-medium pr-3 text-cyan-50"
          >
            Metodo de Pago
          </label>
          <div className="relative ">
            <select
              id="method"
              className="block cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 text-center outline-none h-9 w-36"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select a Method</option>
              <option value="cash">cash</option>
              <option value="card">card</option>
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
          <label
            htmlFor={`total`}
            className="text-sm font-medium pr-3 text-cyan-50"
          >
            Total :
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              S/
            </span>
            <input
              id="total"
              type="number"
              value={total}
              readOnly
              className="bg-gray-50 border pointer-events-none text-center w-44 h-9 rounded-lg pl-8"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md pt-2">
        <div>
          {/* Renderizar los campos para cada producto seleccionado */}
          {sales.map((dsp, index) => ItemProduct(index))}
        </div>

        {/* Campo oculto para enviar selectedDetailSaleProduct */}
        <input
          type="hidden"
          name="selectedDetailSaleProduct"
          value={JSON.stringify({
            products: sales,
            method: paymentMethod,
          })}
        />
        {/* Campo oculto para enviar method */}
        <input
          type="hidden"
          name="method"
          value={JSON.stringify({ method: paymentMethod })}
        />
      </div>

      <div>
        <div className="flex items-start  ">
          <div
            className="bg-yellow-400 flex items-center gap-2 py-1 px-3 rounded-lg hover:cursor-pointer"
            onClick={addDetailSaleProduct}
          >
            <Icon icon="gridicons:add" />
            <button type="button" id="add_product">
              Add Product
            </button>
          </div>
        </div>
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
      {showSuccessModal == true ? (
        <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 bg-black bg-opacity-50">
          <div
            id="alert-additional-content-1"
            className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
            role="alert"
          >
            <div className="flex items-center"></div>
            <div className="mt-2 mb-4 text-sm text-center flex items-center flex-col">
              Sale Exit
              <Icon icon="mdi:check-decagram" className="w-40 h-40" />
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/dashboard/sales">
                <button
                  type="button"
                  className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Return to Sales History
                </button>
              </Link>
              <button
                type="button"
                className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                data-dismiss-target="#alert-additional-content-1"
                onClick={() => {
                  state.message = "";
                  setShowSuccessModal(false);
                  setSales([]);
                }}
              >
                Create Another Sale
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
