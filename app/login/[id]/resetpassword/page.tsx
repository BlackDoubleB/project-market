import { ResetPassword } from "@/app/ui/login/ResetPassword";

// export default async function Page(props: { params: Promise<{ id: string }> }) {
//   const params = await props.params;
//   const id = params.id;
//   const email = params.email;
//
//   return (
//     <main>
//       <ResetPassword user_id={id} email={email} />
//     </main>
//   );
// }

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  // Espera ambos parámetros asíncronos
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const email = resolvedSearchParams.email
    ? decodeURIComponent(resolvedSearchParams.email)
    : "";

  return (
    <main>
      <ResetPassword user_id={resolvedParams.id} email={email} />
    </main>
  );
}
