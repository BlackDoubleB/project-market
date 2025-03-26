import Form from "@/app/ui/login/create-form";
import { fetchRoles } from "@/app/lib/data";
export default async function page() {
  const roles = await fetchRoles();
  return (
    <>
      <main className="min-h-screen flex items-start justify-center p-4 md:items-center md:p-0 bg-gray-50">
        <div className="relative w-full max-w-md ">
          <Form roles={roles} />
        </div>
      </main>
    </>
  );
}
