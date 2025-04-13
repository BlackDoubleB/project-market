import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/products/table";
import { lusitana } from "@/app/ui/fonts";
import { ProductsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchProductsPages } from "@/app/lib/data";
import { Metadata } from "next";
import { ButtonsCreate } from "@/app/ui/ButtonsCreate";

export const metadata: Metadata = {
  title: "Products",
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
  const totalPages = await fetchProductsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Products..." />
        <ButtonsCreate name={"Add Product"} />
      </div>

      <div className="overflow-x-auto border-1 border-gray-300 mt-6 rounded-lg">
        <Suspense
          key={query + currentPage}
          fallback={<ProductsTableSkeleton />}
        >
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
