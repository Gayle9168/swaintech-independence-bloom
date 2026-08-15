import { INDUSTRIES } from "../data/industries";
import { clamp, easeOut, track } from "../timeline";
import { CircularRing } from "./CircularRing";
import { IndustryNode } from "./IndustryNode";
import { SvgWordmark } from "./SvgWordmark";

type Props = {
  /** scene-local time in seconds */
  t: number;
  cx: number;
  cy: number;
  r: number;
  /** when the logo appears */
  logoAt: number;
  /** when the ring starts drawing */
  ringAt: number;
  /** when the first spoke/node starts */
  nodesAt: number;
  /** seconds between nodes */
  nodeStagger?: number;
  /** slow breathing rotation in degrees */
  rotate?: number;
  scale?: number;
  opacity?: number;
  labelOpacity?: number;
};

/** Half-circle arc path (saffron left / green right, as in the identity sheet). */
function halfArc(r: number, a0: number, a1: number) {
  const p = (a: number) => [
    Math.cos((a * Math.PI) / 180) * r,
    Math.sin((a * Math.PI) / 180) * r,
  ];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
}

export function Ecosystem({
  t,
  cx,
  cy,
  r,
  logoAt,
  ringAt,
  nodesAt,
  nodeStagger = 0.28,
  rotate = 0,
  scale = 1,
  opacity = 1,
  labelOpacity = 1,
}: Props) {
  const count = INDUSTRIES.length;
  const logoP = track(t, logoAt, logoAt + 0.9, easeOut);
  const ringP = track(t, ringAt, ringAt + 1.3, easeOut);
  const arcLen = Math.PI * r * 0.62;

  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <g transform={`rotate(${-rotate})`}>
        <CircularRing
          cx={0}
          cy={0}
          r={r * 0.34}
          progress={ringP}
          color="var(--saffron)"
          width={1.2}
          opacity={0.4}
        />
      </g>

      {/* tricolor ring: saffron sweeping the left, green the right */}
      <path
        d={halfArc(r * 0.62, 92, 268)}
        fill="none"
        stroke="var(--brand-orange)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeDasharray={arcLen}
        strokeDashoffset={arcLen * (1 - ringP)}
        opacity={0.95}
      />
      <path
        d={halfArc(r * 0.62, -88, 88)}
        fill="none"
        stroke="var(--green)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeDasharray={arcLen}
        strokeDashoffset={arcLen * (1 - ringP)}
        opacity={0.95}
      />
      <CircularRing cx={0} cy={0} r={r} progress={ringP} color="var(--saffron)" width={1.2} opacity={0.5} />

      {INDUSTRIES.map((ind, i) => {
        // clockwise, starting at 12 o'clock
        const angle = -90 + (360 / count) * i;
        const a = (angle * Math.PI) / 180;
        const accent = Math.cos(a) >= 0 ? "var(--green)" : "var(--brand-orange)";
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const at = nodesAt + i * nodeStagger;
        const lineP = track(t, at, at + 0.32, easeOut);
        const nodeP = track(t, at + 0.24, at + 0.7, easeOut);
        const pulse = clamp((t - (at + 0.4)) / 0.9);

        const ix = Math.cos(a) * r * 0.66;
        const iy = Math.sin(a) * r * 0.66;
        const len = Math.hypot(x - ix, y - iy);

        return (
          <g key={ind.no}>
            <line
              x1={ix}
              y1={iy}
              x2={x}
              y2={y}
              stroke={accent}
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - lineP)}
              opacity={0.6}
            />
            <circle cx={ix} cy={iy} r={5} fill="var(--white)" stroke={accent} strokeWidth={1.6} opacity={lineP} />
            <g transform={`rotate(${-rotate} ${x} ${y})`}>
              <IndustryNode
                x={x}
                y={y}
                angle={angle}
                industry={ind}
                progress={nodeP}
                pulse={pulse}
                r={30}
                accent={accent}
                labelOpacity={labelOpacity * nodeP}
              />
            </g>
          </g>
        );
      })}

      <g transform={`rotate(${-rotate})`}>
        <circle r={r * 0.55} fill="var(--white)" opacity={logoP} />
        <circle r={r * 0.55} fill="none" stroke="var(--stone)" strokeWidth={1.2} opacity={logoP} />
        <SvgWordmark x={0} y={0} progress={logoP} size={26} subProgress={logoP} />
      </g>
    </g>
  );
}
