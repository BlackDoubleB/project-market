import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import clsx from 'clsx';

export default function SaleMethod({ method }: { method: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': method === 'card',
          'bg-green-500 text-white': method === 'cash',
        },
      )}
    >
      {method === 'card' ? (
        <>
          Pending
          <CreditCardIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      
      {method === 'cash' ? (
        <>
          Paid
          <PaymentsIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
