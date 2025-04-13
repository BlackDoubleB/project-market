"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function ButtonsCreate({ name }: { name: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/create`}
      className="flex h-10 items-center rounded-r-2xl bg-blue-600 px-4 text-sm font-medium text-white
      transition-colors hover:bg-blue-500
       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{name}</span>{" "}
      <Icon icon="mdi:plus" className="h-5 md:ml-4" />
    </Link>
  );
}
