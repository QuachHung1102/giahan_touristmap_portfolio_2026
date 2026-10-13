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

// 44px: the smallest row a thumb hits reliably
const hang =
  "flex w-full cursor-pointer items-center justify-center px-20 text-18 leading-[1.55] transition-colors duration-200 max-xl:min-h-[44px]";

// boxed labels wrap at their box, loose ones stay on one line; both may lean into the padding
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

// short window: the photo shrinks first, then the menu scrolls
export function TheTinh({ tinh, muc, con, chonMuc, chonCon, className = "" }: Props) {
  return (
    <div className={`flex min-h-0 w-[calc(var(--px)*474+4px)] max-w-full flex-col gap-18 rounded-17 border-2 border-xanh bg-giay/70 p-20 ${className}`}>
      <AnhBiaChuyenCanh danhSach={tinh.anhBia} className="h-233 min-h-48 w-full shrink-[1000]" />
      <TieuDe chu={tinh.ten} className="shrink-0 text-65 text-xanh" />

      {/* 442 wide in Figma: 4px proud of the padding */}
      <nav
        aria-label={tinh.tenDayDu}
        className="khung-cuon -mx-4 flex min-h-0 flex-col xl:mr-[calc(var(--px)*-4_-_var(--rong-thanh-cuon,0px))]"
      >
        {tinh.mucLuc.map((m, i) => {
          const dangMo = i === muc;
          // no rule under a row while its children show
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
                    // one background: separate ones leave hairline seams
                    className="overflow-hidden bg-xanh-nhat"
                  >
                    {m.con.map((c, j) => (
                      <button
                        key={c.nhan}
                        type="button"
                        onClick={() => chonCon(j)}
                        aria-current={!m.xepChong && j === con ? "true" : undefined}
                        // dark, not bold: bold would re-wrap the label
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
