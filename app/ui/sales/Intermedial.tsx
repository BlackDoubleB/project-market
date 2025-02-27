// components/Intermedial.tsx
import { ShowDetailsWrapper } from "@/app/ui/sales/buttons";
import { fetchCategories, fetchProducts, fetchSaleById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Intermedial({ id }: { id: string }) {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const saleById = await fetchSaleById(id);

  if (!saleById) {
    notFound();
  }
  return (
    <ShowDetailsWrapper
      saleById={saleById}
      categories={categories}
      products={products}
    />
  );
}
