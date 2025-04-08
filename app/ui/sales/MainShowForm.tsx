"use client";
import SubCardShowForm from "@/app/ui/sales/SubCardShowForm";
import { Category, Product, SaleById } from "@/app/lib/definitions";
import { format } from "date-fns";
import clsx from "clsx";
import "./stylesSales.css";
import { useEffect, useRef } from "react";
import { lusitana } from "@/app/ui/fonts";
export default function MainShowForm({
  saleById,
  categories,
  products,
  setActived,
  className = "",
  actived,
}: {
  saleById: SaleById[]; // Correctly types as the return type of fetchSaleById
  categories: Category[];
  products: Product[];
  setActived: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  actived: boolean;
}) {
  // Ref para la modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (actived && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [actived]);

  return (
    <div
      className={clsx(
        "w-full h-full flex items-center justify-center ",
        className,
      )}
    >
      <div className="bg-white drop-shadow-xl/50 scrollbar w-[456px] h-[550px] overflow-y-auto">
        <div className="flex items-center justify-center text-center bg-black w-full h-20 sticky top-0 ">
          <h1
            className={`${lusitana.className} text-base text-white`}
            style={{ fontWeight: 700 }}
          >
            DETALLE DE VENTA
          </h1>
        </div>

        <div
          ref={modalRef}
          className="my-7 pl-7 pr-5 pt-4 rounded-2xl h-[450px]"
        >
          <div className=" w-full">
            <div className="mb-5 pl-4">
              <p className="block text-sm font-bold leading-5 text-gray-500">
                Fecha de Registro
              </p>
              <div className="mt-1 relative rounded-md shadow-xs">
                {saleById[0].date_register
                  ? format(
                      new Date(saleById[0].date_register),
                      "yyyy-MM-dd HH:mm:ss",
                    )
                  : "N/A"}
              </div>
            </div>

            <div className="mb-5 pl-4">
              <p className="block text-sm font-bold  leading-5  text-gray-500">
                Medio de Pago
              </p>
              <div className="mt-1 relative rounded-md shadow-xs">
                <p>{saleById[0].method}</p>
              </div>
            </div>

            {saleById.map((sale, index) => (
              <div key={index} className="mt-6 bg-gray-300 rounded-2xl p-4">
                <SubCardShowForm
                  key={index}
                  sale={sale}
                  categories={categories}
                  products={products}
                />
              </div>
            ))}
            <div className="mt-5 pl-4">
              <p className="block text-sm font-bold leading-5  text-gray-500">
                Total
              </p>
              <div className="mt-1 relative rounded-md shadow-xs">
                <p>S/. {saleById[0].total}</p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0  p-4">
            <span className="block w-full rounded-md shadow-xs">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-neutral-900 hover:cursor-pointer focus:scale-105
              "
                onClick={() => setActived(false)}
              >
                Cerrrar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
