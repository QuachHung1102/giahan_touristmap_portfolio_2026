import BlurText from "@/components/reactbits/BlurText";
import type { Canh } from "@/data";

type Props = {
  chu: string;
  cap?: 1 | 2 | 3;
  canh?: Canh;
  theo?: "words" | "letters";
  className?: string;
};

const xepHang: Record<Canh, string> = { trai: "justify-start", giua: "justify-center", phai: "justify-end" };

// A heading that drifts into focus. Screen readers get the plain sentence, not a pile of spans.
export function TieuDe({ chu, cap = 2, canh = "trai", theo = "words", className = "" }: Props) {
  // NFC first, or splitting by letter would tear the accents off
  const dong = chu.normalize("NFC").split("\n").map((d) => d.trim()).filter(Boolean);
  return (
    <div role="heading" aria-level={cap} aria-label={dong.join(" ")} className={`chu-tieu-de ${className}`}>
      {dong.map((d, i) => (
        <span key={i} aria-hidden className="block">
          <BlurText
            text={d}
            animateBy={theo}
            delay={theo === "letters" ? 45 : 70}
            stepDuration={0.3}
            className={xepHang[canh]}
          />
        </span>
      ))}
    </div>
  );
}
