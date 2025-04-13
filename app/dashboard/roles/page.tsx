import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/roles/table";
import { lusitana } from "@/app/ui/fonts";
import { SalesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchRolesPages } from "@/app/lib/data";
import { Metadata } from "next";
import { ButtonsCreate } from "@/app/ui/ButtonsCreate";

export const metadata: Metadata = {
  title: "Roles",
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
  const totalPages = await fetchRolesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Roles</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search roles..." />

        <ButtonsCreate name={"Add Role"} />
      </div>

      <div className="overflow-x-auto border-1 border-gray-300 mt-6 rounded-lg">
        <Suspense key={query + currentPage} fallback={<SalesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
