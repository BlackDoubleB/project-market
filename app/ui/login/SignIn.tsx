import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";

        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: true,
          redirectTo: "/dashboard", // Redirige al usuario después del inicio de sesión
          // Especifica la URL a la que redirigir
        });
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}
