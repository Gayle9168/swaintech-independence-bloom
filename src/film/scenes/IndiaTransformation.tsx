// 00:26 — Scene 05 · India in Motion   [sfx: rising transform]
import { ChakraGeometry } from "../components/ChakraGeometry";
import { KineticText } from "../components/KineticText";
import { inOut, track } from "../timeline";

export function IndiaTransformation({ t }: { t: number }) {
  const tricolor = track(t, 1.6, 3.4);
  const out = 1 - track(t, 7.5, 8);

  return (
    <g opacity={out}>
      <ChakraGeometry cx={540} cy={960} r={330} t={t} start={0.1} end={3.2} tricolor={tricolor} />
      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <div style={{ position: "relative", width: 1080, height: 1920 }}>
          <div style={{ opacity: inOut(t, 3.4, 4.1, 5.0, 5.5) }}>
            <KineticText
              t={t}
              lines={["DIFFERENT DREAMS."]}
              start={3.4}
              size={78}
              align="center"
              top={1470}
            />
          </div>
          <div style={{ opacity: inOut(t, 5.6, 6.2, 7.4, 7.9) }}>
            <KineticText
              t={t}
              lines={["ONE SPIRIT."]}
              start={5.6}
              size={92}
              align="center"
              top={1460}
            />
          </div>
        </div>
      </foreignObject>
    </g>
  );
}
