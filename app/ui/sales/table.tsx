import Image from 'next/image';
import { UpdateSale, DeleteSale } from '@/app/ui/sales/buttons';
import SaleMethod from '@/app/ui/sales/method';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredSales } from '@/app/lib/data';
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const sales = await fetchFilteredSales(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Primer sub div */}
          <div className="md:hidden">
            {sales?.map((sale) => (
              <div
                key={sale.id}
                className="mb-2 rounded-md bg-white p-4"
              >

                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{sale.category_name}</p>
                  <div className='flex '>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={sale.image_url}
                        className="mr-2 rounded-full min-w-8"
                        width={30}
                        height={30}
                        alt={`${sale.product_name}'s profile picture`}
                      />
                    </div>
                    <div className='w-24 xxs:w-48 xs:w-80'>
                      <p className='truncate' >{sale.product_name}</p>
                    </div>
                  </div>
                </div>




                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    
                      <p className="text-xl font-medium">
                        {formatCurrency(sale.amount)}
                      </p>
                      <SaleMethod method={sale.method} />
               

                    <p>{formatDateToLocal(sale.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSale id={sale.id} />
                    <DeleteSale id={sale.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Fin primer sub div */}

          {/* Inicio Table*/}
          <table className="hidden min-w-full text-gray-900 md:table">

            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Product
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Method
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {sales?.map((sale) => (
                <tr
                  key={sale.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={sale.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${sale.product_name}'s profile picture`}
                      />
                      <p>{sale.product_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.category_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(sale.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(sale.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <SaleMethod method={sale.method} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSale id={sale.id} />
                      <DeleteSale id={sale.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Fin Tbody*/}

          </table>
          {/* Fin Table*/}
        </div>
      </div>
    </div>
  );
}
