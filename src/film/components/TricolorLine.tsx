type Props = {
  x: number;
  y: number;
  width: number;
  /** 0..1 draw */
  progress: number;
  thickness?: number;
};

/** Minimal saffron / white / green rule motif. */
export function TricolorLine({ x, y, width, progress, thickness = 4 }: Props) {
  const seg = width / 3;
  const w = width * progress;
  const parts = [
    { c: "var(--saffron)", off: 0 },
    { c: "var(--stone)", off: seg },
    { c: "var(--green)", off: seg * 2 },
  ];
  return (
    <g transform={`translate(${x - width / 2} ${y})`}>
      {parts.map((p, i) => {
        const visible = Math.max(0, Math.min(seg, w - p.off));
        return (
          <rect
            key={i}
            x={p.off}
            y={0}
            width={visible}
            height={thickness}
            fill={p.c}
            rx={thickness / 2}
          />
        );
      })}
    </g>
  );
}
