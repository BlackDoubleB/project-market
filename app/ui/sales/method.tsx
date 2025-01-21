import { Icon } from '@iconify/react';
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
          Card
          <Icon icon="zmdi:card" className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      
      {method === 'cash' ? (
        <>
          cash
          <Icon icon="mdi:cash" className="ml-1 w-4 text-white"/>
        </>
      ) : null}
    </span>
  );
}
