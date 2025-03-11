import Table from "@/app/ui/account/AccountClient";
import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import { fetchUser } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Acount",
};

export default async function Page() {
  const user = await fetchUser();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>

      <Table user={user} />
    </div>
  );
}
