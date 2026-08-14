import type { Industry } from "../data/industries";

const PATHS: Record<Industry["icon"], string> = {
  rocket: "M12 3c3 2.2 4.5 5.3 4.5 8.6L12 16 7.5 11.6C7.5 8.3 9 5.2 12 3Z M9.5 16.5 8 20l3-1.2 M14.5 16.5 16 20l-3-1.2",
  grid: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  cap: "M2 8.5 12 4l10 4.5L12 13 2 8.5Z M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5",
  desk: "M3 9h18 M5 9v10 M19 9v10 M8 9V5h8v4 M9 19h6",
  tower: "M6 21V6l6-3 6 3v15 M10 9h4 M10 13h4 M10 17h4",
  chair: "M7 4h10v8H7z M5 12h14 M8 12v8 M16 12v8",
  cross: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z",
  home: "M3 11 12 4l9 7 M6 10v10h12V10 M10 20v-6h4v6",
  cart: "M3 4h3l2.2 10.5h9.6L20 7H7 M9 20a1 1 0 1 0 .01 0 M17 20a1 1 0 1 0 .01 0",
  building: "M4 21V5h9v16 M13 10h7v11 M7 8h3 M7 12h3 M7 16h3 M16 14h2 M16 18h2",
  bag: "M5 8h14l-1.2 12H6.2L5 8Z M9 8V6a3 3 0 0 1 6 0v2",
  coin: "M12 5c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3Z M5 8v8c0 1.7 3 3 7 3s7-1.3 7-3V8",
  truck: "M2 7h11v9H2z M13 10h4l4 3.5V16h-8 M6.5 19a1.6 1.6 0 1 0 .01 0 M17.5 19a1.6 1.6 0 1 0 .01 0",
  flag: "M6 21V4 M6 5h11l-2.2 3.6L17 12H6",
};

export function IndustryIcon({
  icon,
  size = 24,
  color = "var(--brand-orange)",
  opacity = 1,
}: {
  icon: Industry["icon"];
  size?: number;
  color?: string;
  opacity?: number;
}) {
  const s = size / 24;
  return (
    <g transform={`translate(${-size / 2} ${-size / 2}) scale(${s})`} opacity={opacity}>
      <path
        d={PATHS[icon]}
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
