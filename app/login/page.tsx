
import SignIn from "../ui/login/SignIn";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Login',
};
export default function LoginPage() {
  return (
    <main className=" relative p-4 md:p-0 min-h-screen flex  items-center justify-center bg-gray-50 dark:bg-gray-900">
      <SignIn />
    </main>
  );
}
