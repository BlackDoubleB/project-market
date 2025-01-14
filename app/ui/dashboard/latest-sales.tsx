import HistoryIcon from '@mui/icons-material/History';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestSale } from '@/app/lib/definitions';
export default async function LatestInvoices({
  latestSales,
}: {
  latestSales: LatestSale[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Sales
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestSales.map((sale, i) => {
            return (
              <div
                key={sale.id}
                className={clsx(
                  'relative truncate bg-red-400 flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}>
                <div className="truncate bg-yellow-100 flex items-center lg:w-[calc(100%-4rem)]">
                  <Image
                    src={sale.image_url}
                    alt={`${sale.name_product}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold md:text-base">
                      {sale.name_product}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {sale.name_category}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className}  text-sm font-medium md:text-base bg-blue-400 absolute right-0`}
                >
                  {sale.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <HistoryIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}