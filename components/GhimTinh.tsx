"use client";

import { motion } from "motion/react";
import { hinhDang, type Tinh } from "@/data";

type Props = { tinh: Tinh; thuTu: number; dangMo: boolean; khiBam: () => void };

const { ghim, banDo } = hinhDang;

// A pin and its name tag. Anchored by the pin's tip, in percent, so it stays put at any map size.
export function GhimTinh({ tinh, thuTu, dangMo, khiBam }: Props) {
  return (
    <motion.div
      className="ti-le-ghim absolute z-10"
      style={{
        left: `${((tinh.ghim.x - banDo.x) / banDo.rong) * 100}%`,
        top: `${((tinh.ghim.y - banDo.y) / banDo.cao) * 100}%`,
      }}
      // pins land after the map has finished assembling itself
      initial={{ opacity: 0, y: -70, scale: 0.4 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 13, delay: 1.2 + thuTu * 0.13 }}
    >
      <button
        type="button"
        data-giu-mo
        onClick={khiBam}
        aria-pressed={dangMo}
        aria-label={tinh.tenDayDu}
        className="group absolute top-0 left-0 flex -translate-x-1/2 -translate-y-95 cursor-pointer flex-col items-center outline-none"
      >
        <span className="block animate-lo-lung" style={{ animationDelay: `${thuTu * -0.4}s` }}>
          <svg
            viewBox={`0 0 ${ghim.rong} ${ghim.cao}`}
            aria-hidden
            className={`block h-95 w-[calc(var(--px)*64.75)] origin-bottom transition-[scale] duration-300 ease-out group-hover:scale-115 group-focus-visible:scale-115 ${
              dangMo ? "scale-115" : ""
            }`}
          >
            <path d={ghim.d} fill={ghim.mau} fillRule={ghim.chan ? "evenodd" : "nonzero"} />
          </svg>
        </span>
        <span
          className="chu-tieu-de rounded-full bg-xanh px-20 py-10 text-30 whitespace-nowrap text-white transition-[scale] duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-vang"
          style={{
            marginTop: `calc(var(--px) * ${tinh.nhanViTri.y - tinh.ghim.y})`,
            translate: `calc(var(--px) * ${tinh.nhanViTri.x - tinh.ghim.x}) 0`,
          }}
        >
          {tinh.nhan}
        </span>
      </button>
    </motion.div>
  );
}
