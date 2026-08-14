import { useCallback, useEffect, useRef, useState } from "react";
import { DURATION_S, FPS } from "./timeline";

/**
 * Frame-accurate playback clock. Plays once from 0 to the last frame,
 * then stops. No user interaction required.
 */
export function useFilmClock() {
  const [frame, setFrame] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    startRef.current = null;
    const total = DURATION_S * FPS;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      const f = Math.min(total, Math.round(elapsed * FPS));
      setFrame(f);
      if (f < total) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [runId]);

  const replay = useCallback(() => {
    setFrame(0);
    setRunId((r) => r + 1);
  }, []);

  return { frame, time: frame / FPS, replay };
}
