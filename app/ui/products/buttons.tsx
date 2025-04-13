import { deleteProduct } from "@/app/lib/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/products/${id}/edit`}
      className="border p-2 hover:bg-yellow-300 bg-yellow-400 rounded-md"
    >
      <Icon icon="mdi:pencil" className="w-5 text-white" />
    </Link>
  );
}

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <>
      <form action={deleteProductWithId}>
        <button
          type="submit"
          className=" border p-2  hover:bg-red-500 bg-red-600 rounded-md cursor-pointer"
        >
          <Icon icon="tabler:trash" className="w-4 text-white" />
        </button>
      </form>
    </>
  );
}
