// 00:00 — Scene 01 · The First Idea   [sfx: soft ui tick on point-in]
import { KineticText } from "../components/KineticText";
import { NetworkLine } from "../components/NetworkLine";
import { NetworkNode } from "../components/NetworkNode";
import { easeInOut, easeOut, mix, track } from "../timeline";

const PATH = "M540 900 C 540 760, 700 700, 820 640 S 940 470, 900 360";
const LEN = 760;

export function IntroScene({ t }: { t: number }) {
  const pointP = track(t, 0.35, 1.1, easeOut);
  const drawP = track(t, 0.9, 3.4, easeInOut);
  const out = 1 - track(t, 4.5, 5);

  return (
    <g opacity={out}>
      <NetworkLine d={PATH} progress={drawP} length={LEN} width={2.2} />
      <NetworkNode x={540} y={900} progress={pointP} r={mix(pointP, 4, 10)} color="var(--saffron)" />
      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <KineticText
          t={t}
          lines={["EVERYTHING", "STARTS", "WITH AN IDEA."]}
          start={1.5}
          stagger={0.22}
          outStart={4.4}
          outEnd={4.9}
          size={104}
          top={1080}
          left={96}
        />
      </foreignObject>
    </g>
  );
}
