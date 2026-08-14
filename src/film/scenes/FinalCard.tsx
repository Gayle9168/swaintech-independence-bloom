// 00:46 — Scene 08 · Final Card   [sfx: soft resolve, hold 2.5s]
import { KineticText } from "../components/KineticText";
import { SvgWordmark } from "../components/SvgWordmark";
import { easeOut, track } from "../timeline";
import { TricolorLine } from "../components/TricolorLine";

export function FinalCard({ t }: { t: number }) {
  const logoP = track(t, 0.15, 1.0, easeOut);
  const ruleP = track(t, 0.9, 1.7, easeOut);

  return (
    <g>
      <SvgWordmark x={540} y={820} progress={logoP} size={76} subProgress={logoP} />
      <TricolorLine x={540} y={950} width={260} progress={ruleP} thickness={5} />
      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <div style={{ position: "relative", width: 1080, height: 1920 }}>
          <KineticText
            t={t}
            lines={["HAPPY INDEPENDENCE DAY"]}
            start={1.1}
            size={54}
            tracking={2}
            align="center"
            top={1030}
          />
          <KineticText
            t={t}
            lines={["15 AUGUST 2026"]}
            start={1.35}
            size={30}
            weight={500}
            tracking={8}
            align="center"
            top={1130}
            color="var(--graphite-soft)"
          />
          <KineticText
            t={t}
            lines={["Everything Under One Roof."]}
            start={1.6}
            size={34}
            weight={600}
            tracking={0}
            align="center"
            top={1250}
            color="var(--brand-orange)"
          />
          <KineticText
            t={t}
            lines={["swaintechsolutions.com"]}
            start={1.9}
            size={26}
            weight={500}
            tracking={4}
            align="center"
            top={1600}
            color="var(--graphite-soft)"
          />
        </div>
      </foreignObject>
    </g>
  );
}
