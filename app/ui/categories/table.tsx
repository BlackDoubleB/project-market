import { UpdateCategory, DeleteCategory } from "@/app/ui/categories/buttons";
import { fetchFilteredCategories } from "@/app/lib/data";

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await fetchFilteredCategories(query, currentPage);

  return (
    <div className="flow-root ">
      <div className="bg-gray-50 inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          {/* Table para md<*/}
          <table className=" min-w-full text-gray-900 ">
            {/* Inicio Thead*/}
            <thead className=" text-left text-sm font-normal border-b-2 border-gray-200">
              <tr>
                <th scope="col" className="py-5 font-medium pl-6">
                  <span className="sr-only">Name Category</span>
                  Name
                </th>
                <th scope="col" className=" py-5 font-medium px-12">
                  <div className="flex items-end justify-end">Action</div>
                </th>
              </tr>
            </thead>
            {/* Fin Thead*/}

            {/* Inicio Tbody*/}
            <tbody className="bg-white">
              {categories?.map((category) => (
                <tr
                  key={category.category_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap pl-6 py-3">
                    {category.category_name}
                  </td>
                  <td className="whitespace-nowrap py-3 px-6">
                    <div className="flex justify-end gap-3">
                      <UpdateCategory id={category.category_id} />
                      <DeleteCategory id={category.category_id} />
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
