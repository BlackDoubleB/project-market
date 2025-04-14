"use client";
import { StatePassword, updatePassword } from "@/app/lib/actions";
import { startTransition, useActionState, useState } from "react";
import { FormSchemaPassword } from "@/lib/validations/base-schemas";
import { Icon } from "@iconify/react";
import Link from "next/link";
export function ResetPassword({
  user_id,
  email,
}: {
  user_id: string;
  email: string;
}) {
  console.log("El correo es:", email);
  const initialState: StatePassword = { message: null, errors: {} };
  const updatePasswordWithId = updatePassword.bind(null, user_id);

  const [state, formAction] = useActionState<StatePassword, FormData>(
    updatePasswordWithId,
    initialState,
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clientErrors, setClientErrors] = useState<{
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientErrors({});
    const passwordValidation = FormSchemaPassword.safeParse({
      password,
      email,
    });
    if (!passwordValidation.success) {
      setClientErrors({
        password: passwordValidation.error.flatten().fieldErrors.password,
      });
      // Validación del campo confirmPassword
      if (!confirmPassword.trim()) {
        setClientErrors((prev) => ({
          ...prev,
          confirmPassword: ["Please confirm your password"],
        }));
        console.log("Please confirm your password");
        return;
      }
      return;
    }
    if (!confirmPassword.trim()) {
      setClientErrors((prev) => ({
        ...prev,
        confirmPassword: ["Please confirm your password"],
      }));
      console.log("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setClientErrors((prev) => ({
        ...prev,
        confirmPassword: ["Passwords do not match"],
        general: "Passwords do not match",
      }));
      console.log("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("email", email);

      startTransition(() => {
        formAction(formData);
      });
    } catch (error) {
      setClientErrors({
        general: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="absolute p-2 m-2 flex gap-2 items-center cursor-pointer hover:text-blue-500 ">
        <Icon icon="ep:back" className="size-5 " />

        <Link href={`/login`}>
          <p className="text-sm font-medium">Back To Login</p>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="size-14" src="/icon-market-dark.png" alt="logo" />
          MARKET
        </div>
        <div className="w-full p-6 bg-white rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {clientErrors.password && (
              <p className="bg-red-100 text-red-700 font-semibold rounded-xl p-3 text-sm text-center border border-red-400 shadow-xs">
                <span className="inline-block mr-1">⚠️</span>{" "}
                {clientErrors.password}
              </p>
            )}{" "}
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {clientErrors.confirmPassword && (
              <p className="bg-red-100 text-red-700 font-semibold rounded-xl p-3 text-sm text-center border border-red-400 shadow-xs">
                <span className="inline-block mr-1">⚠️</span>{" "}
                {clientErrors.confirmPassword}
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Icon icon="eos-icons:loading" className="mr-2" />
                  Processing...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
            {state.message && (
              <p className="bg-red-100 text-red-700 font-semibold rounded-xl p-3 text-sm text-center border border-red-400 shadow-xs">
                <span className="inline-block mr-1">⚠️</span> {state.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
