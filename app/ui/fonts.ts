import {
  Inter,
  Lusitana,
  Exo_2,
  Playwrite_NG_Modern,
  Work_Sans,
  Noto_Sans,
} from "next/font/google";

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

export const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});
