import { Icon } from '@iconify/react';
import clsx from 'clsx';
export default function SaleMethod({ method }: { method: string }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs text-white', {
      'bg-slate-700': method === 'card',
      'bg-green-500': method === 'cash',
    }
    )}>
      {method === 'card' ? (
        <>
          Card
          <Icon icon="zmdi:card" className="ml-1 w-4 text-white" />
        </>
      ) : null}
      
      {method === 'cash' ? (
        <>
          Cash
          <Icon icon="vaadin:cash" className="ml-1 w-4 text-white" />
         
        </>
      ) : null}
    </span>
  );
}
