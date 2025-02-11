import Form from '@/app/ui/sales/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProducts } from '@/app/lib/data';
 
export default async function Page() {
   const products = await fetchProducts();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sales', href: '/dashboard/sales' },
          {
            label: 'Create Sale',
            href: '/dashboard/sales/create',
            active: true,
          },
        ]}
      />
      <Form products = {products} />
    </main>
  );
}