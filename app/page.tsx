import { lusitana, noto } from "@/app/ui/fonts";
import Link from "next/link";
import { Icon } from "@iconify/react";
export default function Home() {
  return (
    <div
      className={`bg-neutral-950 text-cyan-50 ${lusitana.className} min-h-screen flex flex-col items-center`}
    >
      <main className="flex flex-col gap-8  w-full max-w-[1072px] my-32 px-10">
        <div className="relative ">
          <h4
            style={{ fontWeight: "700" }}
            className={`text-base sm:text-xl md:text-2xl border-l-2 pl-2 ${noto.className} `}
          >
            Market
          </h4>
          <div className="absolute pl-[70px] sm:pl-[85px] md:pl-24 -top-1 sm:-top-2  z-20 ">
            <img
              src="/icon-market-dark.png"
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6  rounded-full"
              alt="Market icon"
            />
          </div>
        </div>
        <h1
          style={{ fontWeight: "700" }}
          className={`text-3xl sm:text-4xl xl:text-5xl ${noto.className} `}
        >
          The Virtual Solution to Manage Your Sales
        </h1>

        <section>
          <p
            style={{ fontWeight: "200" }}
            className={`text-sm sm:text-base text-justify ${noto.className} `}
          >
            At Market, we&apos;ve created a platform specifically designed to
            help you manage your business&apos;s sales quickly, easily, and
            efficiently. Our goal is to provide you with all the tools you need
            to keep track of your products and sales in one place. Whether you
            have a physical store or sell online, Market adapts to your business
            and helps you grow by automating processes and simplifying your
            daily operations.
          </p>
        </section>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
         
          <Link
            className="rounded-full border-1 border-solid border-gray-50 transition-colors flex items-center justify-center gap-2 hover:bg-neutral-800  text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/login"
            target="_parent"
            rel="noopener noreferrer"
          >
            Get into
          </Link>
        </div>
        <div className="my-5 relative ">
          <img
            src="/dashboard-phone.png"
            alt="Image of the phone"
            className="rounded-lg  h-[400px] absolute z-20  -top-16 -right-1  w-full max-w-[193px] lg:block hidden drop-shadow-xl/25 drop-shadow-white"
          />
          <img
            src="/dashboard-home.png"
            alt="Image of the dashboard in computer"
            className="rounded-lg  drop-shadow-xl/25 drop-shadow-white w-full max-w-[950px]"
          />
        </div>
      </main>
      <footer className="mt-auto flex items-center justify-center h-20 w-full bg-neutral-900">
        <div className="w-full max-w-[1072px] px-10  flex justify-between flex-wrap gap-3 ">
          <div className="flex gap-6 flex-wrap  ">
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.instagram.com/blanca_blacido/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="mdi:instagram" />
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://x.com/BBlacido"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="iconoir:x" />
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.facebook.com/blanca.blacidoaparicio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="mdi:facebook" />
            </Link>
          </div>
          <p
            style={{ fontWeight: "200" }}
            className={`text-xs text-justify ${noto.className} `}
          >
            Copyright © 2025 Reyna Blacido Aparicio.
          </p>
        </div>
      </footer>
    </div>
  );
}
