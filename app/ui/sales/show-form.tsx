import { SaleById, Category, Product } from "@/app/lib/definitions";
import CardShowForm from "./CardShowForm";
import Link from "next/link";
export default function ShowForm({
  saleById,
  categories,
  products,
}: {
  saleById: SaleById[];
  categories: Category[];
  products: Product[];
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <div className="text-center">
              <h1>Detalle de Venta</h1>
            </div>

            <div>
              <p className="block text-sm font-medium leading-5  text-gray-700">
                Fecha de Registro
              </p>
              <div className="mt-1 relative rounded-md shadow-sm">
                {/*<p>{saleById[0].date_register}</p>*/}
              </div>
            </div>

            <div>
              <p className="block text-sm font-medium leading-5  text-gray-700">
                Medio de Pago
              </p>
              <div className="mt-1 relative rounded-md shadow-sm">
                <p>{saleById[0].method}</p>
              </div>
            </div>

            {saleById.map((sale, index) => (
              <div key={index} className="mt-6">
                <CardShowForm
                  key={index}
                  sale={sale}
                  categories={categories}
                  products={products}
                />
              </div>
            ))}
            <div>
              <p className="block text-sm font-medium leading-5  text-gray-700">
                Total
              </p>
              <div className="mt-1 relative rounded-md shadow-sm">
                <p>{saleById[0].total}</p>
              </div>
            </div>

            <Link href="/dashboard/sales">
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Regresar
                  </button>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
