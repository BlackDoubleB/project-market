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
  stock,
}: Props) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const updateProductId = (productId: string) => {
    updateItemProductId(index, productId);
    setProductId(productId);
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
  };

  useEffect(() => {
    console.log({ productId, quantity }, "productId, quantity");
  }, []);

  const ImageProduct = useCallback(() => {
    const url = products.find(
      (product) => product.product_id === productId,
    )?.image_url;

    return url ? (
      <img src={url} alt="Product" className="block w-full rounded-lg" />
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
    <div>
      <div className="pb-2">
        <div className="relative bg-neutral-400 p-4 rounded-md border border-slate-300 shadow-lg shadow-black-500/50">
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
          <div className="mb-4">
            <label
              htmlFor="product_id"
              className="mb-2 block text-sm font-medium"
            >
              Choose Product
            </label>

            <div className="relative">
              <select
                className="bg-white block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 outline-none h-10"
                value={productId}
                onChange={(e) => updateProductId(e.target.value)}
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
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
          </div>

          {/* Category Name */}
          <div className="mb-4 pointer-events-none">
            <p className="mb-2 block text-sm font-medium">Category</p>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <p className=" block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm outline-2 h-10">
                  {Category}
                </p>
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-4 pointer-events-none">
            <p className="mb-2 block text-sm font-medium">Image</p>
            <div className="relative mt-2">
              <div className="relative w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                {ImageProduct()}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4 pointer-events-none">
            <p className="mb-2 block text-sm font-medium">Price</p>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <p className="block w-full rounded-md border bg-white border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 h-10">
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
            <div className="relative mt-2 rounded-md">
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => updateMinusQuantity()}
                  className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-neutral-500 h-10"
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
                  className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-neutral-500  h-10"
                >
                  +
                </button>
              </div>
            </div>

            {/*<div id="product-error" aria-live="polite" aria-atomic="true">*/}
            {/*  {messageError.errors?.method &&*/}
            {/*    messageError.errors.method.map((error: string) => (*/}
            {/*      <p className="mt-2 text-sm text-red-500" key={error}>*/}
            {/*        {error}*/}
            {/*      </p>*/}
            {/*    ))}*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
