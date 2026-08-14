type Props = {
  x: number;
  y: number;
  /** 0..1 appearance progress */
  progress: number;
  r?: number;
  color?: string;
  hollow?: boolean;
  /** 0..1 activation pulse */
  pulse?: number;
};

export function NetworkNode({
  x,
  y,
  progress,
  r = 9,
  color = "var(--brand-orange)",
  hollow = false,
  pulse = 0,
}: Props) {
  const s = 0.85 + 0.15 * progress;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={progress}>
      {pulse > 0 && pulse < 1 && (
        <circle
          r={r + pulse * 22}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={(1 - pulse) * 0.55}
        />
      )}
      <circle
        r={r}
        fill={hollow ? "var(--ivory)" : color}
        stroke={color}
        strokeWidth={hollow ? 2.5 : 0}
      />
    </g>
  );
}
