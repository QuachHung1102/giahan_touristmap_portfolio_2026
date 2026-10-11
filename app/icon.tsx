import { ImageResponse } from "next/og";
import { BieuTuong } from "@/components/BieuTuong";

// bigger than a tab needs, so it stays sharp on dense screens
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<BieuTuong kichThuoc={size.width} />, size);
}
