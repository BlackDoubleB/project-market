import Form from '@/app/ui/stock/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProducts } from '@/app/lib/data';

export default async function Page() {
    const products = await fetchProducts();
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Stock', href: '/dashboard/stock' },
                    {
                        label: 'Create Stock',
                        href: '/dashboard/stock/create',
                        active: true,
                    },
                ]}
            />
            <Form products={products} />
        </main>
    );
}