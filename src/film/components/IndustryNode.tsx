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
}: Props) {
  const scale = 0.85 + 0.15 * progress;
  const rightSide = Math.cos((angle * Math.PI) / 180) >= -0.05;
  const labelX = rightSide ? r + 16 : -(r + 16);
  const anchor = rightSide ? "start" : "end";

  return (
    <g opacity={progress}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        {pulse > 0 && pulse < 1 && (
          <circle
            r={r + pulse * 26}
            fill="none"
            stroke="var(--brand-orange)"
            strokeWidth={1.2}
            opacity={(1 - pulse) * 0.5}
          />
        )}
        <circle r={r} fill="var(--white)" stroke="var(--brand-orange)" strokeWidth={1.6} />
        <IndustryIcon icon={industry.icon} size={30} />
        <text
          y={r + 2}
          x={0}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 1,
            fill: "var(--brand-orange)",
          }}
          dy={16}
          opacity={0}
        >
          {industry.no}
        </text>
      </g>
      <g transform={`translate(${x} ${y})`} opacity={labelOpacity}>
        <text
          x={labelX}
          y={-4}
          textAnchor={anchor}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2.4,
            fill: "var(--brand-orange)",
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
