import type { Metadata } from "next";
import { AnhGoc } from "@/components/AnhGoc";
import { HienDan } from "@/components/HienDan";
import { NutQuayLai } from "@/components/NutDieuHuong";
import { TieuDe } from "@/components/TieuDe";
import { VanBan } from "@/components/VanBan";
import { noiDungTrang, type DoanCoTieuDe } from "@/data";

export const metadata: Metadata = { title: "About Us | Rooted Routes Vietnam" };

const { gioiThieu, dieuHuong } = noiDungTrang;
const { cauChuyen, suMenh, nguon } = gioiThieu;

// Big blue heading on the left, the story on the right. On phones they just stack.
function Phan({ tieuDe, children }: { tieuDe: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-20 lg:grid-cols-[calc(var(--px)*420)_calc(var(--px)*820)] lg:gap-0">
      <TieuDe chu={tieuDe} theo="letters" className="text-65" />
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

// The small heading sits on the paragraph's first line; Figma left a run of spaces for it, so we keep them.
function DoanMoDau({ noiDung }: { noiDung: DoanCoTieuDe }) {
  return (
    <HienDan className="relative pt-11">
      <TieuDe chu={noiDung.tieuDe} cap={3} className="absolute top-0 left-0 text-40" />
      <VanBan dong={noiDung.doan} className="text-20" />
    </HienDan>
  );
}

const haiCot = "grid gap-20 md:grid-cols-2";

export default function TrangGioiThieu() {
  return (
    <main className="khung-1440 mx-auto flex min-h-dvh w-full max-w-852 flex-col px-16 pt-24 pb-60 lg:max-w-[1440px] lg:px-100 lg:pt-52 lg:pb-[calc(var(--px)*89.5)]">
      <NutQuayLai nhan={dieuHuong.quayLai} href="/" className="text-muc" />

      <div className="mt-[calc(var(--px)*32.5)] flex flex-col gap-60 lg:gap-90">
        <Phan tieuDe={cauChuyen.tieuDe}>
          <div className={haiCot}>
            <HienDan>
              <AnhGoc anh={cauChuyen.anh} uuTien />
            </HienDan>
            <HienDan tre={0.1}>
              <VanBan dong={cauChuyen.doan[0]} className="text-20" />
            </HienDan>
          </div>
          <HienDan className="mt-22">
            <VanBan dong={cauChuyen.doan[1]} className="text-20" />
          </HienDan>
        </Phan>

        <Phan tieuDe={suMenh.tieuDe}>
          <DoanMoDau noiDung={suMenh.tamNhin} />
          <div className="mt-22 grid gap-[calc(var(--px)*11.5)] md:grid-cols-2">
            {suMenh.anh.map((anh, i) => (
              <HienDan key={anh.src} tre={i * 0.1}>
                <AnhGoc anh={anh} />
              </HienDan>
            ))}
          </div>
          <div className="mt-46">
            <DoanMoDau noiDung={suMenh.nhiemVu} />
          </div>
          <HienDan className="mt-17">
            <AnhGoc anh={suMenh.anhLon} />
          </HienDan>
        </Phan>

        <Phan tieuDe={nguon.tieuDe}>
          <div className={haiCot}>
            <HienDan>
              <VanBan dong={nguon.doan[0]} className="text-20" />
            </HienDan>
            <HienDan tre={0.1}>
              <AnhGoc anh={nguon.anh[0]} />
            </HienDan>
          </div>
          {/* photo first here, the design zig-zags */}
          <div className={`${haiCot} mt-21`}>
            <HienDan>
              <AnhGoc anh={nguon.anh[1]} />
            </HienDan>
            <HienDan tre={0.1}>
              <VanBan dong={nguon.doan[1]} className="text-20" />
            </HienDan>
          </div>
        </Phan>
      </div>
    </main>
  );
}
