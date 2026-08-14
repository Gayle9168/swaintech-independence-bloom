/**
 * SwainTech Independence Day brand film — master timeline.
 *
 * 30fps · 1080x1920 · 50s (1500 frames)
 *
 * Scene timestamps (for later audio sync):
 *   00:00  Scene 01 — The First Idea        [sfx: soft ui tick]
 *   00:05  Scene 02 — Connection            [sfx: subtle whoosh]
 *   00:11  Scene 03 — SwainTech Ecosystem   [sfx: sequential taps]
 *   00:20  Scene 04 — Everything Under One Roof  [sfx: warm swell]
 *   00:26  Scene 05 — India in Motion       [sfx: rising transform]
 *   00:34  Scene 06 — Progress              [sfx: three low hits]
 *   00:41  Scene 07 — Brand Resolution      [sfx: reverse swell]
 *   00:46  Scene 08 — Final Card            [sfx: soft resolve]
 */

export const FPS = 30;
export const STAGE_W = 1080;
export const STAGE_H = 1920;

export const SCENES = [
  { id: "intro", start: 0, end: 5 },
  { id: "connection", start: 5, end: 11 },
  { id: "ecosystem", start: 11, end: 20 },
  { id: "roof", start: 20, end: 26 },
  { id: "india", start: 26, end: 34 },
  { id: "progress", start: 34, end: 41 },
  { id: "resolution", start: 41, end: 46 },
  { id: "final", start: 46, end: 50 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const DURATION_S = 50;
export const TOTAL_FRAMES = DURATION_S * FPS;

export const clamp = (v: number, min = 0, max = 1) =>
  v < min ? min : v > max ? max : v;

/** Cubic bezier solver (deterministic, no CSS transitions). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const bez = (t: number, a: number, b: number) => {
    const c = 3 * a;
    const bb = 3 * (b - a) - c;
    const aa = 1 - c - bb;
    return ((aa * t + bb) * t + c) * t;
  };
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const cx = bez(t, x1, x2) - x;
      if (Math.abs(cx) < 1e-5) break;
      const d =
        (bez(t + 1e-4, x1, x2) - bez(t - 1e-4, x1, x2)) / 2e-4 || 1e-4;
      t -= cx / d;
    }
    return bez(clamp(t), y1, y2);
  };
}

export const easeOut = cubicBezier(0.16, 1, 0.3, 1);
export const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
export const easeSoft = cubicBezier(0.4, 0, 0.2, 1);

/** Normalised 0..1 progress between two times (seconds), with easing. */
export function track(
  t: number,
  from: number,
  to: number,
  ease: (x: number) => number = easeOut,
) {
  if (to <= from) return t >= to ? 1 : 0;
  return ease(clamp((t - from) / (to - from)));
}

export function mix(p: number, a: number, b: number) {
  return a + (b - a) * p;
}

/** Fade in then out around a hold window. */
export function inOut(
  t: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) {
  return track(t, inStart, inEnd) * (1 - track(t, outStart, outEnd, easeSoft));
}
