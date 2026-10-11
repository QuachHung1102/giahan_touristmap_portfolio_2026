"use client";

import { motion } from "motion/react";
import { AnhGoc } from "@/components/AnhGoc";
import { TieuDe } from "@/components/TieuDe";
import { VanBan } from "@/components/VanBan";
import type { Bang, Canh, Khoi } from "@/data";

const canhChu: Record<Canh, string> = { trai: "text-left", giua: "text-center", phai: "text-right" };

// children fade up one after another, like a hand of cards being dealt
const day = { an: {}, hien: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const tungKhoi = {
  an: { opacity: 0, y: 12 },
  hien: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const rong = (px: number) => ({ width: `calc(var(--px) * ${px})` });

// A one-line heading may run a little wide (the stand-in font is ~2% fatter than Avilock). Let it lean 6 into
// the panel's padding before it wraps; which side it leans to depends on how it is aligned. No more than 6:
// on the one-screen layout the right padding is already partly spent on the scrollbar's seat.
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
          // Figma text comes two ways. Boxed: it wraps at the box, often narrower than the panel.
          // Hugged: one line as wide as its words, with 8px of grace so a half-pixel never breaks the line.
          // Either way it wraps for real once the panel is narrower than that.
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
      // zero height like the Figma line: it sits in the gap instead of pushing things apart
      return <hr className="h-0 w-full border-0 shadow-[0_0_0_1px_var(--color-xanh)]" />;
  }
}

// One frosted panel of content. As wide as Figma drew it and as tall as its content, capped by the room there is.
// cuon: on the one-screen layout a panel too tall for the window scrolls inside its own frame. Its scrollbar has
// a reserved seat, paid for out of the right padding, so the text keeps the exact width it has in Figma.
export function BangNoiDung({ bang, id, cuon = true }: { bang: Bang; id?: string; cuon?: boolean }) {
  return (
    <motion.article
      id={id}
      data-giu-mo
      variants={day}
      initial="an"
      animate="hien"
      // overflow-clip: blocks still sliding into place must not stretch the page for half a second
      className={`pointer-events-auto flex flex-col items-center rounded-17 border-2 border-xanh bg-giay/80 p-20 max-xl:scroll-mt-16 ${
        cuon
          ? "chua-cho-ban-do khung-cuon min-h-0 max-xl:max-w-full max-xl:overflow-clip xl:pr-[calc(var(--px)*20_-_var(--rong-thanh-cuon,0px))]"
          : "max-w-full shrink-0 overflow-clip"
      }`}
      // the 2px border does not scale with --px, so it is kept out of the scaled width: the text box inside
      // then has exactly its Figma width at any scale, and lines break where Figma breaks them
      style={{ width: `calc(var(--px) * ${bang.rong - 4} + 4px)`, gap: `calc(var(--px) * ${bang.khoangCach})` }}
    >
      {bang.khoi.map((khoi, i) => (
        // shrink-0: inside a height-capped panel the blocks must overflow and scroll, not squash
        <motion.div key={i} variants={tungKhoi} className="flex w-full shrink-0 justify-center">
          <MotKhoi khoi={khoi} />
        </motion.div>
      ))}
    </motion.article>
  );
}
