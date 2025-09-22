"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function EnterCode({
  className,
  email,
  user_id,
}: {
  className?: string;
  email?: string;
  user_id?: string;
}) {
  const [resetCode, setResetCode] = useState("");
  const router = useRouter();

  const verifyCode = async () => {
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: resetCode,
        }),
      });
      if (response.ok) {
        router.push(
          `/login/${user_id}/resetpassword?email=${encodeURIComponent(email || "")}`,
        );
      }
    } catch (error) {
      console.log(error);
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
            Enter Code
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your code
              </label>
              <input
                type="code"
                name="code"
                id="code"
                value={resetCode}
                onChange={(e) => {
                  setResetCode(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1234"
                required
              />
            </div>

            <button
              type="button"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-hidden focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={verifyCode}
            >
              Verify Code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
