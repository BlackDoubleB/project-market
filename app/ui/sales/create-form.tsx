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
    errors: {} as Record<string, number>, //cambio
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
      <div className="bg-neutral-900 rounded-md flex flex-col md:flex-row p-3 gap-4 ">
        {/*Metodo de pago*/}

        <div className="flex items-center  md:w-full justify-end md:justify-start  ">
          <label
            className="text-white text-sm px-4 whitespace-nowrap"
            htmlFor="method "
          >
            Payment method
          </label>
          <div>
            <select
              id="method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="rounded-2xl text-sm md:w-44 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 text-center"
            >
              <option value="">Method</option>
              <option value="cash">cash</option>
              <option value="card">card</option>
            </select>
          </div>

          <div
            id="product-error"
            aria-live="polite"
            aria-atomic="true"
            className="hidden lg:flex justify-center items-center  ml-2 "
          >
            {paymentMethod === "" &&
              state.errors?.method &&
              state.errors.method.map((error: string) => (
                <div key={error} className="relative group">
                  <Icon
                    icon="tabler:alert-circle-filled"
                    className="size-5 text-red-500 cursor-pointer"
                  />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block z-50 cursor-default">
                    <div className="relative bg-red-600  text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                      {error}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-red-600"></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/*Fin*/}

        {/*Total*/}
        <div className="flex items-center gap-4 sm:w-full justify-end  ">
          <label htmlFor={`total`} className="text-white text-sm">
            Total
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">
              S/
            </span>
            <input
              id="total"
              type="number"
              value={total.toString()}
              readOnly
              className=" rounded-2xl pl-8 text-sm w-27 md:w-44 overflow-x-auto "
            />
          </div>
        </div>
        {/*  Fin total*/}
      </div>
      <div className="rounded-md pt-2">
        <div>{sales.map((dsp, index) => ItemProduct(index))}</div>

        <input
          type="hidden"
          name="selectedDetailSaleProduct"
          value={JSON.stringify({
            products: sales,
            method: paymentMethod,
          })}
        />

        <input
          type="hidden"
          name="method"
          value={JSON.stringify({ method: paymentMethod })}
        />
      </div>
      <div>
        <div className="flex items-start  ">
          <div className="relative flex items-center hover:scale-105 ">
            <Icon icon="subway:add" className="absolute text-gray-100 left-3" />
            <Button
              onClick={addDetailSaleProduct}
              className="
               pl-10 shadow-md  bg-yellow-400 hover:bg-yellow-300 hover:cursor-pointer active:bg-yellow-300"
              type="button"
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {sales.some((sale) => sale.product_id !== "")
        ? null
        : state.errors?.products?.map((error) =>
            error.message === "Debes agregar al menos un producto" ? (
              <div
                key={`${error.index}-${error.message}`}
                className="text-red-500"
              >
                {error.message}
              </div>
            ) : null,
          )}
      <div className="mt-6 flex justify-end gap-4 ">
        <Link
          href="/dashboard/sales"
          className="shadow-md flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          className="shadow-md hover:scale-105 bg-blue-700 hover:bg-blue-600 hover:cursor-pointer"
          type="submit"
        >
          Create Sale
        </Button>
      </div>
      {showSuccessModal == true ? (
        <div className="fixed z-20 flex items-center justify-center w-full h-full top-0 left-0  bg-black/60">
          <div
            id="alert-additional-content-1"
            className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800  dark:text-blue-400 dark:border-blue-800"
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
                  className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-hidden focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Return to Sales History
                </button>
              </Link>
              <button
                type="button"
                className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-hidden focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
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
