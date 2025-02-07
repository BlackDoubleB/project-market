import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons';
import { fetchFilteredProducts } from '@/app/lib/data';
import { format } from 'date-fns';


export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* md> */}
          <div className="md:hidden">
            {products?.map((product) => (
              <div key={product.product_id} className="mb-2 rounded-md bg-white p-4">
                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{product.category_name}</p>
                </div>
                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{product.product_name}</p>
                </div>
                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{product.image_url}</p>
                </div>
                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{product.price}</p>
                </div>
                
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateProduct id={product.product_id} />
                    <DeleteProduct id={product.product_id} />
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
                  Category Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Product Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Image
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Price
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date Register
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr key={product.product_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">

                  <td className="whitespace-nowrap px-3 py-3">
                    {product.category_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.product_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <img src={product.image_url} alt={product.product_name} className="w-20 h-20" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.price}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {product.date_register
                      ? format(new Date(product.date_register), 'yyyy-MM-dd HH:mm:ss')
                      : 'N/A'}
                  </td>
                  

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProduct id={product.product_id} />
                      <DeleteProduct id={product.product_id} />
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
