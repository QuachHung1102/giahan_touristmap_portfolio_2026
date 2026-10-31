import type { Metadata } from "next";
import { Be_Vietnam_Pro, Sofia_Sans_Extra_Condensed } from "next/font/google";
import { CauHinhChuyenDong } from "@/components/HienDan";
import "./globals.css";

const chuThuong = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

// stand-in for whatever Avilock has no glyph for
const chuDuPhong = Sofia_Sans_Extra_Condensed({
  variable: "--font-du-phong",
  subsets: ["latin"],
  weight: "900",
});

// Be Vietnam's web subset has no "→"; borrow Arial's, sized to the width Figma uses
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
