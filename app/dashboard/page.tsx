import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestSales from '@/app/ui/dashboard/latest-sales';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestSales, fetchCardData } from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestSales = await fetchLatestSales();
  const {totalCashSales,totalCardSales,numberOfSales,numberOfProducts} = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Cash" value={totalCashSales} type="cash" />
        <Card title="Card" value={totalCardSales} type="card" />
        <Card title="Total Sales " value={numberOfSales} type="sales" />
        <Card
          title="Total Products"
          value={numberOfProducts}
          type="products"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestSales latestSales={latestSales} />
      </div>
    </main>
  );
}