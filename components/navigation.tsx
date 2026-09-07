"use client"

import { motion } from "motion/react"
import { Search, Map } from "lucide-react"

type Props = {
  location: string
  onSearch: () => void
  onMap: () => void
  showBack: boolean
  onBack: () => void
}

const EASE = [0.25, 0.1, 0.25, 1] as const

export function Navigation({ location, onSearch, onMap, showBack, onBack }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8">
        <button
          onClick={onMap}
          className="group flex items-baseline gap-2 text-left"
          aria-label="ASTRAEON — return to the cosmic map"
        >
          <span className="font-serif text-lg tracking-[0.35em] text-starlight sm:text-xl">
            ASTRAEON
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <span className="h-px w-8 bg-antique-gold/50" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-stellar-gold/80">
            {location}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-full border border-antique-gold/30 bg-cosmic-brown/40 px-4 py-2 text-xs tracking-widest text-pale-gold backdrop-blur-md transition-colors hover:border-stellar-gold/60 hover:text-starlight"
            >
              <Map className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">MAP</span>
            </button>
          ) : null}
          <button
            onClick={onSearch}
            aria-label="Search the universe"
            className="flex items-center gap-2 rounded-full border border-antique-gold/30 bg-cosmic-brown/40 px-4 py-2 text-xs tracking-widest text-pale-gold backdrop-blur-md transition-colors hover:border-stellar-gold/60 hover:text-starlight"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">SEARCH</span>
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
