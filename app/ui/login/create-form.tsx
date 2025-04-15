"use client";
import { createUser, StateUser } from "@/app/lib/actions";
import { useActionState } from "react";
import { RoleFetch } from "@/app/lib/definitions";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { FormSchemaUser } from "@/lib/validations/base-schemas";
interface Errors {
  [key: string]: string[];
}
export default function Form({ roles }: { roles: RoleFetch[] }) {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalup, setModalup] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(""); // Estado para verificar si el código es válido
  const [email, setEmail] = useState(""); // Estado para almacenar el email del usuario
  const [formData, setFormData] = useState<FormData | null>(null);
  const router = useRouter();
  const [clientErrors, setClientErrors] = useState<Errors | null>(null);
  const [hasValue, setHasValue] = useState(false);
  const [hasResend, setHasResend] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 3 minutos en segundos

  console.log(isCodeValid);
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

  //
  useEffect(() => {
    if (!modalup) return;

    // Limpiar cualquier timer existente
    const timerId = setTimeout(() => {}, 0);
    clearTimeout(timerId);

    // Iniciar nuevo timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [modalup, hasResend]); // Dependencias actualizadas

  // Formatea minutos y segundos correctamente:
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  //
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
          action: "create-user",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setModalup(true);
        setTimeLeft(60); // Reiniciar el contador a 60 segundos
        setHasResend((prev) => prev + 1); // Actualizar el contador de reenvíos

        setMessage("Correo enviado con éxito 🎉");
      } else {
        setMessage(`Error: ${result.error.message}`);
        console.log("Error:", result.error);
      }
    } catch (error) {
      console.log(error);
      setMessage("Hubo un problema al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const code = getCombinedCode(form); // Obtener el código combinado
    let result;
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

      result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setIsCodeValid("valid"); // Marcar el código como válido
        setModalup(false); // Cerrar el modal

        // Enviar el formulario con los datos guardados
        startTransition(async () => {
          console.log("Enviando el formulario");
          if (formData) {
            const result = await formAction(formData);
            console.log("Resultado del servidor:", result);
          }
        });
      } else {
        setMessage(`${result.message}`);
        setIsCodeValid("invalid");
      }
    } catch (error) {
      setMessage(`${result.message}`);
      setIsCodeValid("invalid");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Guardar los datos del formulario
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    try {
      // // Validar con Zod (incluyendo la validación asíncrona del email)
      const result = await FormSchemaUser.safeParseAsync(
        Object.fromEntries(data),
      );

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        setClientErrors(errors);
        setLoading(false);
        return;
      }

      // Si pasa la validación, guardar los datos y enviar el correo
      setFormData(data);
      setTimeLeft(60);
      console.log("correcto");
      await sendEmail();
    } catch (error) {
      console.log(error);
      setMessage("Error validating form");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.message === "Usuario creado con éxito") {
      router.push("/login"); // Redirige correctamente
    }
  }, [state.message, router]);

  return (
    <>
      <div
        className={clsx("absolute top-0 -z-10 opacity-0  w-full h-full ", {
          "opacity-100": modalup,
          "z-10": modalup,
          "bg-gray-600": modalup,
          "opacity-75": modalup,
        })}
      ></div>
      <div className="relative w-full max-w-md ">
        <div className="p-10 rounded-2xl border-gray-300 dark:bg-gray-800 dark:border-gray-600 shadow-sm bg-white ">
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
                  className=" block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer "
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
                    "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
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
                  className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="person_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none!  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="lastname"
                  className="peer-checked:bg-blue-600 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="dni"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="user_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:rtl:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {/**/}

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
                className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-4 focus:outline-hidden focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Icon icon="eos-icons:loading" className="mr-2" />
                    Processing...
                  </span>
                ) : (
                  "Create User"
                )}
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="absolute top-0 z-10 opacity-100  w-full h-full px-0"></div>
        ) : null}

        {/*Modal*/}
        <div
          className={clsx("absolute top-0 -z-10 opacity-0  h-full px-0", {
            "opacity-100": modalup,
            "z-10": modalup,
          })}
        >
          <div>
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
              <div className="mx-auto flex w-full max-w-md flex-col space-y-16 ">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="font-semibold text-xl sm:text-3xl ">
                    <p>Email Verification</p>
                  </div>
                  <div className="flex flex-row text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email {email}</p>
                  </div>
                </div>

                <div>
                  <form onSubmit={verifyCode}>
                    <div className="flex flex-col items-center space-y-16">
                      <div className="flex flex-row items-center justify-center gap-2 sm:gap-0 sm:justify-between mx-auto w-full max-w-xs">
                        <div className="w-full sm:w-16 h-16">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-hidden rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name="code1"
                            maxLength={1}
                          />
                        </div>
                        <div className="w-full sm:w-16 h-16">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-hidden rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name="code2"
                            maxLength={1}
                          />
                        </div>
                        <div className="w-full sm:w-16 h-16">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-hidden rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name="code3"
                            maxLength={1}
                          />
                        </div>
                        <div className="w-full sm:w-16 h-16">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-hidden rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name="code4"
                            maxLength={1}
                          />
                        </div>
                      </div>

                      <div className="w-full max-w-xs">
                        <button
                          type="submit"
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-hidden py-5 bg-blue-700 border-none text-white text-sm shadow-xs"
                        >
                          Verify Account
                        </button>

                        {message === "Código  no encontrado o caducado" ||
                        message === "Su codigo caduco, reenvie nuevamente" ||
                        message ===
                          "Has excedido el número máximo de intentos. Reenvie nuevamente" ||
                        message ===
                          "Último intento fallido. Reenvie nuevamente" ||
                        message === "Error desconocido" ||
                        message ===
                          "No hay información de stack disponible" ? null : (
                          <div className=" flex items-center justify-center">
                            <p className="pr-1">{formattedTime}</p>
                            <Icon icon="ci:timer" />
                          </div>
                        )}

                        <p className="text-center text-red-500">{message}</p>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn`&apos;`t recieve code?</p>{" "}
                        <button
                          type="button"
                          onClick={sendEmail}
                          disabled={timeLeft > 0}
                          className={clsx("flex flex-row items-center", {
                            "text-blue-600 cursor-pointer hover:underline":
                              timeLeft <= 0,
                            "text-gray-400 cursor-not-allowed": timeLeft > 0,
                          })}
                        >
                          Resend {timeLeft > 0 && `(${formattedTime})`}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Fin Modal*/}
      </div>
    </>
  );
}
