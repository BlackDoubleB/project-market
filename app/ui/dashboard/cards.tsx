import { Icon } from '@iconify/react';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> ={
  sales: <Icon icon="mdi:sale" />,
  products: <Icon icon="lsicon:goods-outline" />,
  card: <Icon icon="ion:card" />,
  cash: <Icon icon="tabler:cash" />,
};

export default async function CardWrapper() {
  const { numberOfSales, numberOfProducts, totalCardSales, totalCashSales } = await fetchCardData();
  return (
    <>  
      <Card title="Cash" value={totalCashSales} type="cash" />
      <Card title="Card" value={totalCardSales} type="card" />
      <Card title="Total Sales" value={numberOfSales} type="sales" />
      <Card title="Total Products" value={numberOfProducts} type="products"/>
    </>
  );
}

export function Card({title,value,type,}: {title: string; value: number | string; type: keyof typeof iconMap;
}) {
  const Icon: ReactNode= iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-xs">
      <div className="flex p-4">
        {Icon}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
