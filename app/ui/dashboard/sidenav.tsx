import NavLinks from '@/app/ui/dashboard/nav-links';
import { Icon } from '@iconify/react';
import { signOut } from '@/auth';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">

        <div className='relative flex h-[48px] w-[48px] md:h-[200px] md:w-full grow  justify-center rounded-md p-3 text-sm font-medium md:flex-none md:p-2 md:px-3 bg-blue-500'>
          <div className='w-full flex absolute'>
            <Icon icon="material-symbols:menu" />
          </div>
          <Image src="/market-icono.png" alt="Market Icon"
            width={40}      // Ancho base
            height={40}     // Alto base
            priority={true}
            className='hidden p-[10px]  md:block w-full h-auto' />
          <Image src="/icon-market-dark.png" alt="Market Icon"
            width={14}
            height={14}
            className='block md:hidden' />


        </div>

        <NavLinks />
        <div className=" hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <Icon icon="uil:setting" className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}