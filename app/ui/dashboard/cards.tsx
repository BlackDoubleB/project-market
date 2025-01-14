import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import { lusitana } from '@/app/ui/fonts';


const iconMap = {
  sales: PointOfSaleIcon,
  products: InventoryIcon,
  card: CreditCardIcon,
  cash: PaymentsIcon,
};

// export default async function CardWrapper() {
//   return (
//     <>  
//       <Card title="Cash" value={totalCashSales} type="cash" />
//       <Card title="Card" value={totalCardSales} type="card" />
//       <Card title="Total Sales" value={numberOfSales} type="sales" />
//       <Card
//         title="Total Products"
//         value={numberOfProducts}
//         type="products"
//       />
//     </>
//   );
// }

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'sales' | 'products' | 'card' | 'cash';
}) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
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
