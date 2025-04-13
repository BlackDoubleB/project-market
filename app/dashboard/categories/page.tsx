import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/categories/table";
import { lusitana } from "@/app/ui/fonts";
import { CategoriesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchCategoriesPages } from "@/app/lib/data";
import { Metadata } from "next";
import { ButtonsCreate } from "@/app/ui/ButtonsCreate";

export const metadata: Metadata = {
  title: "Categories",
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
  const totalPages = await fetchCategoriesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Categories</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search categories..." />
        <ButtonsCreate name={"Add Category"} />
      </div>

      <div className="overflow-x-auto border-1 border-gray-300 mt-6 rounded-lg">
        <Suspense
          key={query + currentPage}
          fallback={<CategoriesTableSkeleton />}
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
