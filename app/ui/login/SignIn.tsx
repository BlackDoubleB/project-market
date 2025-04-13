"use client";
import { useState } from "react";
import { signInWithCredentials } from "./serverActions";
import Link from "next/link";
import { ResetWrapper } from "./ResetWrapper";
import { clsx } from "clsx";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showEnterEmail, setShowEnterEmail] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para iniciar sesión con credenciales
  const handleCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita la recarga de la página
    const response = await signInWithCredentials(
      formData.email,
      formData.password,
    );

    if (response?.success === false) {
      setError(`${response.message}`);
      return;
    }

    setError("");
  };

  return (
    <div className="w-full max-w-md ">
      <section className="flex flex-col items-center mx-auto ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="size-14" src="/icon-market-dark.png" alt="logo" />
          MARKET
        </a>
        <div className="w-full bg-white rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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

              <div className="flex items-center ">
                <p
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:cursor-pointer"
                  onClick={() => setShowEnterEmail(true)}
                >
                  Forgot password?
                </p>

                {showEnterEmail ? (
                  <ResetWrapper
                    className={clsx({
                      "absolute z-20 bg-opacity-85 bg-gray-500 top-0 w-full left-0 flex justify-center ":
                        showEnterEmail,
                    })}
                  />
                ) : null}
              </div>

              <div className="flex gap-5 flex-col">
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  Sign In
                </button>
              </div>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex">
                Don’t have an account yet?
                <Link href={"/login/create"}>
                  <p className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign up
                  </p>
                </Link>
              </div>

              {error && (
                <p className="bg-red-100 text-red-700 font-semibold rounded-xl p-3 text-sm text-center border border-red-400 shadow-xs">
                  <span className="inline-block mr-1">⚠️</span> {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
