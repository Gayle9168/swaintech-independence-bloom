import { clamp, easeInOut, easeOut, mix, track } from "../timeline";

const SPOKES = 24;

type Props = {
  cx: number;
  cy: number;
  r: number;
  /** scene-local time in seconds */
  t: number;
  /** when spokes start / finish assembling */
  start: number;
  end: number;
  /** 0..1 tricolor transition amount */
  tricolor: number;
  /** 0..1 dissolve amount (spokes fly outward and fade) */
  dissolve?: number;
  opacity?: number;
};

function spokeColor(i: number, amount: number) {
  // saffron -> navy -> green distributed by band, faded in by `amount`
  const band = i % 3;
  const target =
    band === 0 ? "var(--saffron)" : band === 1 ? "var(--navy)" : "var(--green)";
  return amount > 0.5 ? target : "var(--brand-orange)";
}

function arcPath(r: number, a0: number, a1: number) {
  const p = (a: number) => [
    Math.cos((a * Math.PI) / 180) * r,
    Math.sin((a * Math.PI) / 180) * r,
  ];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
}

/** Abstract 24-spoke radial geometry — precise, not a literal emblem. */
export function ChakraGeometry({
  cx,
  cy,
  r,
  t,
  start,
  end,
  tricolor,
  dissolve = 0,
  opacity = 1,
}: Props) {
  const spin = track(t, start, end + 2.2, easeInOut);
  const ringP = track(t, start, start + 1.2);
  const innerP = track(t, start + 0.4, start + 1.6);

  return (
    <g
      opacity={opacity * (1 - dissolve * 0.9)}
      transform={`translate(${cx} ${cy}) rotate(${mix(spin, -22, 8)}) scale(${mix(
        spin,
        0.92,
        1,
      )})`}
    >
      <circle
        r={r}
        fill="none"
        stroke="var(--navy)"
        strokeWidth={1.4}
        strokeDasharray={2 * Math.PI * r}
        strokeDashoffset={2 * Math.PI * r * (1 - ringP)}
        transform="rotate(-90)"
        opacity={0.5}
      />
      {/* tricolor halo arcs, saffron sweeping in from the left, green from the right */}
      <path
        d={arcPath(r * 1.16, 128, 250)}
        fill="none"
        stroke="var(--brand-orange)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={Math.PI * r * 1.16 * 0.68}
        strokeDashoffset={Math.PI * r * 1.16 * 0.68 * (1 - ringP)}
        opacity={tricolor}
      />
      <path
        d={arcPath(r * 1.16, -70, 52)}
        fill="none"
        stroke="var(--green)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={Math.PI * r * 1.16 * 0.68}
        strokeDashoffset={Math.PI * r * 1.16 * 0.68 * (1 - ringP)}
        opacity={tricolor}
      />
      <circle
        r={r * 0.16}
        fill="none"
        stroke="var(--saffron)"
        strokeWidth={2}
        opacity={innerP}
      />
      {Array.from({ length: SPOKES }).map((_, i) => {
        const a = (i / SPOKES) * Math.PI * 2;
        const step = start + 0.25 + (i / SPOKES) * 1.5;
        const p = track(t, step, step + 0.5, easeOut);
        const push = dissolve * (60 + (i % 5) * 26);
        const x1 = Math.cos(a) * (r * 0.16 + push);
        const y1 = Math.sin(a) * (r * 0.16 + push);
        const x2 = Math.cos(a) * (r + push);
        const y2 = Math.sin(a) * (r + push);
        const len = Math.hypot(x2 - x1, y2 - y1);
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={spokeColor(i, tricolor)}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - p)}
              opacity={clamp(p) * (1 - dissolve)}
            />
            <circle
              cx={x2}
              cy={y2}
              r={3.4}
              fill={spokeColor(i, tricolor)}
              opacity={clamp(p) * (1 - dissolve)}
            />
          </g>
        );
      })}
    </g>
  );
}
