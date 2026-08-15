// 00:46 — Scene 08 · Final Card   [sfx: soft resolve, hold 2.5s]
import { KineticText } from "../components/KineticText";
import { SvgWordmark } from "../components/SvgWordmark";
import { easeOut, mix, track } from "../timeline";
import { TricolorLine } from "../components/TricolorLine";

export function FinalCard({ t }: { t: number }) {
  const logoP = track(t, 0.15, 1.0, easeOut);
  const ruleP = track(t, 0.9, 1.7, easeOut);
  const headP = track(t, 1.15, 2.0, easeOut);
  const dateRuleP = track(t, 1.8, 2.6, easeOut);

  return (
    <g>
      <SvgWordmark x={540} y={760} progress={logoP} size={76} subProgress={logoP} />
      <TricolorLine x={540} y={900} width={260} progress={ruleP} thickness={5} />

      {/* HAPPY */}
      <text
        x={540}
        y={1060}
        textAnchor="middle"
        opacity={headP}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 54,
          fontWeight: 600,
          letterSpacing: 14,
          fill: "var(--graphite-soft)",
        }}
      >
        HAPPY
      </text>

      {/* INDEPENDENCE DAY — saffron + green */}
      <text
        x={540}
        y={1190}
        textAnchor="middle"
        opacity={headP}
        transform={`translate(0 ${mix(headP, 16, 0)})`}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        <tspan fill="var(--brand-orange)">INDEPENDENCE </tspan>
        <tspan fill="var(--green)">DAY</tspan>
      </text>

      {/* date flanked by tricolor rules */}
      <g opacity={dateRuleP}>
        <rect x={160} y={1252} width={140 * dateRuleP} height={3} rx={1.5} fill="var(--brand-orange)" />
        <circle cx={320} cy={1253.5} r={5} fill="var(--brand-orange)" opacity={dateRuleP} />
        <rect x={780 - 140 * dateRuleP + 140 * dateRuleP - 140 * dateRuleP} y={1252} width={140 * dateRuleP} height={3} rx={1.5} fill="var(--green)" />
        <circle cx={760} cy={1253.5} r={5} fill="var(--green)" opacity={dateRuleP} />
      </g>
      <text
        x={540}
        y={1266}
        textAnchor="middle"
        opacity={dateRuleP}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: 8,
          fill: "var(--graphite-soft)",
        }}
      >
        15 AUGUST 2026
      </text>

      <TricolorLine x={540} y={1360} width={420} progress={track(t, 2.2, 3.0, easeOut)} thickness={4} />

      <foreignObject x={0} y={0} width={1080} height={1920} style={{ pointerEvents: "none" }}>
        <div style={{ position: "relative", width: 1080, height: 1920 }}>
          <KineticText
            t={t}
            lines={["Everything Under One Roof."]}
            start={2.5}
            size={38}
            weight={600}
            tracking={0}
            align="center"
            top={1440}
            color="var(--brand-orange)"
          />
          <KineticText
            t={t}
            lines={["Proud to build with India."]}
            start={2.8}
            size={34}
            weight={500}
            tracking={0}
            align="center"
            top={1540}
            color="var(--graphite)"
          />
          <KineticText
            t={t}
            lines={["swaintechsolutions.com"]}
            start={3.1}
            size={26}
            weight={500}
            tracking={4}
            align="center"
            top={1640}
            color="var(--graphite-soft)"
          />
        </div>
      </foreignObject>
    </g>
  );
}
