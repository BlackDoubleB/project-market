import Image from 'next/image';
import { UpdateSale, DeleteSale } from '@/app/ui/sales/buttons';
import { fetchFilteredProductsNav } from '@/app/lib/data';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const products = await fetchFilteredProductsNav(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Primer sub div */}
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.id}
                className="mb-2 rounded-md bg-white p-4"
              >

                <div className=" flex flex-col items-start justify-between border-b pb-4">
                  <p>{product.name_product}</p>
                  <div className='flex '>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={product.image_url}
                        className="mr-2 rounded-full min-w-8"
                        width={30}
                        height={30}
                        alt={`${product.name_product}'s profile picture`}
                      />
                    </div>
                    <div className='w-24 xxs:w-48 xs:w-80'>
                      <p className='truncate' >{product.name_product}</p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateSale id={product.id} />
                    <DeleteSale id={product.id} />
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
                  Imagen
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Producto
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
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${product.name_product}'s profile picture`}
                      />
                    </div>

                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.name_product}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSale id={product.id} />
                      <DeleteSale id={product.id} />
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
