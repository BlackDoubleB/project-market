"use client";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";

import { playwrite } from "@/app/ui/fonts";
import clsx from "clsx";

export default function SideNav() {
  return (
    <div>
      <div className="bg-white h-16 flex items-center ">
        <div
          className={`${playwrite.className} flex items-center  gap-2 rounded-md p-2  text-lg`}
        >
          <img src="/icon-market-dark.png" className="w-10 h-10"></img>
          <p className="">Market</p>
        </div>
      </div>
      <div className="flex flex-col px-3 py-6 h-[calc(100vh-4rem)] ">
        <div className="relative  w-full flex flex-col justify-between h-full overflow-y-auto">
          <div className="flex flex-col gap-4 mb-4">
            <NavLinks />
          </div>

          <form
            action={() => {
              signOut({
                redirect: true,
                redirectTo: "/login",
              });
            }}
          >
            <button
              className={clsx(
                "w-full cursor-pointer flex  h-[48px] items-center p-5  rounded-md text-white  text-xs md:text-sm font-medium hover:bg-neutral-700 hover:font-bold  ",
              )}
            >
              <Icon icon="lets-icons:sign-out-circle-light" className="w-6" />
              <div className="">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
