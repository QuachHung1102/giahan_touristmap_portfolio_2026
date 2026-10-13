"use client";

import { useEffect, useState } from "react";
import { AnhGoc } from "@/components/AnhGoc";
import type { Anh } from "@/data";

const THOI_GIAN_MO = 1300; // the designer asked for exactly this
const THOI_GIAN_DUNG = 2600;

export function AnhBiaChuyenCanh({ danhSach, className = "" }: { danhSach: Anh[]; className?: string }) {
  const soAnh = danhSach.length;
  const [canh, datCanh] = useState<{ hien: number; truoc: number | null }>({ hien: 0, truoc: null });

  useEffect(() => {
    if (soAnh < 2) return;
    const hen = setInterval(
      () => datCanh((c) => ({ hien: (c.hien + 1) % soAnh, truoc: c.hien })),
      THOI_GIAN_DUNG + THOI_GIAN_MO,
    );
    return () => clearInterval(hen);
  }, [soAnh]);

  const keTiep = (canh.hien + 1) % soAnh;
  const lop = (anh: Anh, uuTien = false) => (
    <AnhGoc anh={{ ...anh, rong: 434, cao: 233 }} className="h-full w-full" uuTien={uuTien} />
  );

  return (
    <div className={`relative overflow-hidden rounded-17 border-3 border-xanh ${className}`}>
      {/* next photo preloads here */}
      {keTiep !== canh.hien && keTiep !== canh.truoc && (
        <div key={`cho-${keTiep}`} className="absolute inset-0 opacity-0">
          {lop(danhSach[keTiep])}
        </div>
      )}
      {canh.truoc !== null && (
        <div key={`nen-${canh.truoc}`} className="absolute inset-0">
          {lop(danhSach[canh.truoc])}
        </div>
      )}
      {/* new key each step restarts the fade */}
      <div key={`hien-${canh.hien}`} className="absolute inset-0 animate-tan">
        {lop(danhSach[canh.hien], canh.truoc === null)}
      </div>
    </div>
  );
}
