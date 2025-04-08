import { Inter, Lusitana, Exo_2, Playwrite_NG_Modern } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

export const exo_2 = Exo_2({
  subsets: ["latin"],
  weight: "600",
});

export const playwrite = Playwrite_NG_Modern({
  weight: ["400", "300"],
  style: ["normal"],
});
