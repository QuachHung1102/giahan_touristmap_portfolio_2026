import { hinhDang } from "@/data";

const { ghim } = hinhDang;
const XANH = "#003dc2"; // same blue as the site; CSS variables don't reach the image renderer

// The map pin on the brand blue. Drawn once here, baked into PNGs by app/icon.tsx and app/apple-icon.tsx.
export function BieuTuong({ kichThuoc, boGoc = true }: { kichThuoc: number; boGoc?: boolean }) {
  const cao = kichThuoc * 0.66;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: XANH,
        borderRadius: boGoc ? kichThuoc * 0.22 : 0,
      }}
    >
      <svg width={(cao * ghim.rong) / ghim.cao} height={cao} viewBox={`0 0 ${ghim.rong} ${ghim.cao}`}>
        <path d={ghim.d} fill={ghim.mau} fillRule={ghim.chan ? "evenodd" : "nonzero"} />
      </svg>
    </div>
  );
}
