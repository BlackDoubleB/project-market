
import LoginForm from '@/app/ui/login-form';
import MarketLogo from '@/app/ui/market-logo';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { lusitana } from '@/app/ui/fonts';

export default function LoginPage() {
  return (
    <main className="bg-black flex flex-col items-center justify-center md:h-screen">


      <div className="rounded-xl border-solid border border-blue-500 bg-blue-50 relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <MarketLogo />
          </div>
        </div>
        <LoginForm />

        <Link href="/">
          <div className='flex justify-center items-center'>
            <div>
              <div className='flex hover:bg-gray-200  rounded-lg p-2 cursor-pointer gap-2 items-center  transform transition-transform duration-200 active:scale-95'>
                <Icon icon="material-symbols:arrow-left-alt" className='w-5 h-6 ' />
                <p className={`${lusitana.className} bg-inherit text-sm font-medium`} >Regresar</p>
              </div>
            </div>
          </div>
        </Link>
      </div>



    </main>
  );
}