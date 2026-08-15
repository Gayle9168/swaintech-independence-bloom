// 00:20 — Scene 04 · Everything Under One Roof   [sfx: warm swell]
import { Ecosystem } from "../components/Ecosystem";
import { KineticText } from "../components/KineticText";
import { easeInOut, mix, track } from "../timeline";

export function EverythingUnderRoof({ t }: { t: number }) {
  // fully connected system, gently breathing
  const breathe = 1 + Math.sin(t * 0.7) * 0.012;
  const rot = mix(track(t, 0, 6, easeInOut), 0, 4);
  const shift = mix(track(t, 0, 1.4, easeInOut), 0, -70);
  const fade = 1 - track(t, 5.5, 6);

  return (
    <g opacity={fade}>
      <Ecosystem
        t={t + 12}
        cx={540}
        cy={1120 + shift}
        r={240}
        logoAt={-10}
        ringAt={-10}
        nodesAt={-10}
        rotate={rot}
        scale={breathe}
        labelOpacity={0.3}
      />
      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <KineticText
          t={t}
          lines={["EVERYTHING", "UNDER ONE ROOF."]}
          start={0.5}
          stagger={0.22}
          outStart={5.3}
          outEnd={5.8}
          size={96}
          align="center"
          top={380}
        />
      </foreignObject>
    </g>
  );
}
