"use client";
import { Icon } from "@iconify/react";

export function EnterEmail({
  className,
  setMessage,
  message,
  email,
  setEmail,
  setUserId,
}: {
  className?: string;
  setMessage: (message: string) => void;
  message?: string;
  email?: string;
  setEmail: (email: string) => void;
  setUserId: (userId: string) => void;
}) {
  // Estado para almacenar el email del usuario

  const sendEmail = async () => {
    const responseExistEmail = await fetch("/api/queries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const resultExistEmail = await responseExistEmail.json();
    if (resultExistEmail.message !== "Email already registered") {
      console.log("No existe el email");
      setMessage("There is no registered user with the email");
      return;
    }

    setMessage("");
    setUserId(resultExistEmail.user_id);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          action: "resset-password",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Codigo Enviado");
      } else {
        setMessage(`Error: ${result.error.message}`);
      }
    } catch (error) {
      console.log(error);
      setMessage("Hubo un problema al enviar el correo.");
    }
  };

  return (
    <section className={`bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="flex items-center justify-center min-h-screen w-full max-w-sm">
        <div
          className="w-full bg-white
         rounded-lg shadow dark:border  sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-8 m-4"
        >
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <button
              type="button"
              className="w-full text-white bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:ring-3 hover:ring-blue-200 "
              onClick={sendEmail}
            >
              Send code
            </button>
            {message === "There is no registered user with the email" ? (
              <div className="flex justify-center  bg-red-700 border-2 border-red-100  p-1 rounded-md my-2">
                <Icon icon="fluent-emoji-flat:warning" />
                <p className="block text-xs text-white">{message}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
