"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signInWithCredentials } from "./serverActions";
import Link from "next/link";
export function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Manejar cambios en los inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Función para iniciar sesión con credenciales
  const handleCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita la recarga de la página
    await signInWithCredentials(formData.email, formData.password);
  };

  return (
    <form onSubmit={handleCredentials}>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <div className="flex items-center justify-center pt-5">
        <div className="flex flex-col gap-2">
          <Button type="submit" variant="secondary">
            Sign In With Credentials
          </Button>
          <Link href="/login/create">
            <Button type="button" variant="secondary">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
