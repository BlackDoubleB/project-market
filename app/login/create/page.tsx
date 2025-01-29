import Form from "@/app/ui/login/create-form";
import { fetchRoles } from '@/app/lib/data'
export default async function page() {
    const roles = await fetchRoles();
    return (
        <main>
            <Form roles={roles} />
        </main>
    );
}