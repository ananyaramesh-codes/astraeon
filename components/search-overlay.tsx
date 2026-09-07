"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { celestialObjects, type CelestialObject } from "@/lib/astraeon-data"

const EASE = [0.25, 0.1, 0.25, 1] as const

function subtitle(o: CelestialObject) {
  return o.type === "star" ? o.constellation + " · Star" : "Constellation"
}

export function SearchOverlay({
  open,
  onClose,
  onSelect,
}: {
  open: boolean
  onClose: () => void
  onSelect: (o: CelestialObject) => void
}) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery("")
      const id = setTimeout(() => inputRef.current?.focus(), 250)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return celestialObjects
    return celestialObjects.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        subtitle(o).toLowerCase().includes(q) ||
        o.designation.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col items-center px-5 pt-28 sm:pt-36"
          style={{ backgroundColor: "rgba(7,7,6,0.82)", backdropFilter: "blur(18px)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Search the universe"
        >
          <button
            onClick={onClose}
            aria-label="Close search"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-antique-gold/30 text-pale-gold transition-colors hover:border-stellar-gold/60 hover:text-starlight"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="w-full max-w-2xl"
          >
            <label className="mb-3 block text-center font-mono text-[11px] uppercase tracking-[0.4em] text-stellar-gold/70">
              Find a story among the stars
            </label>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sirius, Orion, Betelgeuse…"
              className="w-full border-b border-antique-gold/40 bg-transparent pb-4 text-center font-serif text-3xl text-starlight caret-stellar-gold outline-none placeholder:text-burnished-bronze/70 focus:border-stellar-gold sm:text-4xl"
            />

            <div className="mt-8 max-h-[50vh] space-y-1 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {results.map((o, i) => (
                  <motion.button
                    key={o.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                    onClick={() => onSelect(o)}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg border border-transparent px-4 py-4 text-left transition-colors hover:border-antique-gold/30 hover:bg-cosmic-brown/40"
                  >
                    <span>
                      <span className="block font-serif text-xl text-starlight">{o.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-stellar-gold/70">
                        {subtitle(o)}
                      </span>
                    </span>
                    <span className="translate-x-2 font-mono text-xs tracking-widest text-antique-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      ENTER →
                    </span>
                  </motion.button>
                ))}
                {results.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 text-center font-serif text-lg italic text-burnished-bronze"
                  >
                    No stars found in this region of sky.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
