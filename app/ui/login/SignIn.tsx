"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signInWithCredentials } from "./serverActions";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { lusitana } from "@/app/ui/fonts";
export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: "false",
  });

  // Manejar cambios en los inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value, // Convertir a string
    }));
  };

  // Función para iniciar sesión con credenciales
  const handleCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita la recarga de la página

    await signInWithCredentials(
      formData.email,
      formData.password,
      formData.rememberMe, // Enviar como string
    );
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="size-14 " src="/icon-market-dark.png" alt="logo" />
            MARKET
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                Sign in to your account
              </h1>

              <form
                onSubmit={handleCredentials}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe === "true"} // Usar string para el estado
                        onChange={handleChange}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="flex gap-5 flex-col ">
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign In
                  </button>
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex">
                  Don’t have an account yet?{" "}
                  <Link href={"/login/create"}>
                    <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/*<Link href="/">*/}
      {/*  <div className="flex justify-center items-center">*/}
      {/*    <div>*/}
      {/*      <div className="flex hover:bg-gray-200  rounded-lg p-2 cursor-pointer gap-2 items-center  transform transition-transform duration-200 active:scale-95">*/}
      {/*        <Icon*/}
      {/*          icon="material-symbols:arrow-left-alt"*/}
      {/*          className="w-5 h-6 "*/}
      {/*        />*/}
      {/*        <p*/}
      {/*          className={`${lusitana.className} bg-inherit text-sm font-medium`}*/}
      {/*        >*/}
      {/*          Regresar*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Link>*/}
    </div>

    //
  );
}
