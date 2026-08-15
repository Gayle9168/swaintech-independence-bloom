import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useFilmClock } from "../film/useFilmClock";
import { DURATION_S, SCENES, STAGE_H, STAGE_W } from "../film/timeline";
import { IntroScene } from "../film/scenes/IntroScene";
import { ConnectionScene } from "../film/scenes/ConnectionScene";
import { IndustryEcosystem } from "../film/scenes/IndustryEcosystem";
import { EverythingUnderRoof } from "../film/scenes/EverythingUnderRoof";
import { IndiaTransformation } from "../film/scenes/IndiaTransformation";
import { ProgressScene } from "../film/scenes/ProgressScene";
import { BrandResolution } from "../film/scenes/BrandResolution";
import { FinalCard } from "../film/scenes/FinalCard";
import { TricolorField } from "../film/components/TricolorField";

export const Route = createFileRoute("/")({
  component: Film,
  head: () => ({
    meta: [
      { title: "SwainTech Solutions — One Nation. Infinite Possibilities." },
      {
        name: "description",
        content:
          "A 50-second vertical Independence Day brand film for SwainTech Solutions: one idea becomes a connection, a network, an ecosystem of 15 industries.",
      },
      { property: "og:title", content: "SwainTech Solutions — One Nation. Infinite Possibilities." },
      {
        property: "og:description",
        content:
          "Independence Day 2026 motion film. Everything Under One Roof — SwainTech Solutions.",
      },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/** Scales the fixed 1080x1920 composition to fit the viewport. */
function useStageScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / STAGE_W, height / STAGE_H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, scale };
}

function Film() {
  const { frame, time, replay } = useFilmClock();
  const { ref, scale } = useStageScale();

  const scene = SCENES.find((s) => time >= s.start && time < s.end) ?? SCENES[SCENES.length - 1]!;
  const local = time - scene.start;
  const done = time >= DURATION_S;

  return (
    <main
      ref={ref}
      className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-ivory"
    >
      <h1 className="sr-only">
        SwainTech Solutions — One Nation. Infinite Possibilities. Independence Day 2026.
      </h1>

      <div
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          backgroundColor: "var(--ivory)",
          overflow: "hidden",
        }}
      >
        <svg
          width={STAGE_W}
          height={STAGE_H}
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          style={{ display: "block", backgroundColor: "var(--ivory)" }}
        >
          {/* very subtle warm field — never flat white, never dark */}
          <defs>
            <radialGradient id="field" cx="50%" cy="38%" r="72%">
              <stop offset="0%" stopColor="var(--white)" />
              <stop offset="100%" stopColor="var(--ivory)" />
            </radialGradient>
          </defs>
          <rect width={STAGE_W} height={STAGE_H} fill="url(#field)" />

          {/* ambient tricolor ribbons, present through the whole film */}
          <TricolorField opacity={0.85} />

          {scene.id === "intro" && <IntroScene t={local} />}
          {scene.id === "connection" && <ConnectionScene t={local} />}
          {scene.id === "ecosystem" && <IndustryEcosystem t={local} />}
          {scene.id === "roof" && <EverythingUnderRoof t={local} />}
          {scene.id === "india" && <IndiaTransformation t={local} />}
          {scene.id === "progress" && <ProgressScene t={local} />}
          {scene.id === "resolution" && <BrandResolution t={local} />}
          {scene.id === "final" && <FinalCard t={local} />}
        </svg>
      </div>

      {/* development-only replay affordance — not part of the composition */}
      {import.meta.env.DEV && (
        <button
          onClick={replay}
          className="absolute bottom-4 right-4 rounded-full border border-brand-orange/40 bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-graphite"
        >
          {done ? "Replay" : `${(frame / 30).toFixed(1)}s`}
        </button>
      )}
    </main>
  );
}
