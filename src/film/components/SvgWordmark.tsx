type Props = {
  x: number;
  y: number;
  /** 0..1 reveal */
  progress: number;
  size?: number;
  showSub?: boolean;
  subProgress?: number;
};

/**
 * Wordmark-only lockup (no invented symbol mark).
 * Swap this component for the supplied SwainTech artwork when available.
 */
export function SvgWordmark({
  x,
  y,
  progress,
  size = 46,
  showSub = true,
  subProgress = 1,
}: Props) {
  const w = size * 6.4;
  return (
    <g transform={`translate(${x} ${y})`} opacity={progress}>
      <text
        textAnchor="middle"
        y={0}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: size,
          fontWeight: 800,
          letterSpacing: size * 0.06,
          fill: "var(--graphite)",
        }}
      >
        SWAINTECH
      </text>
      <circle cx={w / 2 + size * 0.22} cy={-size * 0.08} r={size * 0.11} fill="var(--brand-orange)" />
      <rect
        x={-w * 0.36 * progress}
        y={size * 0.34}
        width={w * 0.72 * progress}
        height={2.5}
        fill="var(--brand-orange)"
      />
      {showSub && (
        <text
          textAnchor="middle"
          y={size * 1.15}
          opacity={subProgress}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: size * 0.32,
            fontWeight: 500,
            letterSpacing: size * 0.16,
            fill: "var(--graphite-soft)",
          }}
        >
          SOLUTIONS
        </text>
      )}
    </g>
  );
}
