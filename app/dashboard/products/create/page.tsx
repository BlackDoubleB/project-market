import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProducts } from '@/app/lib/data';
export default async function Page() {

  const products = await fetchProducts();
  return (

    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Products',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form products={products} />
    </main>
  );
}