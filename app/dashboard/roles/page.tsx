import Pagination from '@/app/ui/roles/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/roles/table';
import { CreateRole } from '@/app/ui/roles/buttons';
import { lusitana } from '@/app/ui/fonts';
import { SalesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchRolesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roles',
};

export default async function Page(props: {
  searchParams?: Promise<{
  query?: string;
  page?: string;
  }>;
}) 
{
  
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalRoles = await fetchRolesPages(query);

return (
  <div className="w-full">

    <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>Roles</h1>
    </div>

    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search roles..." />
      <CreateRole />
    </div>

    <Suspense key={query + currentPage} fallback={<SalesTableSkeleton />}>
      <Table query={query} currentPage={currentPage} />
    </Suspense>

    <div className="mt-5 flex w-full justify-center">
      <Pagination totalRoles={totalRoles} />
    </div>

  </div>
);
}