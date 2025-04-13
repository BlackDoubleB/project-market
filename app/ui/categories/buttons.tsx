"use client";
import { deleteCategory } from "@/app/lib/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { AlertDanger } from "@/app/ui/alerts";
import { useState } from "react";

export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/categories/${id}/edit`}
      className="rounded-md border p-2 bg-yellow-400 hover:bg-yellow-300"
    >
      <Icon icon="mdi:pencil" className="w-5 text-white" />
    </Link>
  );
}

export function DeleteCategory({ id }: { id: string }) {
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);
    const result = await deleteCategory(id);
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
          className="rounded-md border p-2 bg-red-600 hover:bg-red-500 cursor-pointer"
        >
          <span className="sr-only">Delete</span>
          <Icon icon="mi:delete" className="w-4 text-white" />
        </button>
      </form>
      {error && (
        <AlertDanger message={"Un producto fue registrado con la categoría"} />
      )}
    </>
  );
}
