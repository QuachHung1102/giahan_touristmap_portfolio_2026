import type { DoanVan, DongVan } from "@/data";

function Doan({ doan }: { doan: DoanVan }) {
  const chu = doan.dam === undefined ? doan.chu : <span className={doan.dam ? "font-bold" : "font-normal"}>{doan.chu}</span>;
  if (!doan.lienKet) return chu;
  return (
    <a href={doan.lienKet} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">
      {chu}
    </a>
  );
}

const noiDung = (dong: DongVan) => dong.doan.map((doan, i) => <Doan key={i} doan={doan} />);

export function VanBan({ dong, className = "" }: { dong: DongVan[]; className?: string }) {
  const nhom: DongVan[][] = [];
  for (const d of dong) {
    const cuoi = nhom.at(-1);
    if (cuoi && Boolean(cuoi[0].gach) === Boolean(d.gach)) cuoi.push(d);
    else nhom.push([d]);
  }
  return (
    // one long word must not widen a narrow panel
    <div className={`leading-[1.25] wrap-break-word whitespace-pre-wrap ${className}`}>
      {nhom.map((cum, i) =>
        cum[0].gach ? (
          <ul key={i} className="list-disc pl-30">
            {cum.map((d, j) => (
              <li key={j}>{noiDung(d)}</li>
            ))}
          </ul>
        ) : (
          cum.map((d, j) => (
            // an empty line still has to hold its row
            <p key={`${i}-${j}`} className="min-h-[1lh]">
              {noiDung(d)}
            </p>
          ))
        ),
      )}
    </div>
  );
}
