import ShowForm from "@/app/ui/sales/show-form";

import { fetchSaleById, fetchCategories, fetchProducts } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const saleById = await fetchSaleById(id);

  if (!saleById) {
    notFound();
  }
  return (
    <main>
      <ShowForm
        saleById={saleById}
        categories={categories}
        products={products}
      />
    </main>
  );
}
