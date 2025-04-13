"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";
import MainShowForm from "@/app/ui/sales/MainShowForm";
import { Category, Product, SaleById } from "@/app/lib/definitions";
import "./stylesSales.css";

export function ShowDetailsWrapper({
  saleById,
  categories,
  products,
}: {
  saleById: SaleById[];
  categories: Category[];
  products: Product[];
}) {
  const [actived, setActived] = useState(false);

  return (
    <>
      <button
        onClick={() => setActived(true)}
        type="button"
        className="py-3 h-full"
      >
        <Icon icon="bx:show" className="hover:cursor-pointer" />
      </button>

      <MainShowForm
        className={clsx(actived ? "sale-show" : "sale-hide")}
        saleById={saleById}
        categories={categories}
        products={products}
        setActived={setActived}
        actived={actived}
      />
      {actived && (
        <div className="bg-gray-700 opacity-75  h-screen w-full  z-20 absolute top-0 left-0 right-0 bottom-0"></div>
      )}
    </>
  );
}
