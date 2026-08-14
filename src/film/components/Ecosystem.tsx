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

  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <g transform={`rotate(${-rotate})`}>
        <CircularRing cx={0} cy={0} r={r * 0.34} progress={ringP} color="var(--brand-orange)" width={1.2} opacity={0.45} />
      </g>
      <CircularRing cx={0} cy={0} r={r} progress={ringP} color="var(--brand-orange)" width={1.6} />

      {INDUSTRIES.map((ind, i) => {
        // clockwise, starting at 12 o'clock
        const angle = -90 + (360 / count) * i;
        const a = (angle * Math.PI) / 180;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const at = nodesAt + i * nodeStagger;
        const lineP = track(t, at, at + 0.32, easeOut);
        const nodeP = track(t, at + 0.24, at + 0.7, easeOut);
        const pulse = clamp((t - (at + 0.4)) / 0.9);

        const ix = Math.cos(a) * r * 0.36;
        const iy = Math.sin(a) * r * 0.36;
        const len = Math.hypot(x - ix, y - iy);

        return (
          <g key={ind.no}>
            <line
              x1={ix}
              y1={iy}
              x2={x}
              y2={y}
              stroke="var(--brand-orange)"
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - lineP)}
              opacity={0.65}
            />
            <g transform={`rotate(${-rotate} ${x} ${y})`}>
              <IndustryNode
                x={x}
                y={y}
                angle={angle}
                industry={ind}
                progress={nodeP}
                pulse={pulse}
                r={30}
                labelOpacity={labelOpacity * nodeP}
              />
            </g>
          </g>
        );
      })}

      <g transform={`rotate(${-rotate})`}>
        <circle r={r * 0.3} fill="var(--ivory)" opacity={logoP} />
        <SvgWordmark x={0} y={6} progress={logoP} size={34} subProgress={logoP} />
      </g>
    </g>
  );
}
