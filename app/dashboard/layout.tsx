"use client";

import { useState } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full ">
      <div className="sticky top-0 z-20 w-full bg-neutral-900 h-16">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 ml-6  bg-gray-100 p-2 rounded-md shadow hover:scale-105 transition cursor-pointer"
          >
            <Icon icon="material-symbols:menu" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900 opacity-75 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-20 h-full w-44 md:w-64 transition-transform duration-500 bg-neutral-900    ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón X para cerrar */}
        <button
          onClick={() => setIsOpen(false)}
          className={clsx(
            `cursor-pointer absolute top-4 right-[-40px] bg-white p-2 shadow rounded hover:scale-110 transition`,
            { hidden: !isOpen },
          )}
        >
          <Icon icon="material-symbols:close" />
        </button>

        <div>
          <SideNav />
        </div>
      </div>
      {/* Contenido principal */}
      <div className="h-full  p-6 transition-all duration-500 overflow-y-auto ">
        {children}
      </div>
    </div>
  );
}
