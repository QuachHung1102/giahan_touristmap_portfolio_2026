"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BangNoiDung } from "@/components/BangNoiDung";
import { GhimTinh } from "@/components/GhimTinh";
import { NutDieuHuong, NutQuayLai } from "@/components/NutDieuHuong";
import { TheTinh } from "@/components/TheTinh";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { danhSachTinh, hinhDang, noiDungTrang } from "@/data";

type LuaChon = { slug: string; muc: number; con: number };

const { banDo, ghim } = hinhDang;
const { dieuHuong } = noiDungTrang;
// same 1280 line as the CSS
const dangTrang = () => window.matchMedia("(width < 80rem)").matches;
const maBang = (slug: string, ma: string) => `bang-${slug}-${ma}`;
const sauKhiVe = (viec: () => void) => requestAnimationFrame(viec);

// 1280 and up: one screen. Below: the map is a page, an open province another.
export function BanDoVietNam() {
  const [luaChon, datLuaChon] = useState<LuaChon | null>(null);
  const vungBang = useRef<HTMLDivElement>(null);
  const cuonCu = useRef(0);
  const dangMo = luaChon !== null;
  const tinh = danhSachTinh.find((t) => t.slug === luaChon?.slug);

  const dong = useCallback(() => {
    datLuaChon(null);
    if (dangTrang()) sauKhiVe(() => window.scrollTo({ top: cuonCu.current, behavior: "instant" }));
  }, []);

  useEffect(() => {
    if (!dangMo) return;
    const nghePhim = (e: KeyboardEvent) => e.key === "Escape" && dong();
    window.addEventListener("keydown", nghePhim);
    return () => window.removeEventListener("keydown", nghePhim);
  }, [dangMo, dong]);

  // a thin scrollbar's width: panels give up that much right padding
  useEffect(() => {
    const thu = document.createElement("div");
    thu.style.cssText = "position:absolute;visibility:hidden;width:50px;height:50px;overflow:scroll;scrollbar-width:thin";
    document.body.appendChild(thu);
    document.documentElement.style.setProperty("--rong-thanh-cuon", `${thu.offsetWidth - thu.clientWidth}px`);
    thu.remove();
  }, []);

  const cuonToi = (lay: () => Element | null | undefined) =>
    sauKhiVe(() => lay()?.scrollIntoView({ behavior: "smooth", block: "start" }));

  const moTinh = (slug: string) => {
    if (luaChon?.slug === slug) return dong();
    if (dangTrang()) {
      cuonCu.current = window.scrollY;
      sauKhiVe(() => window.scrollTo({ top: 0, behavior: "instant" }));
    }
    datLuaChon({ slug, muc: 0, con: 0 });
  };
  const chonMuc = (muc: number) => {
    if (!tinh || !luaChon) return;
    datLuaChon({ ...luaChon, muc, con: 0 });
    // jump to the content, unless a sub-menu just opened
    if (dangTrang() && !tinh.mucLuc[muc].con) cuonToi(() => vungBang.current);
  };
  const chonCon = (con: number) => {
    if (!tinh || !luaChon) return;
    const muc = tinh.mucLuc[luaChon.muc];
    datLuaChon({ ...luaChon, con });
    if (muc.xepChong) cuonToi(() => document.getElementById(maBang(tinh.slug, muc.con![con].bang.ma)));
    else if (dangTrang()) cuonToi(() => vungBang.current);
  };

  const muc = tinh && luaChon ? tinh.mucLuc[luaChon.muc] : undefined;
  const cacBang = !muc || !luaChon ? [] : muc.bang ? [muc.bang] : muc.xepChong ? muc.con!.map((c) => c.bang) : [muc.con![luaChon.con].bang];

  return (
    <ClickSpark sparkColor={ghim.mau} sparkSize={12} sparkRadius={24} sparkCount={8} duration={450}>
      <main
        data-ban-do
        className="relative mx-auto grid w-full grid-cols-[minmax(0,1fr)] overflow-x-clip xl:block xl:h-dvh xl:overflow-hidden"
        onClick={(e) => !dangTrang() && !(e.target as Element).closest("[data-giu-mo]") && dong()}
      >
        <div className={`relative col-start-1 row-start-1 pb-24 xl:static xl:pb-0 ${dangMo ? "max-xl:hidden" : ""}`}>
          <nav className="relative z-20 flex justify-end gap-10 p-16 xl:absolute xl:top-(--le-doc) xl:right-(--le-ngang) xl:p-0">
            <NutDieuHuong href="/about-us">{dieuHuong.gioiThieu}</NutDieuHuong>
            <NutDieuHuong href="/give-back">{dieuHuong.dongGop}</NutDieuHuong>
          </nav>

          <div
            className={`ti-le-ban-do relative mx-auto w-[calc(var(--px)*1162.95)] xl:absolute xl:top-[calc(var(--le-doc)_+_var(--cao-thanh-tren))] xl:mx-0 xl:transition-[left] xl:duration-500 xl:ease-[cubic-bezier(0.22,1,0.36,1)] ${
              dangMo ? "xl:left-[calc(100%_-_var(--le-ngang)_-_var(--rong-ban-do))]" : "xl:left-[calc(50%_-_var(--rong-ban-do)_/_2)]"
            }`}
            style={{ aspectRatio: `${banDo.rong} / ${banDo.cao}` }}
          >
            <h1 className="sr-only">Rooted Routes Vietnam</h1>
            <Image src={banDo.src} alt="Map of Vietnam" fill priority draggable={false} />
            {danhSachTinh.map((t, i) => (
              <GhimTinh key={t.slug} tinh={t} thuTu={i} dangMo={t.slug === luaChon?.slug} khiBam={() => moTinh(t.slug)} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tinh && luaChon && (
            <motion.div
              key={tinh.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-30 col-start-1 row-start-1 min-w-0 bg-nen p-16 xl:pointer-events-none xl:absolute xl:inset-x-(--le-ngang) xl:inset-y-(--le-doc) xl:bg-transparent xl:p-0"
            >
              <NutQuayLai nhan={dieuHuong.quayLai} khiBam={dong} className="mb-16 text-muc xl:hidden" />

              <div className="flex flex-col items-center gap-16 xl:h-full xl:flex-row xl:items-start xl:gap-10">
                <motion.div
                  data-giu-mo
                  initial={{ opacity: 0, x: -36 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  className="pointer-events-auto flex max-w-full shrink-0 flex-col xl:max-h-full"
                >
                  <TheTinh tinh={tinh} muc={luaChon.muc} con={luaChon.con} chonMuc={chonMuc} chonCon={chonCon} />
                </motion.div>

                <div ref={vungBang} className="w-full min-w-0 max-xl:scroll-mt-16 xl:h-full xl:flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${luaChon.muc}-${muc?.xepChong ? "tat-ca" : luaChon.con}`}
                      // from above: any other way stretches the page for a moment
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      // Travel Prep's two panels scroll as one column
                      className={`flex flex-col items-center gap-19 xl:max-h-full xl:items-start ${
                        muc?.xepChong ? "chua-cho-ban-do khung-cuon pointer-events-auto xl:w-fit" : ""
                      }`}
                    >
                      {cacBang.map((bang) => (
                        <BangNoiDung key={bang.ma} bang={bang} id={maBang(tinh.slug, bang.ma)} cuon={!muc?.xepChong} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ClickSpark>
  );
}
