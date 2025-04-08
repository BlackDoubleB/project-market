"use client";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";

import { playwrite } from "@/app/ui/fonts";
import clsx from "clsx";

export default function SideNav() {
  return (
    <>
      <div className="bg-white h-16 flex items-center ">
        <div
          className={`${playwrite.className} flex items-center  gap-2 rounded-md p-2  text-lg`}
        >
          <img src="/icon-market-dark.png" className="w-10 h-10"></img>
          <p className="">Market</p>
        </div>
      </div>
      <div className="flex flex-col px-3 py-6 ">
        <div className=" relative h-full  w-full flex flex-col gap-4 ">
          <NavLinks />

          <form
            className="fixed bottom-5 w-full pr-6"
            action={() => {
              signOut({
                redirect: true,
                redirectTo: "/login",
              });
            }}
          >
            <button
              className={clsx(
                "cursor-pointer w-full flex h-[48px] items-center p-2 rounded-md text-white  text-sm font-medium hover:bg-neutral-700 hover:font-bold  ",
              )}
            >
              <Icon icon="lets-icons:sign-out-circle-light" className="w-6" />
              <div className="">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
