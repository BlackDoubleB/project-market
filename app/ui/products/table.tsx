import { UpdateProduct, DeleteProduct } from "@/app/ui/products/buttons";
import { fetchFilteredProducts } from "@/app/lib/data";
import { format } from "date-fns";

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="flow-root  border-gray-300">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-2xl bg-gray-50 ">
          {/* Inicio Table*/}
          <table className=" w-full text-gray-900  border-collapse border-spacing-x-4">
            {/* Inicio Thead*/}
            <thead className=" text-left text-sm font-normal border-b-2 border-gray-200 ">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap py-5 font-medium pl-6 pr-10"
                >
                  Category Name
                </th>
                <th scope="col" className=" py-5 font-medium pr-6">
                  Product Name
                </th>
                <th scope="col" className=" py-5 font-medium pr-6 ">
                  <div className="flex items-center justify-center">Image</div>
                </th>
                <th scope="col" className=" py-5 font-medium pr-6">
                  Price
                </th>
                <th scope="col" className=" py-5 font-medium ">
                  Date Register
                </th>
                <th scope="col" className=" py-5 font-medium px-6">
                  <div className="flex items-center justify-center">Action</div>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white rounded-2xl border-gray-300">
              {products?.map((product) => (
                <tr
                  key={product.product_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none "
                >
                  <td className="whitespace-nowrap py-3 px-6">
                    {product.category_name}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-6">
                    {product.product_name}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-6">
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-1 border-1 border-gray-300 rounded-lg">
                        <img
                          src={product.image_url}
                          alt={product.product_name}
                          className="w-20 min-w-[80px] h-20"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-6">
                    {product.price}
                  </td>

                  <td className="whitespace-nowrap py-3 ">
                    {product.date_register
                      ? format(
                          new Date(product.date_register),
                          "yyyy-MM-dd HH:mm:ss",
                        )
                      : "N/A"}
                  </td>

                  <td className="whitespace-nowrap py-3 pr-6 ">
                    <div className="flex justify-center gap-2">
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
