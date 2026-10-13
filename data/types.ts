export type DoanVan = { chu: string; dam?: boolean; lienKet?: string };
export type DongVan = { gach?: true; doan: DoanVan[] };
export type Canh = "trai" | "giua" | "phai";

// cat: Figma's crop, in percent of the frame
export type Anh = {
  src: string;
  rong: number;
  cao: number;
  moTa: string;
  cat?: { rong: number; cao: number; trai: number; tren: number };
};

export type Khoi =
  | { kieu: "tieuDe"; chu: string; canh: Canh; rong?: number; motDong?: true; co?: number }
  | { kieu: "vanBan"; dong: DongVan[]; canh: Canh; dam?: true; om?: true; rong?: number; co?: number; gian?: number }
  | ({ kieu: "anh" } & Anh)
  | { kieu: "nhom"; khoi: Khoi[] }
  | { kieu: "ke" };

export type Bang = { ma: string; rong: number; khoangCach: number; khoi: Khoi[] };
// rong: the label wraps at this width. gon: the row hugs its text.
export type MucCon = { nhan: string; bang: Bang; rong?: number; gon?: true };
// xepChong: show every child panel at once (Travel Prep does this)
export type Muc = { nhan: string; bang?: Bang; con?: MucCon[]; xepChong?: true };

export type ToaDo = { x: number; y: number };
export type Tinh = {
  slug: string;
  ten: string;
  tenDayDu: string;
  nhan: string;
  ghim: ToaDo;
  nhanViTri: ToaDo;
  anhBia: Anh[];
  mucLuc: Muc[];
};

export type HinhVe = { rong: number; cao: number; d: string; chan: boolean; mau?: string };
export type HinhDang = {
  ghim: HinhVe & { mau: string };
  muiTen: HinhVe;
  banDo: { src: string; rong: number; cao: number; x: number; y: number; khungRong: number; khungCao: number };
};

export type DoanCoTieuDe = { tieuDe: string; doan: DongVan[] };
export type NoiDungTrang = {
  dieuHuong: { gioiThieu: string; dongGop: string; quayLai: string };
  gioiThieu: {
    cauChuyen: { tieuDe: string; anh: Anh; doan: DongVan[][] };
    suMenh: { tieuDe: string; tamNhin: DoanCoTieuDe; anh: Anh[]; nhiemVu: DoanCoTieuDe; anhLon: Anh };
    nguon: { tieuDe: string; doan: DongVan[][]; anh: Anh[] };
  };
  dongGop: { nen: Anh; tieuDe: string; khauHieu: string; doan: DongVan[]; maQr: Anh; camOn: string };
};
