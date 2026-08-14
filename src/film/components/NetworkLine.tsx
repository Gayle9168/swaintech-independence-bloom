type Props = {
  d: string;
  /** 0..1 draw progress */
  progress: number;
  length: number;
  color?: string;
  width?: number;
  opacity?: number;
  dashCap?: "round" | "butt";
};

/** A self-drawing vector line (stroke-dasharray / stroke-dashoffset). */
export function NetworkLine({
  d,
  progress,
  length,
  color = "var(--saffron)",
  width = 2,
  opacity = 1,
  dashCap = "round",
}: Props) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap={dashCap}
      strokeDasharray={length}
      strokeDashoffset={length * (1 - progress)}
      opacity={opacity}
    />
  );
}
