"use client";
import { Category, Product, SaleById } from "@/app/lib/definitions";

export default function SubCardShowForm({
  sale,
  categories,
  products,
}: {
  sale: SaleById;
  categories: Category[];
  products: Product[];
}) {
  return (
    <div className=" flex flex-col gap-5">
      <div>
        <p className="block text-sm font-bold leading-5  text-gray-500">
          Producto
        </p>
        <div className="mt-1 relative rounded-md shadow-xs">
          <p className="text-wrap">
            {products.find(
              (product: Product) => product.product_id === sale.product_id,
            )?.product_name || ""}
          </p>
        </div>
      </div>

      <div>
        <p className="block text-sm font-bold leading-5  text-gray-500">
          Categoria
        </p>
        <div className="mt-1 relative rounded-md shadow-xs">
          {categories.find(
            (category: Category) => category.category_id === sale.category_id,
          )?.category_name || ""}
        </div>
      </div>

      <div>
        <p className="font-bold text-gray-500">Imagen</p>
        <div className="mt-1 w-42 h-42 bg-white rounded-md flex items-center justify-center">
          <img
            src={
              products.find(
                (product: Product) => product.product_id === sale.product_id,
              )?.image_url || ""
            }
            alt="Imagen del producto seleccionado"
            className="w-32 h-32 "
          />
        </div>
      </div>

      <div>
        <p className="block text-sm font-bold leading-5  text-gray-500">
          Precio
        </p>
        <div className="mt-1 relative rounded-md shadow-xs">
          <p>
            {products.find(
              (product: Product) => product.product_id === sale.product_id,
            )?.price || ""}
          </p>
        </div>
      </div>

      <div>
        <p className="block text-sm font-bold leading-5  text-gray-500">
          Cantidad
        </p>
        <div className="mt-1 relative rounded-md shadow-xs">
          {sale.quantity}
        </div>
      </div>
    </div>
  );
}
