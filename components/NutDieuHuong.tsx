import Link from "next/link";
import Magnet from "@/components/reactbits/Magnet";
import { hinhDang } from "@/data";

// invisible ::after: 10px more to tap above and below on small screens
const vungCham = "relative after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-[''] lg:after:hidden";

export function NutDieuHuong({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Magnet padding={36} magnetStrength={7}>
      <Link
        href={href}
        className={`chu-tieu-de flex h-40 w-140 items-center justify-center rounded-full border-2 border-xanh text-24 text-xanh transition-colors duration-300 hover:bg-xanh hover:text-nen ${vungCham}`}
      >
        {children}
      </Link>
    </Magnet>
  );
}

const { muiTen } = hinhDang;

type QuayLai = { nhan: string; className?: string } & ({ href: string; khiBam?: never } | { khiBam: () => void; href?: never });

export function NutQuayLai({ nhan, href, khiBam, className = "" }: QuayLai) {
  const ruot = (
    <>
      <svg
        viewBox={`0 0 ${muiTen.rong} ${muiTen.cao}`}
        aria-hidden
        className="h-[calc(var(--px)*20.68)] w-[calc(var(--px)*37.92)] shrink-0 transition-[translate] duration-300 group-hover:-translate-x-6"
      >
        <path d={muiTen.d} fill="currentColor" />
      </svg>
      {nhan}
    </>
  );
  const kieu = `group chu-tieu-de flex w-fit cursor-pointer items-center gap-12 text-35 ${vungCham} ${className}`;
  return href ? (
    <Link href={href} className={kieu}>
      {ruot}
    </Link>
  ) : (
    <button type="button" onClick={khiBam} className={kieu}>
      {ruot}
    </button>
  );
}
