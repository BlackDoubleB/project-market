import Form from "@/app/ui/roles/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Roles", href: "/dashboard/roles" },
          {
            label: "Create Role",
            href: "/dashboard/role/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
