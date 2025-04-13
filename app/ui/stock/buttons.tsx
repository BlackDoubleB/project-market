"use client";
import { deleteStock } from "@/app/lib/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { AlertDanger } from "@/app/ui/alerts";
import { useState } from "react";

export function UpdateStock({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/stock/${id}/edit`}
      className="rounded-md border p-2 hover:bg-yellow-300 bg-yellow-400"
    >
      <Icon icon="mdi:pencil" className="w-5 text-white" />
    </Link>
  );
}

export function DeleteStock({ id }: { id: string }) {
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);
    const result = await deleteStock(id);
    console.log("Este es el resultado", result);
    if (!result) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="rounded-md border p-2 hover:bg-red-500 bg-red-600 cursor-pointer"
        >
          <Icon icon="mi:delete" className="w-4 text-white" />
        </button>
      </form>
      {error && <AlertDanger message={"A sale depends on stock"} />}
    </>
  );
}
