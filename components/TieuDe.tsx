import BlurText from "@/components/reactbits/BlurText";
import type { Canh } from "@/data";

type Props = {
  chu: string;
  cap?: 1 | 2 | 3;
  canh?: Canh;
  className?: string;
};

const xepHang: Record<Canh, string> = { trai: "justify-start", giua: "justify-center", phai: "justify-end" };

// screen readers get the sentence, not a pile of spans
export function TieuDe({ chu, cap = 2, canh = "trai", className = "" }: Props) {
  const dong = chu.split("\n").map((d) => d.trim()).filter(Boolean);
  return (
    <div role="heading" aria-level={cap} aria-label={dong.join(" ")} className={`chu-tieu-de ${className}`}>
      {dong.map((d, i) => (
        <span key={i} aria-hidden className="block">
          {/* by word, not by letter: letters in separate boxes lose the font's kerning */}
          <BlurText text={d} delay={70} stepDuration={0.3} className={xepHang[canh]} />
        </span>
      ))}
    </div>
  );
}
