import { UpdateStock, DeleteStock } from '@/app/ui/stock/buttons';
import { fetchFilteredStock } from '@/app/lib/data';
import { format } from 'date-fns';

export default async function StockTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const stock = await fetchFilteredStock(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Table para md > */}
          <div className="md:hidden">
            {stock?.map((st) => (
              <div key={st.stock_id} className="mb-2 rounded-md bg-white p-4">

                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{st.product_name}</p>
                </div>

                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{st.quantity}</p>
                </div>

                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  {st.date_register
                    ? format(new Date(st.date_register), 'yyyy-MM-dd HH:mm:ss')
                    : 'N/A'}
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateStock id={st.stock_id} />
                    <DeleteStock id={st.stock_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Fin Table para md  */}


          {/* Table para md<*/}
          <table className="hidden min-w-full text-gray-900 md:table">

            {/* Inicio Thead*/}
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="py-5 font-medium pl-3">
                  <span className="sr-only">Product Name</span>
                  Name
                </th>

                <th scope="col" className="py-5 font-medium pl-3">
                  <span className="sr-only">Quantity</span>
                  Quantity
                </th>

                <th scope="col" className="py-5 font-medium pl-3">
                  <span className="sr-only">Date Register</span>
                  Date
                </th>

                <th scope="col" className="text-right pr-8 py-5 font-medium sm:pl-6">
                  <span className="sr-only">Edit</span>
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
                  <td className="whitespace-nowrap px-3 py-3">
                    {st.product_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {st.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {st.date_register
                      ? format(new Date(st.date_register), 'yyyy-MM-dd HH:mm:ss')
                      : 'N/A'}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
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
