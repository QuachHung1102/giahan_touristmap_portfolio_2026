"use client";

import { motion } from "motion/react";
import { AnhGoc } from "@/components/AnhGoc";
import { TieuDe } from "@/components/TieuDe";
import { VanBan } from "@/components/VanBan";
import type { Bang, Canh, Khoi } from "@/data";

const canhChu: Record<Canh, string> = { trai: "text-left", giua: "text-center", phai: "text-right" };

const day = { an: {}, hien: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const tungKhoi = {
  an: { opacity: 0, y: 12 },
  hien: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const rong = (px: number) => ({ width: `calc(var(--px) * ${px})` });

// a one-line heading may lean 6 into the padding before it wraps
const noiTieuDe: Record<Canh, { lop: string; them: number }> = {
  trai: { lop: "-mr-6", them: 6 },
  giua: { lop: "-mx-6", them: 12 },
  phai: { lop: "-ml-6", them: 6 },
};

function MotKhoi({ khoi }: { khoi: Khoi }) {
  switch (khoi.kieu) {
    case "tieuDe":
      return khoi.motDong ? (
        <div
          className={`shrink-0 ${noiTieuDe[khoi.canh].lop} ${khoi.rong ? "" : "w-max"}`}
          style={{
            ...(khoi.rong ? rong(khoi.rong + noiTieuDe[khoi.canh].them) : undefined),
            maxWidth: `calc(100% + var(--px) * ${noiTieuDe[khoi.canh].them})`,
          }}
        >
          <TieuDe chu={khoi.chu} cap={3} canh={khoi.canh} className="text-40" />
        </div>
      ) : (
        <div className="max-w-full shrink-0" style={khoi.rong ? rong(khoi.rong) : undefined}>
          <TieuDe chu={khoi.chu} cap={3} canh={khoi.canh} className="text-40" />
        </div>
      );
    case "vanBan":
      return (
        <div
          // boxed text wraps at its Figma width; hugged text stays on one line while it fits
          className={`shrink-0 ${khoi.om ? "-mx-4 w-max max-w-[calc(100%+var(--px)*8)]" : "max-w-full"}`}
          style={{ ...(khoi.rong ? rong(khoi.rong) : undefined), letterSpacing: khoi.gian && `${khoi.gian}em` }}
        >
          <VanBan dong={khoi.dong} className={`text-20 ${khoi.dam ? "font-bold" : ""} ${canhChu[khoi.canh]}`} />
        </div>
      );
    case "anh":
      return <AnhGoc anh={khoi} className="w-full rounded-17" />;
    case "nhom":
      return (
        <div className="flex max-w-full flex-col items-center gap-10">
          {khoi.khoi.map((k, i) => (
            <MotKhoi key={i} khoi={k} />
          ))}
        </div>
      );
    case "ke":
      // zero height, like the Figma line
      return <hr className="h-0 w-full border-0 shadow-[0_0_0_1px_var(--color-xanh)]" />;
  }
}

// cuon: too tall for the window, so it scrolls inside its own frame
export function BangNoiDung({ bang, id, cuon = true }: { bang: Bang; id?: string; cuon?: boolean }) {
  return (
    <motion.article
      id={id}
      data-giu-mo
      variants={day}
      initial="an"
      animate="hien"
      className={`pointer-events-auto flex flex-col items-center rounded-17 border-2 border-xanh bg-giay/80 p-20 max-xl:scroll-mt-16 ${
        cuon
          ? "chua-cho-ban-do khung-cuon min-h-0 max-xl:max-w-full max-xl:overflow-clip xl:pr-[calc(var(--px)*20_-_var(--rong-thanh-cuon,0px))]"
          : "max-w-full shrink-0 overflow-clip"
      }`}
      // the 2px border doesn't scale, so it stays out of the scaled width
      style={{ width: `calc(var(--px) * ${bang.rong - 4} + 4px)`, gap: `calc(var(--px) * ${bang.khoangCach})` }}
    >
      {bang.khoi.map((khoi, i) => (
        // blocks must overflow and scroll, not squash
        <motion.div key={i} variants={tungKhoi} className="flex w-full shrink-0 justify-center">
          <MotKhoi khoi={khoi} />
        </motion.div>
      ))}
    </motion.article>
  );
}
