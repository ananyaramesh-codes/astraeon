"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import type { StarData } from "@/lib/astraeon-data"

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

export function StarStory({ star }: { star: StarData }) {
  return (
    <motion.article
      key={star.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: EASE }}
      className="relative z-10 mx-auto max-w-4xl px-6 pb-40 pt-32 sm:px-10"
    >
      {/* THE STAR */}
      <header className="min-h-[70vh] flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-stellar-gold/80"
        >
          {star.constellation}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
          className="mt-4 font-serif text-6xl text-starlight sm:text-8xl"
        >
          {star.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
          className="mt-6 max-w-lg text-balance font-serif text-xl italic text-pale-gold"
        >
          {star.tagline}
        </motion.p>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-antique-gold/25 pt-10 sm:grid-cols-4"
        >
          <Fact label="Designation" value={star.designation} mono />
          <Fact label="Distance" value={star.distance} />
          <Fact label="Magnitude" value={star.magnitude} />
          <Fact label="Spectral type" value={star.spectralType} />
        </motion.dl>
        <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-burnished-bronze">
          RA/DEC · {star.coordinates}
        </p>
      </header>

      {/* ITS STORY */}
      <section className="mt-24">
        <Reveal>
          <SectionLabel>Its Story</SectionLabel>
        </Reveal>
        <div className="space-y-10">
          {star.story.map((para, i) => (
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

      {/* ITS LIFE */}
      <section className="mt-32">
        <Reveal>
          <SectionLabel>Its Life</SectionLabel>
        </Reveal>
        <ol className="relative">
          <span
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-antique-gold/60 via-antique-gold/25 to-transparent"
            aria-hidden="true"
          />
          {star.life.map((phase, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <li className="relative mb-9 pl-10">
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border"
                  style={{
                    borderColor: phase.active ? star.color : "#755b3f",
                    background: phase.active ? star.color : "transparent",
                    boxShadow: phase.active ? `0 0 12px 2px ${star.color}aa` : "none",
                  }}
                  aria-hidden="true"
                />
                <h3
                  className="font-serif text-xl"
                  style={{ color: phase.active ? star.color : "#f4efe5" }}
                >
                  {phase.label}
                  {phase.active ? (
                    <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.3em] text-stellar-gold">
                      now
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-starlight/60">
                  {phase.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ITS CONNECTIONS */}
      <section className="mt-32">
        <Reveal>
          <SectionLabel>Its Connections</SectionLabel>
        </Reveal>
        <Reveal>
          <ConnectionGraph star={star} />
        </Reveal>
      </section>
    </motion.article>
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

function ConnectionGraph({ star }: { star: StarData }) {
  const nodes = star.connections
  const radius = 130
  const cx = 160
  const cy = 160

  const positions = nodes.map((_, i) => {
    const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
  })

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
      <div className="relative mx-auto h-[320px] w-[320px]">
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full overflow-visible">
          {positions.map((p, i) => (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke={star.color}
              strokeWidth={0.75}
              strokeOpacity={0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.15 }}
            />
          ))}
        </svg>
        {/* center */}
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center"
          style={{
            background: `radial-gradient(circle, ${star.color}44, ${star.color}00 70%)`,
          }}
        >
          <span
            className="h-4 w-4 rounded-full"
            style={{ background: star.color, boxShadow: `0 0 16px 3px ${star.color}` }}
          />
        </div>
        {positions.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 + i * 0.15 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: p.x, top: p.y }}
          >
            <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-pale-gold" />
            <span className="mt-2 block whitespace-nowrap text-center font-sans text-xs tracking-wide text-starlight">
              {nodes[i].label}
            </span>
          </motion.div>
        ))}
      </div>

      <ul className="space-y-5">
        {nodes.map((c, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <li className="border-l border-antique-gold/30 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stellar-gold/70">
                {c.kind}
              </p>
              <p className="mt-1 font-serif text-lg text-starlight">{c.label}</p>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-starlight/60">
                {c.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
