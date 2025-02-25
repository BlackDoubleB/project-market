import { Category, Product, SaleById } from "@/app/lib/definitions";

export default function CardShowForm({
  sale,
  categories,
  products,
}: {
  sale: SaleById;
  categories: Category[];
  products: Product[];
}) {
  return (
    <div className="bg-gray-200 border-solid border border-gray-300 rounded-lg p-4 ">
      <div>
        <p className="block text-sm font-medium leading-5  text-gray-700">
          Producto
        </p>
        <div className="mt-1 relative rounded-md shadow-sm">
          <p>
            {products.find(
              (product: Product) => product.product_id === sale.product_id,
            )?.product_name || ""}
          </p>
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium leading-5  text-gray-700">
          Categoria
        </p>
        <div className="mt-1 relative rounded-md shadow-sm">
          {categories.find(
            (category: Category) => category.category_id === sale.category_id,
          )?.category_name || ""}
        </div>
      </div>

      <div>
        <p>Imagen</p>
        <div className="mt-1 ">
          <img
            src={
              products.find(
                (product: Product) => product.product_id === sale.product_id,
              )?.image_url || ""
            }
            alt="Imagen del producto seleccionado"
            className="w-32 h-32 rounded-md"
          />
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium leading-5  text-gray-700">
          Precio
        </p>
        <div className="mt-1 relative rounded-md shadow-sm">
          <p>
            {products.find(
              (product: Product) => product.product_id === sale.product_id,
            )?.price || ""}
          </p>
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium leading-5  text-gray-700">
          Cantidad
        </p>
        <div className="mt-1 relative rounded-md shadow-sm">
          {sale.quantity}
        </div>
      </div>
    </div>
  );
}
