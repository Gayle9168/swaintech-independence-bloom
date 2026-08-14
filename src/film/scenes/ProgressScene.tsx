// 00:34 — Scene 06 · Progress   [sfx: three low hits]
import { ChakraGeometry } from "../components/ChakraGeometry";
import { KineticText } from "../components/KineticText";
import { easeOut, inOut, mix, track } from "../timeline";

const PHRASES = [
  { text: "WE BUILD.", at: 1.0, color: "var(--saffron)" },
  { text: "WE INNOVATE.", at: 2.9, color: "var(--saffron)" },
  { text: "WE GROW.", at: 4.8, color: "var(--green)" },
];

export function ProgressScene({ t }: { t: number }) {
  const dissolve = track(t, 0, 1.4);
  const out = 1 - track(t, 6.5, 7);

  return (
    <g opacity={out}>
      <ChakraGeometry
        cx={540}
        cy={960}
        r={330}
        t={t + 4}
        start={-4}
        end={-1}
        tricolor={1}
        dissolve={dissolve}
        opacity={1 - dissolve}
      />
      {PHRASES.map((p, i) => {
        const vis = inOut(t, p.at, p.at + 0.6, p.at + 1.35, p.at + 1.8);
        const lineP = track(t, p.at + 0.35, p.at + 1.0, easeOut);
        return (
          <g key={i} opacity={vis}>
            <rect
              x={540 - mix(lineP, 0, 220)}
              y={1032}
              width={mix(lineP, 0, 440)}
              height={4}
              rx={2}
              fill={p.color}
            />
          </g>
        );
      })}
      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <div style={{ position: "relative", width: 1080, height: 1920 }}>
          {PHRASES.map((p, i) => (
            <div key={i} style={{ opacity: inOut(t, p.at, p.at + 0.6, p.at + 1.35, p.at + 1.8) }}>
              <KineticText
                t={t}
                lines={[p.text]}
                start={p.at}
                size={116}
                tracking={-2}
                align="center"
                top={880}
              />
            </div>
          ))}
        </div>
      </foreignObject>
    </g>
  );
}
