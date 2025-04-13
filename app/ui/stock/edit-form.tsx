"use client";
import { updateStock, StateStock } from "@/app/lib/actions";
import { useActionState } from "react";
import { ProductFetch, StockById } from "@/app/lib/definitions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function EditStockForm({
  stockById,
  products,
}: {
  stockById: StockById;
  products: ProductFetch[];
}) {
  const initialState: StateStock = { message: null, errors: {} };
  const updateStockWithId = updateStock.bind(null, stockById.stock_id);
  const [state, formAction] = useActionState(updateStockWithId, initialState);
  console.log(state, "state");

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-6 border-1 border-gray-300 ">
        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="product_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose Product
          </label>
          <div className="relative">
            <Icon
              icon="gridicons:nametag"
              className="absolute top-3 left-3 text-gray-400"
            />
            <select
              id="product_id"
              name="product_id"
              className="peer block w-full cursor-pointer rounded-md py-2 pl-10 text-sm placeholder:text-gray-500
              focus:outline-none border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1
                focus:shadow-md focus:shadow-blue-200/50
            "
              defaultValue={stockById.product_id}
              aria-describedby="product_id-error"
            >
              {products.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </select>
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
        {/* Fin Product Name */}

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                defaultValue={stockById.quantity}
                className="peer block w-full rounded-md py-2 pl-10 text-sm placeholder:text-gray-500
                focus:outline-none border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1
                focus:shadow-md focus:shadow-blue-200/50"
                aria-describedby="quantity-error"
              />
              <Icon
                icon="fluent-mdl2:quantity"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
              />
            </div>
          </div>

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
        <Link
          href="/dashboard/stock"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className="cursor-pointer">
          Edit Stock
        </Button>
      </div>
    </form>
  );
}
