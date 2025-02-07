import Form from '@/app/ui/stock/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProducts, fetchStockById} from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page(props: { params: Promise<{ id: string }> }) 
{
    const params = await props.params;
    const id = params.id;
    const products = await fetchProducts();
    const stockById = await fetchStockById(id);
      
      if (!stockById) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stock', href: '/dashboard/stock' },
          {
            label: 'Edit Stock',
            href: `/dashboard/stock/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form stockById={stockById} products={products} />
    </main>
  );
}