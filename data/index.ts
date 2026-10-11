import duLieuTinh from "./provinces.json";
import duLieuTrang from "./pages.json";
import duLieuHinh from "./shapes.json";
import type { HinhDang, NoiDungTrang, Tinh } from "./types";

// JSON can't promise literal types, so we vouch for it here
export const danhSachTinh = duLieuTinh as unknown as Tinh[];
export const noiDungTrang = duLieuTrang as unknown as NoiDungTrang;
export const hinhDang = duLieuHinh as unknown as HinhDang;

export type * from "./types";
