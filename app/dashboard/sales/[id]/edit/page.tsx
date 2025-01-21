import Form from '@/app/ui/sales/edit-form';
import Breadcrumbs from '@/app/ui/sales/breadcrumbs';
import { fetchSaleById, fetchProducts } from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page(props: { params: Promise<{ id: string }> }) 
{
    const params = await props.params;
    const id = params.id;
    const [sale, products] = await Promise.all([
        fetchSaleById(id),
        fetchProducts(),
      ]);
      
      if (!sale) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sales', href: '/dashboard/sales' },
          {
            label: 'Edit Sale',
            href: `/dashboard/sales/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form sale={sale} products={products} />
    </main>
  );
}