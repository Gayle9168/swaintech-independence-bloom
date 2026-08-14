// 00:41 — Scene 07 · Brand Resolution   [sfx: reverse swell settling]
import { KineticText } from "../components/KineticText";
import { SvgWordmark } from "../components/SvgWordmark";
import { easeInOut, easeOut, mix, track } from "../timeline";

const RAYS = Array.from({ length: 18 });

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [
    cx + Math.cos((a * Math.PI) / 180) * r,
    cy + Math.sin((a * Math.PI) / 180) * r,
  ];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
}

export function BrandResolution({ t }: { t: number }) {
  const converge = track(t, 0, 1.8, easeInOut);
  const logoP = track(t, 1.4, 2.4, easeOut);
  const arcP = track(t, 1.9, 3.2, easeOut);
  const out = 1 - track(t, 4.5, 5);

  return (
    <g opacity={out}>
      {RAYS.map((_, i) => {
        const a = (i / RAYS.length) * Math.PI * 2;
        const d = mix(converge, 620, 230);
        const x = 540 + Math.cos(a) * d;
        const y = 900 + Math.sin(a) * d;
        const x2 = 540 + Math.cos(a) * (d + mix(converge, 130, 26));
        const y2 = 900 + Math.sin(a) * (d + mix(converge, 130, 26));
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke={i % 3 === 2 ? "var(--green)" : "var(--saffron)"}
            strokeWidth={1.6}
            strokeLinecap="round"
            opacity={(1 - converge) * 0.85}
          />
        );
      })}

      <path d={arc(540, 900, 250, 150, 300)} fill="none" stroke="var(--saffron)" strokeWidth={3}
        strokeLinecap="round" strokeDasharray={660} strokeDashoffset={660 * (1 - arcP)} />
      <path d={arc(540, 900, 250, -30, 120)} fill="none" stroke="var(--green)" strokeWidth={3}
        strokeLinecap="round" strokeDasharray={660} strokeDashoffset={660 * (1 - arcP)} />

      <SvgWordmark x={540} y={900} progress={logoP} size={62} subProgress={logoP} />

      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <KineticText
          t={t}
          lines={["ONE NATION.", "INFINITE POSSIBILITIES."]}
          start={2.6}
          stagger={0.2}
          outStart={4.4}
          outEnd={4.9}
          size={72}
          align="center"
          top={1330}
        />
      </foreignObject>
    </g>
  );
}
