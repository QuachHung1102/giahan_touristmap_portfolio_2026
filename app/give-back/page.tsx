import type { Metadata } from "next";
import Image from "next/image";
import { AnhGoc } from "@/components/AnhGoc";
import { HienDan } from "@/components/HienDan";
import { NutQuayLai } from "@/components/NutDieuHuong";
import { TieuDe } from "@/components/TieuDe";
import { VanBan } from "@/components/VanBan";
import { noiDungTrang } from "@/data";

export const metadata: Metadata = { title: "Give Back | Rooted Routes Vietnam" };

const { dongGop, dieuHuong } = noiDungTrang;
const bang = "bg-xanh px-20 py-14 text-center font-bold text-white";

export default function TrangDongGop() {
  return (
    <main className="khung-1440 relative isolate flex min-h-dvh flex-col items-center overflow-hidden px-16 pt-24 pb-60 text-white lg:px-0 lg:pt-52 lg:pb-[calc(var(--px)*91.6)]">
      {/* the campfire photo eases back while you read; the dark veil is the design's 40% black */}
      <Image src={dongGop.nen.src} alt="" fill priority draggable={false} className="-z-20 animate-phong-nen object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/40" />

      <NutQuayLai nhan={dieuHuong.quayLai} href="/" className="self-start lg:ml-100" />

      <TieuDe chu={dongGop.tieuDe} cap={1} canh="giua" theo="letters" className="mt-20 text-65" />

      <HienDan tre={0.15} className="mt-14 w-820 max-w-full">
        <p className={`${bang} text-30 leading-[1.27]`}>{dongGop.khauHieu}</p>
      </HienDan>

      <HienDan tre={0.3} className="mt-[calc(var(--px)*28.3)] w-820 max-w-full">
        <VanBan dong={dongGop.doan} className="text-center text-20" />
      </HienDan>

      <HienDan tre={0.45} className="mt-[calc(var(--px)*25.3)]">
        <div className="bg-white px-18 py-19">
          <AnhGoc anh={dongGop.maQr} className="w-[calc(var(--px)*227.5)]" />
        </div>
      </HienDan>

      <HienDan tre={0.6} className="mt-24">
        <p className={`${bang} w-[calc(var(--px)*379.6)] max-w-full text-20 leading-[1.25]`}>{dongGop.camOn}</p>
      </HienDan>
    </main>
  );
}
