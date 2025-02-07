import Form from '@/app/ui/products/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProductById, fetchCategories} from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page(props: { params: Promise<{ id: string }> }) 
{
    const params = await props.params;
    const id = params.id;
    const categories = await fetchCategories();
    const productById = await fetchProductById(id);
      
      if (!productById) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Edit Product',
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form productById={productById} categories={categories} />
    </main>
  );
}