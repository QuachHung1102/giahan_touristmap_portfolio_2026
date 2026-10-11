import { ImageResponse } from "next/og";
import { BieuTuong } from "@/components/BieuTuong";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// square corners on purpose: iOS rounds the home-screen icon itself
export default function AppleIcon() {
  return new ImageResponse(<BieuTuong kichThuoc={size.width} boGoc={false} />, size);
}
