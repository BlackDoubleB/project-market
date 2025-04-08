import CardWrapper from "@/app/ui/dashboard/cards";
import LatestSales from "@/app/ui/dashboard/latest-sales";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { LatestSalesSkeleton, CardsSkeleton } from "@/app/ui/skeletons";
import { Component } from "@/app/ui/dashboard/column-chart";
import { fetchSales } from "@/app/lib/data";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const sales = await fetchSales();
  const session = await auth();
  if (!session) return redirect("/login");
  return (
    <main>
      <div>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl pl-10`}>
          Dashboard
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-2">
        <Component sales={sales} />
        <div>
          <Suspense fallback={<LatestSalesSkeleton />}>
            <LatestSales />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
