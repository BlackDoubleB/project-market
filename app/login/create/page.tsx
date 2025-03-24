import Form from "@/app/ui/login/create-form";
import { fetchRoles } from "@/app/lib/data";
export default async function page() {
  const roles = await fetchRoles();
  return (
    <>
      <main className="">
        <div className="bg-yellow-200 relative">
          <Form roles={roles} />
        </div>
      </main>
    </>
  );
}
