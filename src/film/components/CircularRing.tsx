type Props = {
  cx: number;
  cy: number;
  r: number;
  /** 0..1 draw progress */
  progress: number;
  color?: string;
  width?: number;
  opacity?: number;
  dashed?: boolean;
};

export function CircularRing({
  cx,
  cy,
  r,
  progress,
  color = "var(--brand-orange)",
  width = 1.5,
  opacity = 1,
  dashed = false,
}: Props) {
  const c = 2 * Math.PI * r;
  if (dashed) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeDasharray="2 12"
        opacity={opacity * progress}
      />
    );
  }
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeDasharray={c}
      strokeDashoffset={c * (1 - progress)}
      transform={`rotate(-90 ${cx} ${cy})`}
      opacity={opacity}
    />
  );
}
