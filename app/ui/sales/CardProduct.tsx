"use client";
import { Icon } from "@iconify/react";
import { ProductFetch, SaleTable } from "@/app/lib/definitions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StateSale } from "@/app/lib/actions";

interface Props {
  products: ProductFetch[];
  messageError: StateSale;
  index: number;
  updateItemProductId: (index: number, productId: string) => void;
  updateItemQuantity: (index: number, quantity: number) => void;
  sales: SaleTable[];
  deleteProduct: (index: number) => void;
  stock: boolean;
}

export default function CardProduct({
  products,
  messageError,
  index,
  updateItemProductId,
  updateItemQuantity,
  sales,
  deleteProduct,
}: Props) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const updateProductId = (productId: string) => {
    updateItemProductId(index, productId);
    setProductId(productId);

    // Limpiar los errores de stock al cambiar de producto
    if (messageError.errors_stock) {
      messageError.errors_stock = messageError.errors_stock.filter(
        (error) => error.index_stock !== index,
      );
    }
  };

  const updateMinusQuantity = () => {
    if (quantity < 1) {
      return;
    }
    updateItemQuantity(index, quantity - 1);
    setQuantity((q) => q - 1);
  };

  const updatePlusQuantity = () => {
    updateItemQuantity(index, quantity + 1);
    setQuantity((q) => q + 1);
  };

  const deleteProductCard = () => {
    deleteProduct(index);
    if (messageError.errors_stock) {
      messageError.errors_stock = messageError.errors_stock.filter(
        (error) => error.index_stock !== index,
      );
    }
  };

  useEffect(() => {
    console.log({ productId, quantity }, "productId, quantity");
  }, []);

  const ImageProduct = useCallback(() => {
    const url = products.find(
      (product) => product.product_id === productId,
    )?.image_url;

    return url ? (
      <img src={url} alt="Product" className=" w-32 h-36" />
    ) : (
      <Icon icon="lets-icons:img-box" className="w-16 h-16 text-gray-400" />
    );
  }, [products, productId]);

  const Price = useMemo(() => {
    return products.find((product) => product.product_id === productId)?.price;
  }, [products, productId]);

  const Category = useMemo(() => {
    return products.find((product) => product.product_id === productId)
      ?.category_name;
  }, [products, productId]);

  return (
    <div className="overflow-x-auto border border-gray-400 rounded-md mb-2">
      <div className="">
        <div className="min-w-60 relative bg-gray-300 p-4">
          <div className="flex items-end justify-end ">
            <button
              type="button"
              className="absolute top-0 right-0  bg-red-500 p-2 rounded-md flex"
              onClick={() => deleteProductCard()}
            >
              <Icon icon="uiw:delete" className="text-white" />
            </button>
          </div>
          {/* Product Name */}
          <div className="mb-4 ">
            <label
              htmlFor="product_id"
              className="mb-2 block text-sm font-medium"
            >
              Choose Product
            </label>

            <div className="relative">
              <select
                className="bg-white hover:cursor-pointer peer block w-full rounded-md  py-2 pl-10 text-sm placeholder:text-gray-500
                 border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1
                 focus:shadow-md focus:shadow-blue-200/50 "
                value={productId}
                onChange={(e) => updateProductId(e.target.value)}
              >
                <option className="hover:cursor-pointer" value="">
                  Select a Product
                </option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
              <Icon
                icon="gridicons:nametag"
                className="absolute top-3 left-3 text-gray-400"
              />
            </div>
            {sales[index]?.product_id
              ? ""
              : messageError.errors?.products &&
                messageError.errors?.products.length > 0 &&
                messageError.errors.products.find((x) => x.index == index) && (
                  <p
                    className="mt-2 text-sm text-red-500"
                    id={`product_id-error-${index}`}
                  >
                    {
                      messageError.errors.products.find((x) => x.index == index)
                        ?.message
                    }{" "}
                  </p>
                )}

            {messageError?.errors_stock?.map((error) =>
              error.index_stock == index ? (
                <p
                  key={error.index_stock}
                  className="mt-2 text-sm text-red-500"
                >
                  Stock Disponible {error.number_stock}
                </p>
              ) : (
                ""
              ),
            )}
          </div>

          {/* Category Name */}
          <div className="mb-4 pointer-events-none">
            <p className="mb-2 block text-sm font-medium ">Category</p>
            <div className="relative mt-2 rounded-md ">
              <div className="relative">
                <Icon
                  icon="ant-design:product-filled"
                  className="absolute top-3 left-3 text-gray-400"
                />
                <p
                  className="h-9  peer block w-full rounded-md  py-2 pl-10 text-sm placeholder:text-gray-500
                border-1 border-gray-300 bg-gray-100"
                >
                  {Category}
                </p>
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-4 pointer-events-none ">
            <p className="mb-2 block text-sm font-medium">Image</p>
            <div>
              <div className="mt-2  w-52 flex items-center">
                <div className="w-52 h-40 bg-gray-100 rounded-lg flex items-center justify-center border-1 border-gray-300">
                  {ImageProduct()}
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4 pointer-events-none">
            <p className="mb-2 block text-sm font-medium">Price</p>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Icon
                  icon="material-symbols:price-change"
                  className="absolute top-3 left-3 text-gray-400"
                />
                <p
                  className=" h-9 peer block w-full rounded-md  py-2 pl-10 text-sm placeholder:text-gray-500
                border-1 border-gray-300 bg-gray-100"
                >
                  {Price}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label
              htmlFor={`quantity`}
              className="mb-2 block text-sm font-medium"
            >
              Quantity
            </label>
            <div className="relative mt-2 rounded-md ">
              <div className="relative flex items-center ">
                <button
                  type="button"
                  onClick={() => updateMinusQuantity()}
                  className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-gray-300 h-10 shadow-md cursor-pointer active:scale-105"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  readOnly
                  className="w-20 text-center bg-white border-t border-b border-gray-200 h-10 pointer-events-none"
                />
                <button
                  type="button"
                  onClick={() => updatePlusQuantity()}
                  className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-gray-300  h-10 shadow-md cursor-pointer active:scale-105"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
