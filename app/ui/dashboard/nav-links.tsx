"use client";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { playwrite } from "@/app/ui/fonts";
const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <Icon icon="material-symbols:home" />,
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: <Icon icon="hugeicons:sale-tag-02" />,
  },

  {
    name: "Products",
    href: "/dashboard/products",
    icon: <Icon icon="fluent-mdl2:product-list" />,
  },

  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: <Icon icon="carbon:categories" />,
  },

  { name: "Roles", href: "/dashboard/roles", icon: <Icon icon="ci:users" /> },

  {
    name: "Acount",
    href: "/dashboard/acount",
    icon: <Icon icon="icon-park-outline:config" />,
  },
  {
    name: "Stock",
    href: "/dashboard/stock",
    icon: <Icon icon="icon-park-outline:config" />,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center  h-[48px] grow  gap-2 rounded-md bg-neutral-00 text-white " +
                "p-6 text-xs md:text-sm font-medium hover:bg-neutral-700 hover:font-bold  ",
              {
                "bg-neutral-800 text-gray-200": pathname === link.href,
              },
            )}
          >
            {link.icon}
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
