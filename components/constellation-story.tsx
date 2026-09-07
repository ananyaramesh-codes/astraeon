"use client"

import { type ReactNode, useMemo, useState } from "react"
import { motion } from "motion/react"
import type { ConstellationData } from "@/lib/astraeon-data"

const EASE = [0.25, 0.1, 0.25, 1] as const

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="h-px w-10 bg-antique-gold/60" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-stellar-gold">
        {children}
      </span>
    </div>
  )
}

export function ConstellationStory({ constellation }: { constellation: ConstellationData }) {
  const [actual, setActual] = useState(false)
  const c = constellation

  // precompute the "actual distances" layout: spread along depth by light-years
  const layout = useMemo(() => {
    const lys = c.stars.map((s) => s.lightYears)
    const min = Math.min(...lys)
    const max = Math.max(...lys)
    return c.stars.map((s) => {
      const depth = (s.lightYears - min) / (max - min || 1) // 0 = near, 1 = far
      return {
        actual: {
          x: 14 + depth * 72,
          y: s.sky.y * 0.7 + 15,
        },
        // nearer stars read larger / brighter
        scale: 1.6 - depth * 1.05,
        opacity: 1 - depth * 0.55,
        depth,
      }
    })
  }, [c.stars])

  return (
    <motion.article
      key={c.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: EASE }}
      className="relative z-10 mx-auto max-w-4xl px-6 pb-40 pt-32 sm:px-10"
    >
      <header className="flex min-h-[60vh] flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-stellar-gold/80"
        >
          Constellation
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
          className="mt-4 font-serif text-6xl text-starlight sm:text-8xl"
        >
          {c.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
          className="mt-6 max-w-xl text-balance font-serif text-xl italic text-pale-gold"
        >
          {c.tagline}
        </motion.p>
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-antique-gold/25 pt-10 sm:grid-cols-3"
        >
          <Fact label="Designation" value={c.designation} mono />
          <Fact label="Spread" value={c.distance} />
          <Fact label="Meaning" value={c.meaning} />
        </motion.dl>
      </header>

      {/* THE FIGURE + TOGGLE */}
      <section className="mt-16">
        <Reveal>
          <SectionLabel>The Figure</SectionLabel>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3 rounded-full border border-antique-gold/25 bg-cosmic-brown/30 p-1.5 backdrop-blur-md">
            <ToggleButton active={!actual} onClick={() => setActual(false)}>
              As Seen From Earth
            </ToggleButton>
            <ToggleButton active={actual} onClick={() => setActual(true)}>
              Actual Distances
            </ToggleButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-xl border border-antique-gold/20 bg-void/40 backdrop-blur-sm">
            <svg viewBox="0 0 100 100" className="h-[70vw] max-h-[560px] w-full">
              {/* figure lines — present as seen from Earth, dissolving in actual view */}
              {c.lines.map(([a, b], i) => {
                const sa = c.stars[a]
                const sb = c.stars[b]
                return (
                  <motion.line
                    key={i}
                    x1={sa.sky.x}
                    y1={sa.sky.y}
                    x2={sb.sky.x}
                    y2={sb.sky.y}
                    stroke={c.color}
                    strokeWidth={0.4}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: actual ? 0 : 0.85,
                    }}
                    transition={{
                      pathLength: { duration: 1.4, ease: EASE, delay: 0.2 + i * 0.15 },
                      opacity: { duration: 0.8, ease: EASE },
                    }}
                  />
                )
              })}

              {/* stars */}
              {c.stars.map((s, i) => {
                const l = layout[i]
                return (
                  <g key={i}>
                    <motion.circle
                      animate={{
                        cx: actual ? l.actual.x : s.sky.x,
                        cy: actual ? l.actual.y : s.sky.y,
                        r: actual ? 1.4 * l.scale : 1.4,
                        opacity: actual ? l.opacity : 1,
                      }}
                      transition={{ duration: 1.6, ease: EASE }}
                      fill="#f4efe5"
                      style={{ filter: "drop-shadow(0 0 2px #d5ba93)" }}
                    />
                    <motion.text
                      animate={{
                        x: actual ? l.actual.x : s.sky.x,
                        y: (actual ? l.actual.y : s.sky.y) + 5,
                        opacity: actual ? l.opacity : 0.85,
                      }}
                      transition={{ duration: 1.6, ease: EASE }}
                      textAnchor="middle"
                      className="font-sans"
                      fill="#d5ba93"
                      style={{ fontSize: "2.6px", letterSpacing: "0.1px" }}
                    >
                      {s.name}
                    </motion.text>
                    {actual ? (
                      <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ x: l.actual.x, y: l.actual.y + 8, opacity: l.opacity }}
                        transition={{ duration: 1.6, ease: EASE }}
                        textAnchor="middle"
                        fill="#755b3f"
                        style={{ fontSize: "2px" }}
                      >
                        {s.lightYears} ly
                      </motion.text>
                    ) : null}
                  </g>
                )
              })}
            </svg>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
              <motion.p
                key={actual ? "a" : "b"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-pretty text-sm leading-relaxed text-starlight/70"
              >
                {actual
                  ? "Freed from our vantage point, the hunter scatters — these stars span over a thousand light-years and share nothing but our line of sight."
                  : "From Earth, seven distant suns align into a single figure that has been read as a hunter for thousands of years."}
              </motion.p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ITS STORY */}
      <section className="mt-28">
        <Reveal>
          <SectionLabel>Its Story</SectionLabel>
        </Reveal>
        <div className="space-y-10">
          {c.story.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={
                  i === 0
                    ? "text-balance font-serif text-2xl leading-relaxed text-starlight sm:text-3xl"
                    : "max-w-2xl text-pretty text-base leading-relaxed text-starlight/70 sm:text-lg"
                }
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONNECTIONS */}
      <section className="mt-28">
        <Reveal>
          <SectionLabel>Its Connections</SectionLabel>
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-3">
          {c.connections.map((conn, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <li className="h-full border-l border-antique-gold/30 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stellar-gold/70">
                  {conn.kind}
                </p>
                <p className="mt-1 font-serif text-lg text-starlight">{conn.label}</p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-starlight/60">
                  {conn.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </motion.article>
  )
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] transition-colors"
      style={{ color: active ? "#070706" : "#d5ba93" }}
    >
      {active ? (
        <motion.span
          layoutId="constellation-toggle"
          className="absolute inset-0 rounded-full bg-stellar-gold"
          transition={{ duration: 0.6, ease: EASE }}
        />
      ) : null}
      <span className="relative">{children}</span>
    </button>
  )
}

function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-stellar-gold/70">
        {label}
      </dt>
      <dd className={`mt-2 text-sm text-starlight ${mono ? "font-mono" : "font-sans"}`}>{value}</dd>
    </div>
  )
}
