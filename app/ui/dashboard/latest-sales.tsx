import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { fetchLatestSales } from "@/app/lib/data";

export default async function LatestInvoices() {
  const latestSales = await fetchLatestSales();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Sales
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestSales.map((sale, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  "relative truncate flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  },
                )}
              >
                <div className="truncate flex items-center lg:w-[calc(100%-4rem)]">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold md:text-base">
                      {sale.product_name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {sale.category_name}
                    </p>
                    <Image
                      src={sale.image_url}
                      alt={`${sale.product_name}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                    <p className="hidden text-sm text-gray-500 sm:block">
                      S/. {sale.total}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Icon icon="material-symbols:history" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
