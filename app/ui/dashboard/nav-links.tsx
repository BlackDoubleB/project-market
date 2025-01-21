"use client"
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/dashboard', icon: <Icon icon="material-symbols:home" />   },
  {
    name: 'Sales',
    href: '/dashboard/sales',
    icon: <Icon icon="mdi:sale" />,
  },
  { name: 'Products', href: '/dashboard/products', icon: <Icon icon="material-symbols:person" /> },
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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            {link.icon}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
