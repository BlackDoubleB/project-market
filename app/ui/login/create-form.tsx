"use client";
import { createUser, StateUser } from "@/app/lib/actions";
import { useActionState } from "react";
import { RoleFetch } from "@/app/lib/definitions";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/app/ui/button";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { FormSchemaUser } from "@/lib/validations/base-schemas";

export default function Form({ roles }: { roles: RoleFetch[] }) {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalup, setModalup] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false); // Estado para verificar si el código es válido
  const [email, setEmail] = useState(""); // Estado para almacenar el email del usuario
  const [formData, setFormData] = useState<FormData | null>(null);
  const router = useRouter();
  const [clientErrors, setClientErrors] = useState<any>(null);
  const [hasValue, setHasValue] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasValue(event.target.value !== "");
  };
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
        setModalup(true);
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
        startTransition(() => {
          if (formData) {
            formAction(formData);
          }
        });
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

    const result = FormSchemaUser.safeParse(Object.fromEntries(data));
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setClientErrors(errors);
      return;
    }
    setFormData(data);
    // Mostrar el modal para ingresar el código
    await sendEmail();
  };

  useEffect(() => {
    if (state.message === "Usuario creado con éxito") {
      router.push("/login"); // Redirige correctamente
    }
  }, [state.message, router]);

  return (
    <>
      <div className=" p-10 rounded-2xl border-gray-300 dark:bg-gray-800 dark:border-gray-600 shadow bg-white ">
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <h1 className="text-2xl py-10 text-black font-semibold dark:text-white">
              Registration
            </h1>
          </div>

          {/* Role - Adaptado a la nueva plantilla */}
          <div className="relative z-0 w-full mb-5">
            <div className="relative group">
              <select
                id="role_id"
                name="role_id"
                className=" block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                defaultValue=""
                onChange={handleSelectChange}
              >
                <option value="" disabled hidden></option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="role_id"
                className={clsx(
                  "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                  {
                    "text-blue-600 dark:text-blue-500": hasValue, // Color cuando hay valor
                    "text-gray-500 dark:text-gray-400": !hasValue, // Color por defecto
                  },
                )}
              >
                Select a Role
              </label>
            </div>
            <div id="roles-error" aria-live="polite" aria-atomic="true">
              {clientErrors?.role_id &&
                clientErrors.role_id.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/**/}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="person_name"
                id="person_name"
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="person_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
              <div id="person_name-error">
                {clientErrors?.person_name &&
                  clientErrors.person_name.map((error: string) => (
                    <p className="mt-1 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group ">
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 !appearance-none  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="lastname"
                className="peer-checked:bg-blue-600 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
              <div id="lastname-error">
                {clientErrors?.lastname &&
                  clientErrors.lastname.map((error: string) => (
                    <p className="mt-1 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/**/}

          {/* DNI */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="dni"
              name="dni"
              type="text"
              className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="dni"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DNI
            </label>
            <div id="dni-error">
              {clientErrors?.dni &&
                clientErrors.dni.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Username */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="user_name"
              name="user_name"
              type="text"
              className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="user_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
            <div id="user_name-error">
              {clientErrors?.user_name &&
                clientErrors.user_name.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="password"
              name="password"
              type="password"
              className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <div id="password-error">
              {clientErrors?.password &&
                clientErrors.password.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="email"
              name="email"
              type="text"
              className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            <div id="email-error">
              {clientErrors?.email &&
                clientErrors.email.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading}
            >
              {loading ? "" + "Processing..." : "Create User"}
            </button>
          </div>

          {/* Mensaje general */}
          {message && (
            <div
              className={`mt-4 text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
            >
              {message}
            </div>
          )}
        </form>
      </div>

      {loading ? (
        <div className="absolute top-0 z-10 opacity-100  w-full h-full px-0"></div>
      ) : null}

      {/*Modal*/}
      <div
        className={clsx("absolute top-0 -z-10 opacity-0  w-full h-full px-0", {
          "opacity-100": modalup,
          "z-10": modalup,
        })}
      >
        <div>
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
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code2"
                          maxLength={1}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code3"
                          maxLength={1}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="code4"
                          maxLength={1}
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
      {/*Fin Modal*/}
    </>
  );
}
