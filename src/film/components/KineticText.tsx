import { easeOut, mix, track } from "../timeline";

type Props = {
  /** scene-local time in seconds */
  t: number;
  lines: string[];
  /** seconds at which the first line starts */
  start: number;
  /** stagger between lines */
  stagger?: number;
  /** fade-out window */
  outStart?: number;
  outEnd?: number;
  size?: number;
  weight?: number;
  tracking?: number;
  lineHeight?: number;
  align?: "left" | "center";
  top?: number;
  left?: number;
  right?: number;
  color?: string;
  accentLastWord?: string;
};

export function KineticText({
  t,
  lines,
  start,
  stagger = 0.16,
  outStart,
  outEnd,
  size = 92,
  weight = 700,
  tracking = -1.5,
  lineHeight = 1.08,
  align = "left",
  top = 700,
  left = 96,
  right,
  color = "var(--graphite)",
  accentLastWord,
}: Props) {
  const out =
    outStart !== undefined && outEnd !== undefined
      ? 1 - track(t, outStart, outEnd)
      : 1;

  return (
    <div style={{ position: "relative", width: 1080, height: 0 }}>
    <div
      style={{
        position: "absolute",
        top,
        left: align === "center" ? 0 : left,
        right: align === "center" ? 0 : right,
        width: align === "center" ? 1080 : undefined,
        textAlign: align,
        pointerEvents: "none",
      }}
    >
      {lines.map((line, i) => {
        const p = track(t, start + i * stagger, start + i * stagger + 0.7, easeOut);
        const isAccent = accentLastWord !== undefined && line === accentLastWord;
        return (
          <div
            key={line + i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: size,
              fontWeight: weight,
              letterSpacing: tracking,
              lineHeight,
              color: isAccent ? "var(--green)" : color,
              opacity: p * out,
              transform: `translate3d(0, ${mix(p, 18, 0)}px, 0)`,
              willChange: "transform, opacity",
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
    </div>
  );
}
