import Form from "@/app/ui/login/create-form";
import { fetchRoles } from '@/app/lib/data'
export default async function page() {
    const roles = await fetchRoles();
    return (
       <>
        <main className="bg-black flex flex-col items-center justify-center md:h-screen">
            <div className="bg- drop-shadow-[0_35px_35px_rgba(10,20,50,80.70)] rounded-xl border-solid border border-gray-600  bg-gray-50 relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 " >
                <Form roles={roles} />
            </div>
        </main>
       </>
    );
}





