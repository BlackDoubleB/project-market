import { UpdateStock, DeleteStock } from "@/app/ui/stock/buttons";
import { fetchFilteredStock } from "@/app/lib/data";
import { format } from "date-fns";

export default async function StockTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const stock = await fetchFilteredStock(query, currentPage);

  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50  md:pt-0">
          {/* Table para md<*/}
          <table className="min-w-full text-gray-900 ">
            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal border-b-2 border-gray-200">
              <tr>
                <th scope="col" className="py-5 font-medium pl-6">
                  Name
                </th>

                <th scope="col" className="py-5 font-medium pl-6">
                  Quantity
                </th>

                <th scope="col" className="py-5 font-medium pl-6">
                  Date
                </th>

                <th scope="col" className="text-right py-5 font-medium px-11">
                  Action
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {stock?.map((st) => (
                <tr
                  key={st.stock_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 pl-6">
                    {st.product_name}
                  </td>
                  <td className="whitespace-nowrap px-3 pl-6">{st.quantity}</td>
                  <td className="whitespace-nowrap px-3 pl-6">
                    {st.date_register
                      ? format(
                          new Date(st.date_register),
                          "yyyy-MM-dd HH:mm:ss",
                        )
                      : "N/A"}
                  </td>
                  <td className="whitespace-nowrap py-3 px-6 ">
                    <div className="flex justify-end gap-3">
                      <UpdateStock id={st.stock_id} />
                      <DeleteStock id={st.stock_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Fin Tbody*/}
          </table>
          {/* Fin Table para md<*/}
        </div>
      </div>
    </div>
  );
}
