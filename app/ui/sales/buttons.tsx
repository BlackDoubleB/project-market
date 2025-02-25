"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
export function CreateSale() {
  return (
    <Link
      href="/dashboard/sales/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Sale</span>{" "}
      <Icon icon="mdi:plus" className="h-5 md:ml-4" />
    </Link>
  );
}

export function ShowSale({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/sales/${id}/show-sale`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Icon icon="bx:show" className="w-5" />
    </Link>
  );
}
