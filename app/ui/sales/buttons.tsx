"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import MainShowForm from "@/app/ui/sales/MainShowForm";
import { Category, Product, SaleById } from "@/app/lib/definitions";
import "./stylesSales.css";

export function CreateSale() {
  return (
    <Link
      href="/dashboard/sales/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Sale</span>{" "}
      <Icon icon="mdi:plus" className="h-5 md:ml-4" />
    </Link>
  );
}

export function ShowDetailsWrapper({
  saleById,
  categories,
  products,
}: {
  saleById: SaleById[]; // Correctly types as the return type of fetchSaleById
  categories: Category[];
  products: Product[];
}) {
  const [actived, setActived] = useState(false);

  return (
    <>
      <button onClick={() => setActived(true)} type="button">
        <Icon icon="bx:show" className="w-5 hover:cursor-pointer" />
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
        <div className="bg-gray-700 opacity-75 bg h-screen w-full overflow-visible z-20 absolute top-0 left-0 right-0 bottom-0"></div>
      )}
    </>
  );
}
