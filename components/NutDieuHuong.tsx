import Link from "next/link";
import Magnet from "@/components/reactbits/Magnet";
import { hinhDang } from "@/data";

// Scaled down on a phone these controls end up ~30px tall. The invisible ::after adds 10px above and below,
// so a thumb still lands on them without the design changing.
const vungCham = "relative after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-[''] lg:after:hidden";

// The two outlined pills in the corner. They lean toward the cursor a little, like they want to be picked.
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

// "← Back". A link on the pages, a plain button when it only has to close an open province.
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
