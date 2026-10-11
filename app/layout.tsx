import type { Metadata } from "next";
import { Be_Vietnam_Pro, Sofia_Sans_Extra_Condensed } from "next/font/google";
import { CauHinhChuyenDong } from "@/components/HienDan";
import "./globals.css";

const chuThuong = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

// understudy for Avilock until the real file lands in public/fonts (measured: widths within 2% of it)
const chuDuPhong = Sofia_Sans_Extra_Condensed({
  variable: "--font-du-phong",
  subsets: ["latin"],
  weight: "900",
});

// Be Vietnam's web subset has no "→", and its fallback draws one 10% too wide. Borrow Arial's.
// 97% is measured: with it every route line comes out as wide as Figma says, or a hair under.
// One face for every weight, so bold text doesn't fatten the arrow. Kept inline: from globals.css it once
// reached the browser without its size-adjust, and line breaks depend on that number.
const chuMuiTen = '@font-face{font-family:"Mui Ten";src:local("Arial");unicode-range:U+2190-21FF;font-weight:100 900;size-adjust:97%}';

export const metadata: Metadata = {
  title: "Rooted Routes Vietnam",
  description:
    "An interactive map of Vietnam connecting travelers with the places, cultures, and people behind the map.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${chuThuong.variable} ${chuDuPhong.variable} antialiased`}>
      <body>
        <style>{chuMuiTen}</style>
        <CauHinhChuyenDong>{children}</CauHinhChuyenDong>
      </body>
    </html>
  );
}
