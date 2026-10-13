import Image from "next/image";
import type { Anh } from "@/data";

type Props = { anh: Anh; className?: string; uuTien?: boolean };

export function AnhGoc({ anh, className = "", uuTien = false }: Props) {
  const { cat } = anh;
  return (
    <span
      className={`relative block overflow-hidden bg-xanh/10 ${className}`}
      style={{ aspectRatio: `${anh.rong} / ${anh.cao}` }}
    >
      {cat ? (
        // next/image refuses a custom size with "fill"
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
