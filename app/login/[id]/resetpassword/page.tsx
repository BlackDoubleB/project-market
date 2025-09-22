import { ResetPassword } from "@/app/ui/login/ResetPassword";

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
