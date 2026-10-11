import Image from "next/image";
import type { Anh } from "@/data";

type Props = { anh: Anh; className?: string; uuTien?: boolean };

// The original file, untouched. The frame keeps Figma's proportions and crop.
export function AnhGoc({ anh, className = "", uuTien = false }: Props) {
  const { cat } = anh;
  return (
    <span
      className={`relative block overflow-hidden bg-xanh/10 ${className}`}
      style={{ aspectRatio: `${anh.rong} / ${anh.cao}` }}
    >
      {cat ? (
        // next/image refuses a custom size on "fill", so a cropped photo is placed by hand
        <Image
          src={anh.src}
          alt={anh.moTa}
          width={anh.rong}
          height={anh.cao}
          draggable={false}
          priority={uuTien}
          className="absolute max-w-none"
          style={{ width: `${cat.rong}%`, height: `${cat.cao}%`, left: `${cat.trai}%`, top: `${cat.tren}%` }}
        />
      ) : (
        <Image src={anh.src} alt={anh.moTa} fill draggable={false} priority={uuTien} className="object-cover" />
      )}
    </span>
  );
}
