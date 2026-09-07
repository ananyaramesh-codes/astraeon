"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { stars, constellations, type CelestialObject } from "@/lib/astraeon-data"

const EASE = [0.25, 0.1, 0.25, 1] as const

export function CosmicMap({ onSelect }: { onSelect: (o: CelestialObject) => void }) {
  const [zoom, setZoom] = useState(1)
  const [hovered, setHovered] = useState<string | null>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const adjustZoom = (delta: number) =>
    setZoom((z) => Math.min(1.8, Math.max(0.7, +(z + delta).toFixed(2))))

  return (
    <motion.section
      key="map"
      initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
      transition={{ duration: 1.4, ease: EASE }}
      className="relative z-10 h-screen w-full overflow-hidden"
      onWheel={(e) => adjustZoom(e.deltaY < 0 ? 0.06 : -0.06)}
    >
      <div ref={constraintsRef} className="absolute inset-0">
        <motion.div
          drag
          dragConstraints={{ left: -160, right: 160, top: -120, bottom: 120 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.2, timeConstant: 300 }}
          animate={{ scale: zoom }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* faint constellation figure guide lines for Orion */}
          {constellations.map((c) => (
            <ConstellationMarker
              key={c.id}
              obj={c}
              hovered={hovered === c.id}
              onHover={setHovered}
              onSelect={onSelect}
            />
          ))}

          {stars.map((s, i) => (
            <StarMarker
              key={s.id}
              obj={s}
              index={i}
              hovered={hovered === s.id}
              onHover={setHovered}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </div>

      {/* intro caption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="font-serif text-lg italic text-pale-gold/80">Choose a light to follow.</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.35em] text-burnished-bronze">
          Drag to pan · Scroll to zoom
        </p>
      </motion.div>

      {/* zoom controls */}
      <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        <button
          onClick={() => adjustZoom(0.12)}
          aria-label="Zoom in"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-antique-gold/30 bg-cosmic-brown/40 text-pale-gold backdrop-blur-md transition-colors hover:border-stellar-gold/60 hover:text-starlight"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => adjustZoom(-0.12)}
          aria-label="Zoom out"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-antique-gold/30 bg-cosmic-brown/40 text-pale-gold backdrop-blur-md transition-colors hover:border-stellar-gold/60 hover:text-starlight"
        >
          <Minus className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </motion.section>
  )
}

function StarMarker({
  obj,
  index,
  hovered,
  onHover,
  onSelect,
}: {
  obj: (typeof stars)[number]
  index: number
  hovered: boolean
  onHover: (id: string | null) => void
  onSelect: (o: CelestialObject) => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.6 + index * 0.15 }}
      style={{ left: `${obj.map.x}%`, top: `${obj.map.y}%` }}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      onPointerEnter={() => onHover(obj.id)}
      onPointerLeave={() => onHover(null)}
      onClick={() => onSelect(obj)}
      aria-label={`${obj.name} — open story`}
    >
      {/* glow */}
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: hovered ? obj.size * 4 : obj.size * 2.4,
          height: hovered ? obj.size * 4 : obj.size * 2.4,
          opacity: hovered ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          background: `radial-gradient(circle, ${obj.color}55 0%, ${obj.color}00 68%)`,
        }}
      />
      {/* core */}
      <span
        aria-hidden="true"
        className="relative block rounded-full"
        style={{
          width: obj.size / 2.4,
          height: obj.size / 2.4,
          background: obj.color,
          boxShadow: `0 0 12px 2px ${obj.color}aa`,
        }}
      />
      {/* label */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center"
        animate={{ opacity: hovered ? 1 : 0.35, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="block font-sans text-sm tracking-[0.15em] text-starlight">
          {obj.name}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stellar-gold/70">
          {obj.constellation}
        </span>
      </motion.span>
    </motion.button>
  )
}

function ConstellationMarker({
  obj,
  hovered,
  onHover,
  onSelect,
}: {
  obj: (typeof constellations)[number]
  hovered: boolean
  onHover: (id: string | null) => void
  onSelect: (o: CelestialObject) => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay: 1.4 }}
      style={{ left: `${obj.map.x}%`, top: `${obj.map.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      onPointerEnter={() => onHover(obj.id)}
      onPointerLeave={() => onHover(null)}
      onClick={() => onSelect(obj)}
      aria-label={`${obj.name} constellation — open story`}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.55, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative h-32 w-32 sm:h-40 sm:w-40"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          {obj.lines.map(([a, b], i) => (
            <line
              key={i}
              x1={obj.stars[a].sky.x}
              y1={obj.stars[a].sky.y}
              x2={obj.stars[b].sky.x}
              y2={obj.stars[b].sky.y}
              stroke={obj.color}
              strokeWidth={0.5}
              strokeOpacity={hovered ? 0.9 : 0.4}
            />
          ))}
          {obj.stars.map((st, i) => (
            <circle key={i} cx={st.sky.x} cy={st.sky.y} r={1.4} fill="#f4efe5" />
          ))}
        </svg>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-base italic text-pale-gold">
          {obj.name}
        </span>
      </motion.div>
    </motion.button>
  )
}
