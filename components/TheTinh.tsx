"use client";

import { AnimatePresence, motion } from "motion/react";
import { AnhBiaChuyenCanh } from "@/components/AnhBiaChuyenCanh";
import { TieuDe } from "@/components/TieuDe";
import type { MucCon, Tinh } from "@/data";

type Props = {
  tinh: Tinh;
  muc: number;
  con: number;
  chonMuc: (viTri: number) => void;
  chonCon: (viTri: number) => void;
  className?: string;
};

// 44px is the smallest row a thumb hits reliably; only matters once the card is scaled down on phones
const hang =
  "flex w-full cursor-pointer items-center justify-center px-20 text-18 leading-[1.55] transition-colors duration-200 max-xl:min-h-[44px]";

// A sub-row label. Figma has two kinds: boxed ones that wrap at their box, and loose ones that stay on one line.
// Either kind may lean a few pixels into the row's padding, as it does in Figma, and both wrap for real once
// the card itself gets narrower than that.
function NhanCon({ con }: { con: MucCon }) {
  return con.rong ? (
    <span
      className="-mx-18 max-w-[calc(100%+var(--px)*36)] shrink-0 whitespace-pre-line"
      style={{ width: `calc(var(--px) * ${con.rong})` }}
    >
      {con.nhan}
    </span>
  ) : (
    <span className="-mx-18 w-max max-w-[calc(100%+var(--px)*36)] shrink-0 whitespace-pre-line">{con.nhan}</span>
  );
}

// The province card: cover, name, and the menu that decides which panel shows up next to it.
// On the one-screen layout it can never be taller than the window. When the menu opens and there is no room,
// the photo gives way first (it shrinks 1000x more willingly, down to a slim banner); only if that is not enough
// does the menu scroll. Its scrollbar sits in the card's right padding, on a seat that is always reserved, so the
// rows never change width when it appears.
export function TheTinh({ tinh, muc, con, chonMuc, chonCon, className = "" }: Props) {
  return (
    <div className={`flex min-h-0 w-[calc(var(--px)*474+4px)] max-w-full flex-col gap-18 rounded-17 border-2 border-xanh bg-giay/70 p-20 ${className}`}>
      <AnhBiaChuyenCanh danhSach={tinh.anhBia} className="h-233 min-h-48 w-full shrink-[1000]" />
      <TieuDe chu={tinh.ten} theo="letters" className="shrink-0 text-65 text-xanh" />

      {/* the menu is 442 wide in Figma, 4px proud of the padding on each side */}
      <nav
        aria-label={tinh.tenDayDu}
        className="khung-cuon -mx-4 flex min-h-0 flex-col xl:mr-[calc(var(--px)*-4_-_var(--rong-thanh-cuon,0px))]"
      >
        {tinh.mucLuc.map((m, i) => {
          const dangMo = i === muc;
          // the rule under a row disappears while its children are hanging out below it
          const coKe = !(dangMo && m.con);
          return (
            <div key={m.nhan} className="shrink-0">
              <button
                type="button"
                onClick={() => chonMuc(i)}
                aria-expanded={m.con ? dangMo : undefined}
                aria-current={dangMo && !m.con ? "true" : undefined}
                className={`${hang} h-50 border-xanh ${i === 0 ? "border-t-2" : ""} ${coKe ? "border-b-2" : ""} ${
                  dangMo ? "bg-xanh font-bold text-white" : "text-xanh hover:bg-xanh/10"
                }`}
              >
                {m.nhan}
              </button>

              <AnimatePresence initial={false}>
                {dangMo && m.con && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    // one background for the whole list: separate ones leave hairline seams at fractional pixels
                    className="overflow-hidden bg-xanh-nhat"
                  >
                    {m.con.map((c, j) => (
                      <button
                        key={c.nhan}
                        type="button"
                        onClick={() => chonCon(j)}
                        aria-current={!m.xepChong && j === con ? "true" : undefined}
                        // the chosen row goes dark instead of bold: bold would re-wrap the label and make the card jump
                        className={`${hang} py-10 text-center text-white ${c.gon ? "" : "min-h-50"} ${
                          !m.xepChong && j === con ? "bg-xanh" : "hover:bg-xanh/60"
                        }`}
                      >
                        <NhanCon con={c} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
