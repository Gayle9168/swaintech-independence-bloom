// 00:11 — Scene 03 · SwainTech Ecosystem   [sfx: sequential taps per node]
import { Ecosystem } from "../components/Ecosystem";
import { KineticText } from "../components/KineticText";
import { easeOut, mix, track } from "../timeline";

export function IndustryEcosystem({ t }: { t: number }) {
  const zoom = mix(track(t, 0, 8, easeOut), 0.97, 1.02);
  return (
    <g>
      <Ecosystem
        t={t}
        cx={540}
        cy={1010}
        r={250}
        logoAt={0.2}
        ringAt={0.9}
        nodesAt={1.7}
        nodeStagger={0.42}
        scale={zoom}
        labelOpacity={0.95}
      />
      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <KineticText
          t={t}
          lines={["FIFTEEN INDUSTRIES.", "ONE SYSTEM."]}
          start={0.4}
          stagger={0.18}
          outStart={8.4}
          outEnd={8.9}
          size={54}
          tracking={-0.5}
          align="center"
          top={420}
        />
      </foreignObject>
    </g>
  );
}
