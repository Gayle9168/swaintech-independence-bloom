/** Ambient tricolor ribbon field — saffron top-left, green bottom-right. */
type Props = {
  /** 0..1 reveal */
  progress?: number;
  opacity?: number;
};

const SAFFRON_WAVES = Array.from({ length: 9 });
const GREEN_WAVES = Array.from({ length: 9 });

export function TricolorField({ progress = 1, opacity = 1 }: Props) {
  return (
    <g opacity={opacity * progress} style={{ pointerEvents: "none" }}>
      {SAFFRON_WAVES.map((_, i) => {
        const o = i * 17;
        return (
          <path
            key={`s${i}`}
            d={`M-40 ${120 + o} C 220 ${40 + o}, 430 ${250 + o}, 700 ${168 + o} S 1010 ${
              40 + o
            }, 1130 ${96 + o}`}
            fill="none"
            stroke={i % 3 === 0 ? "var(--brand-orange)" : "var(--saffron)"}
            strokeWidth={i % 3 === 0 ? 2.2 : 1.1}
            opacity={0.5 - i * 0.045}
          />
        );
      })}
      {GREEN_WAVES.map((_, i) => {
        const o = i * 17;
        return (
          <path
            key={`g${i}`}
            d={`M-40 ${1740 - o} C 240 ${1830 - o}, 430 ${1630 - o}, 700 ${1712 - o} S 1000 ${
              1840 - o
            }, 1130 ${1776 - o}`}
            fill="none"
            stroke="var(--green)"
            strokeWidth={i % 3 === 0 ? 2.2 : 1.1}
            opacity={0.42 - i * 0.04}
          />
        );
      })}
      {/* quiet corner dot-grids, echoing the reference sheet */}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => (
          <circle
            key={`d${r}-${c}`}
            cx={928 + c * 22}
            cy={1250 + r * 22}
            r={2.1}
            fill="var(--saffron)"
            opacity={0.22}
          />
        )),
      )}
    </g>
  );
}
