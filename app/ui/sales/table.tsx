import { fetchFilteredSales } from "@/app/lib/data";
import { format } from "date-fns";
import Intermedial from "@/app/ui/sales/Intermedial";

export default async function SalesTable({
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
          {/* md> */}
          {/*<div className="md:hidden">*/}
          {/*  {sales?.map((sale) => (*/}
          {/*    <div key={sale.sale_id} className="mb-2 rounded-md bg-white p-4">*/}
          {/*      <div className=" flex flex-col items-start justify-between border-b pb-4">*/}
          {/*        <p>{sale.user_name}</p>*/}
          {/*      </div>*/}
          {/*      <div className=" flex flex-col items-start justify-between border-b pb-4">*/}
          {/*        <p>{sale.method}</p>*/}
          {/*      </div>*/}
          {/*      <div className=" flex flex-col items-start justify-between border-b pb-4">*/}
          {/*        <p>*/}
          {/*          {" "}*/}
          {/*          {sale.date_register*/}
          {/*            ? format(*/}
          {/*                new Date(sale.date_register),*/}
          {/*                "yyyy-MM-dd HH:mm:ss",*/}
          {/*              )*/}
          {/*            : "N/A"}*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*      <div className=" flex flex-col items-start justify-between border-b pb-4">*/}
          {/*        <p>{sale.total}</p>*/}
          {/*      </div>*/}
          {/*      <div className=" flex flex-col items-start justify-between border-b pb-4">*/}
          {/*        <p>{sale.quantity}</p>*/}
          {/*      </div>*/}

          {/*      <div className="flex w-full items-center justify-between pt-4">*/}
          {/*        <div className="flex justify-end gap-2">*/}
          {/*          /!*<ShowSale id={sale.sale_id} />*!/*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/* Fin primer sub div */}

          {/* Inicio Table*/}
          <table className="min-w-full text-gray-900 ">
            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 ">
                  Username
                </th>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6 hidden md:table-cell"
                >
                  Method
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date Register
                </th>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6 hidden md:table-cell"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6 hidden md:table-cell"
                >
                  Quantity
                </th>

                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 ">
                  Edit
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {sales?.map((sale) => (
                <tr
                  key={sale.sale_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.user_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 hidden md:table-cell">
                    {sale.method}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.date_register
                      ? format(
                          new Date(sale.date_register),
                          "yyyy-MM-dd HH:mm:ss",
                        )
                      : "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 hidden md:table-cell">
                    {sale.total}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 hidden md:table-cell">
                    {sale.quantity}
                  </td>

                  <td className="">
                    <div className="w-full">
                      <div className="">
                        <Intermedial id={sale.sale_id} />
                      </div>
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
