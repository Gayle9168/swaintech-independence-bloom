import type { Industry } from "../data/industries";
import { IndustryIcon } from "./IndustryIcon";

type Props = {
  x: number;
  y: number;
  angle: number;
  industry: Industry;
  /** 0..1 appearance */
  progress: number;
  /** 0..1 activation pulse */
  pulse?: number;
  r?: number;
  labelOpacity?: number;
  /** tricolor accent for this node */
  accent?: string;
};

export function IndustryNode({
  x,
  y,
  angle,
  industry,
  progress,
  pulse = 0,
  r = 38,
  labelOpacity = 1,
  accent = "var(--saffron)",
}: Props) {
  const scale = 0.85 + 0.15 * progress;
  const a = (angle * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  // labels radiate outward along the spoke so neighbours never collide
  const off = r + 18;
  const labelX = cos * off;
  const labelY = sin * off;
  const anchor: "start" | "middle" | "end" =
    Math.abs(cos) < 0.28 ? "middle" : cos > 0 ? "start" : "end";
  const rightSide = anchor === "start";

  return (
    <g opacity={progress}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        {pulse > 0 && pulse < 1 && (
          <circle
            r={r + pulse * 26}
            fill="none"
            stroke={accent}
            strokeWidth={1.2}
            opacity={(1 - pulse) * 0.5}
          />
        )}
        <circle r={r} fill="var(--white)" stroke={accent} strokeWidth={1.6} />
        <IndustryIcon icon={industry.icon} size={30} />
      </g>
      <g transform={`translate(${x + labelX} ${y + labelY})`} opacity={labelOpacity}>
        <circle
          cx={anchor === "middle" ? 0 : rightSide ? 9 : -9}
          cy={-9}
          r={11}
          fill={accent}
          opacity={0.14}
        />
        <text
          x={0}
          y={-4}
          textAnchor={anchor}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2.4,
            fill: accent,
          }}
        >
          {industry.no}
        </text>
        <text
          x={labelX}
          y={18}
          textAnchor={anchor}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 0.6,
            fill: "var(--graphite)",
          }}
        >
          {industry.label}
        </text>
      </g>
    </g>
  );
}
