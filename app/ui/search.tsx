"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Icon } from "@iconify/react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 shrink-0 ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        className="peer block w-full rounded-2xl
        focus:outline-none border-1 border-gray-300 focus:border-blue-200  focus:ring-blue-200 focus:ring-1
                 focus:shadow-md focus:shadow-blue-200/50
         py-[9px] pl-10 text-sm  placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />

      <Icon
        icon="tabler:search"
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      />
    </div>
  );
}
