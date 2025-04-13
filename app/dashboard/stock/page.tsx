import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/stock/table";
import { lusitana } from "@/app/ui/fonts";
import { StockTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchStockPages } from "@/app/lib/data";
import { Metadata } from "next";
import { ButtonsCreate } from "@/app/ui/ButtonsCreate";

export const metadata: Metadata = {
  title: "Stock",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchStockPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Stock</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search
          placeholder="Search stock
      ..."
        />

        <ButtonsCreate name={"Add Stock"} />
      </div>

      <div className="border-1 border-gray-300 mt-6 rounded-lg overflow-x-auto">
        <Suspense key={query + currentPage} fallback={<StockTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
