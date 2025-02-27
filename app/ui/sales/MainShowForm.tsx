"use client";
import SubCardShowForm from "@/app/ui/sales/SubCardShowForm";
import { Category, Product, SaleById } from "@/app/lib/definitions";
import { format } from "date-fns";

export default function MainShowForm({
  saleById,
  categories,
  products,
  setShowExternal,
}: {
  saleById: SaleById[]; // Correctly types as the return type of fetchSaleById
  categories: Category[];
  products: Product[];
  setShowExternal: (show: boolean) => void;
}) {
  return (
    <div className="absolute left-0 right-0 z-20 top-0 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <div className="text-center">
            <h1>Detalle de Venta</h1>
          </div>

          <div>
            <p className="block text-sm font-medium leading-5  text-gray-700">
              Fecha de Registro
            </p>
            <div className="mt-1 relative rounded-md shadow-sm">
              {saleById[0].date_register
                ? format(
                    new Date(saleById[0].date_register),
                    "yyyy-MM-dd HH:mm:ss",
                  )
                : "N/A"}
            </div>
          </div>

          <div>
            <p className="block text-sm font-medium leading-5  text-gray-700">
              Medio de Pago
            </p>
            <div className="mt-1 relative rounded-md shadow-sm">
              <p>{saleById[0].method}</p>
            </div>
          </div>

          {saleById.map((sale, index) => (
            <div key={index} className="mt-6">
              <SubCardShowForm
                key={index}
                sale={sale}
                categories={categories}
                products={products}
              />
            </div>
          ))}
          <div>
            <p className="block text-sm font-medium leading-5  text-gray-700">
              Total
            </p>
            <div className="mt-1 relative rounded-md shadow-sm">
              <p>{saleById[0].total}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              onClick={() => setShowExternal(false)}
            >
              Cerrrar
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
