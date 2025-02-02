import Form from '@/app/ui/roles/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchRoleById} from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page(props: { params: Promise<{ id: string }> }) 
{
    const params = await props.params;
    const id = params.id;
    const roleById = await fetchRoleById(id);
      
      if (!roleById) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Edit Category',
            href: `/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form roleById={roleById} />
    </main>
  );
}