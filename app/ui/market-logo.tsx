import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function MarketLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
        <Image src="/public/market-icono.png" alt="Logo de Project Market" width={48} height={48} className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Market</p>
    </div>
  );
}
