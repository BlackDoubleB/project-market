"use client";
import SubCardShowForm from "@/app/ui/sales/SubCardShowForm";
import { Category, Product, SaleById } from "@/app/lib/definitions";
import { format } from "date-fns";
import clsx from "clsx";
import "./stylesSales.css";
export default function MainShowForm({
  saleById,
  categories,
  products,
  setActived,
  className = "",
}: {
  saleById: SaleById[]; // Correctly types as the return type of fetchSaleById
  categories: Category[];
  products: Product[];
  setActived: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-2xl border border-solid border-gray-500",
        className,
      )}
    >
      <div className="scrollbar overflow-y-auto h-[580px] w-full  rounded-2xl bg- my-2  pl-7 pr-5 py-8 ">
        <div>
          <div className="text-center mb-5">
            <h1>DETALLE DE VENTA</h1>
          </div>

          <div className="mb-5">
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
          <div className="mt-5">
            <p className="block text-sm font-medium leading-5  text-gray-700">
              Total
            </p>
            <div className="mt-1 relative rounded-md shadow-sm">
              <p>S/. {saleById[0].total}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              onClick={() => setActived(false)}
            >
              Cerrrar
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
