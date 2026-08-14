// 00:05 — Scene 02 · Connection   [sfx: subtle whoosh + sequential taps]
import { KineticText } from "../components/KineticText";
import { NetworkLine } from "../components/NetworkLine";
import { NetworkNode } from "../components/NetworkNode";
import { clamp, easeInOut, easeOut, mix, track } from "../timeline";

const ORIGIN = { x: 540, y: 760 };

const BRANCHES = [
  { d: "M540 760 C 470 700, 360 690, 268 636", x: 268, y: 636, len: 300 },
  { d: "M540 760 C 620 712, 730 706, 836 660", x: 836, y: 660, len: 320 },
  { d: "M540 760 C 500 862, 420 918, 316 950", x: 316, y: 950, len: 300 },
  { d: "M540 760 C 606 858, 700 902, 800 938", x: 800, y: 938, len: 300 },
  { d: "M540 760 C 544 640, 560 566, 540 470", x: 540, y: 470, len: 300 },
];

export function ConnectionScene({ t }: { t: number }) {
  const out = 1 - track(t, 5.4, 6);
  const expand = mix(track(t, 3.6, 5.4, easeInOut), 1, 1.12);

  return (
    <g opacity={out}>
      <g transform={`translate(${ORIGIN.x} ${ORIGIN.y}) scale(${expand}) translate(${-ORIGIN.x} ${-ORIGIN.y})`}>
        {BRANCHES.map((b, i) => {
          const at = 0.25 + i * 0.42;
          const lineP = track(t, at, at + 0.55, easeOut);
          const nodeP = track(t, at + 0.42, at + 0.9, easeOut);
          const pulse = clamp((t - (at + 0.6)) / 1.1);
          return (
            <g key={i}>
              <NetworkLine d={b.d} progress={lineP} length={b.len} width={2} opacity={0.9} />
              <NetworkNode x={b.x} y={b.y} progress={nodeP} r={11} hollow pulse={pulse} />
            </g>
          );
        })}
        <NetworkNode x={ORIGIN.x} y={ORIGIN.y} progress={1} r={12} color="var(--saffron)" />
      </g>

      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <KineticText
          t={t}
          lines={["AN IDEA", "BECOMES A CONNECTION."]}
          start={1.4}
          stagger={0.2}
          outStart={5.2}
          outEnd={5.7}
          size={78}
          top={1240}
          left={96}
        />
      </foreignObject>
    </g>
  );
}
