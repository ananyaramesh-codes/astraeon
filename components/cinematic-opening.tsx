"use client"

import { motion } from "motion/react"

const EASE = [0.25, 0.1, 0.25, 1] as const

export function CinematicOpening({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section
      key="opening"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      exit={{ opacity: 0, scale: 1.25, filter: "blur(12px)" }}
      transition={{ duration: 1.6, ease: EASE }}
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
        className="mb-8 font-mono text-[11px] uppercase tracking-[0.5em] text-stellar-gold/70"
      >
        An immersive astronomy experience
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: EASE, delay: 0.7 }}
        className="font-serif text-[2.6rem] tracking-[0.1em] text-starlight sm:text-8xl sm:tracking-[0.18em] lg:text-[9rem]"
      >
        ASTRAEON
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1.4 }}
        className="mt-8 max-w-xl text-balance font-serif text-xl italic text-pale-gold sm:text-2xl"
      >
        A universe you fly through.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1.8 }}
        className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-starlight/60 sm:text-base"
      >
        Every star&apos;s a story. Every constellation&apos;s a connection.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 2.4 }}
        onClick={onEnter}
        className="group mt-14 flex items-center gap-4 rounded-full border border-antique-gold/40 bg-cosmic-brown/30 px-8 py-4 backdrop-blur-md transition-all duration-700 hover:border-stellar-gold hover:bg-cosmic-brown/60"
      >
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-pale-gold transition-colors group-hover:text-starlight">
          Enter the universe
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-stellar-gold transition-all duration-700 group-hover:scale-150 group-hover:bg-pale-gold" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.35em] text-burnished-bronze"
      >
        Scroll · Hover · Drift
      </motion.div>
    </motion.section>
  )
}
