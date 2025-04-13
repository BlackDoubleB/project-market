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
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 ">
          {/* Inicio Table*/}
          <table className="w-full text-gray-900  border-collapse border-spacing-x-4">
            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal border-b-2 border-gray-200 ">
              <tr>
                <th scope="col" className=" py-5 px-5 font-medium ">
                  Username
                </th>
                <th
                  scope="col"
                  className=" py-5 font-medium hidden md:table-cell"
                >
                  Method
                </th>
                <th scope="col" className="whitespace-nowrap py-5 font-medium ">
                  Date Register
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap py-5 font-medium  hidden md:table-cell"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap py-5 font-medium  hidden md:table-cell "
                >
                  <div className="flex items-center justify-center">
                    Quantity
                  </div>
                </th>

                <th
                  scope="col"
                  className="whitespace-nowrap py-5 font-medium px-5"
                >
                  <div className="flex items-center justify-center ">Edit</div>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white h-full">
              {sales?.map((sale) => (
                <tr
                  key={sale.sale_id}
                  className="w-full py-3 text-sm border-b border-gray-200 last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-5">
                    {sale.user_name}
                  </td>
                  <td className="whitespace-nowrap py-3 hidden md:table-cell">
                    {sale.method}
                  </td>
                  <td className="whitespace-nowrap py-3">
                    {sale.date_register
                      ? format(
                          new Date(sale.date_register),
                          "yyyy-MM-dd HH:mm:ss",
                        )
                      : "N/A"}
                  </td>
                  <td className="whitespace-nowrap py-3 hidden md:table-cell">
                    {sale.total}
                  </td>
                  <td className="whitespace-nowrap py-3 hidden md:table-cell  ">
                    <div className="flex items-center justify-center">
                      {sale.quantity}
                    </div>
                  </td>

                  <td className="whitespace-nowrap ">
                    <div className="flex flex-col items-center justify-center h-full">
                      <Intermedial id={sale.sale_id} />
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
