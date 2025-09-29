import "./globals.css";
import { inter } from "@/app/ui/fonts";

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Market',
    default: 'Market',
  },
  description: 'Market is an administrative dashboard for managing your business quickly and centrally. Control products, prices, inventory, and sales in one place. Automate repetitive tasks.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <meta
        name="description"
        content="Market is an administrative dashboard for managing your business quickly and centrally. Control products, prices, inventory, and sales in one place. Automate repetitive tasks."
      />
      <meta
        name="keywords"
        content="dashboard, administration, inventory, sales, product management"
      />
      <meta property="og:title" content="Market" />
      <meta property="og:description" content="Market is an administrative dashboard for managing your business quickly and centrally. Control products, prices, inventory, and sales in one place. Automate repetitive tasks." />
      <meta property="og:image" content="https://res.cloudinary.com/doublebl/image/upload/v1759113538/1759037143666_acjq0t.jpg" />
      <link rel="icon" href="/favicon.ico" />

      <head>
        <title>Market</title>
      </head>
      <body
        className={`${inter.className} antialiased max-[300px]:break-all bg-gray-50 min-h-screen`}
      >
        {" "}
        {children}
      </body>
    </html>
  );
}
