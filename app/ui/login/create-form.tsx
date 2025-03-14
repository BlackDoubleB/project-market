"use client";
import { createUser, StateUser } from "@/app/lib/actions";
import { useActionState } from "react";
import { RoleFetch } from "@/app/lib/definitions";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import clsx from "clsx";
import { handleAction } from "next/dist/server/app-render/action-handler";

export default function Form({ roles }: { roles: RoleFetch[] }) {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalup, setModalup] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false); // Estado para verificar si el código es válido
  const [email, setEmail] = useState(""); // Estado para almacenar el email del usuario
  const [formData, setFormData] = useState<FormData | null>(null);

  const getCombinedCode = (form: HTMLFormElement): string => {
    const code1 = form.elements.namedItem("code1") as HTMLInputElement;
    const code2 = form.elements.namedItem("code2") as HTMLInputElement;
    const code3 = form.elements.namedItem("code3") as HTMLInputElement;
    const code4 = form.elements.namedItem("code4") as HTMLInputElement;

    return `${code1.value}${code2.value}${code3.value}${code4.value}`;
  };

  const sendEmail = async () => {
    setLoading(true);
    setMessage("");
    setModalup(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Correo enviado con éxito 🎉");
      } else {
        setMessage(`Error: ${result.error.message}`);
      }
    } catch (error) {
      setMessage("Hubo un problema al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const code = getCombinedCode(form); // Obtener el código combinado
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Código válido 🎉");
        setIsCodeValid(true); // Marcar el código como válido
        setModalup(false); // Cerrar el modal

        // Enviar el formulario con los datos guardados
        if (formData) {
          formAction(formData);
        }
      } else {
        setMessage(`Error: ${result.error.message}`);
        setIsCodeValid(false);
      }
    } catch (error) {
      setMessage("Código no válido.");
      setIsCodeValid(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar los datos del formulario en el estado
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setFormData(data);

    // Mostrar el modal para ingresar el código
    await sendEmail();
  };

  return (
    <div className="relative">
      <form id="registration-form" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <h1 className="text-2xl py-10 text-black font-semibold">
            Registration
          </h1>
        </div>
        <div className="rounded-md p-4 md:p-6">
          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role_id" className="mb-2 block text-sm font-medium">
              Role
            </label>

            <div className="relative">
              <select
                id="role_id"
                name="role_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="roles-error"
              >
                <option value="" disabled>
                  Select a Role
                </option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              <Icon
                icon="solar:user-circle-bold"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>

            <div id="roles-error" aria-live="polite" aria-atomic="true">
              {state.errors?.role_id &&
                state.errors.role_id.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin Role */}

          {/* People/Person_name*/}
          <div className="mb-4">
            <label
              htmlFor="person_name"
              className="mb-2 block text-sm font-medium"
              aria-describedby="person_name-error"
            >
              Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="person_name"
                  name="person_name"
                  type="text"
                  placeholder="name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Validation */}
            <div id="person_name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.person_name &&
                state.errors.person_name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin People/People_name */}

          {/* People/lastname */}
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="mb-2 block text-sm font-medium"
              aria-describedby="lastname-error"
            >
              Lastname
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="lastname"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Validation */}
            <div id="lastname-error" aria-live="polite" aria-atomic="true">
              {state.errors?.lastname &&
                state.errors.lastname.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin People/lastname */}

          {/* People/Dni */}
          <div className="mb-4">
            <label
              htmlFor="dni"
              className="mb-2 block text-sm font-medium"
              aria-describedby="dni-error"
            >
              Dni
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  placeholder="dni"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Validation */}
            <div id="dni-error" aria-live="polite" aria-atomic="true">
              {state.errors?.dni &&
                state.errors.dni.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin People/Dni */}

          {/* User/User_name */}
          <div className="mb-4">
            <label
              htmlFor="user_name"
              className="mb-2 block text-sm font-medium"
              aria-describedby="user_name-error"
            >
              Username
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="user_name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Validation */}
            <div id="user_name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.user_name &&
                state.errors.user_name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin User/user_name */}

          {/* User/Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
              aria-describedby="password-error"
            >
              Password
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="text"
                  placeholder="password"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Validation */}
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin User/Password */}

          {/* User/Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
              aria-describedby="email-error"
            >
              Email Address
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Validation */}
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Fin User/Email */}

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/login"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create User</Button>
          </div>
          <p>{message}</p>
        </div>
      </form>

      {/*Modal*/}
      <div
        className={clsx("absolute top-0 -z-10 opacity-0 ", {
          "opacity-100": modalup,
          "z-10": modalup,
        })}
      >
        <div className="">
          <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email {email}</p>
                </div>
              </div>

              <div>
                <form onSubmit={verifyCode}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code1"
                          maxLength={1}
                          required
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code2"
                          maxLength={1}
                          required
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code3"
                          maxLength={1}
                          required
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code4"
                          maxLength={1}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          type="submit"
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p>{" "}
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
