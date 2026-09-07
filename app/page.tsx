"use client"

import { useCallback, useMemo, useState } from "react"
import { AnimatePresence } from "motion/react"
import { CosmicBackground } from "@/components/cosmic-background"
import { Navigation } from "@/components/navigation"
import { SearchOverlay } from "@/components/search-overlay"
import { CinematicOpening } from "@/components/cinematic-opening"
import { CosmicMap } from "@/components/cosmic-map"
import { StarStory } from "@/components/star-story"
import { ConstellationStory } from "@/components/constellation-story"
import type { CelestialObject } from "@/lib/astraeon-data"

type Stage = "opening" | "map" | "story"

export default function Page() {
  const [stage, setStage] = useState<Stage>("opening")
  const [selected, setSelected] = useState<CelestialObject | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const openObject = useCallback((o: CelestialObject) => {
    setSelected(o)
    setStage("story")
    setSearchOpen(false)
    window.scrollTo({ top: 0 })
  }, [])

  const goToMap = useCallback(() => {
    setStage("map")
    setSelected(null)
    window.scrollTo({ top: 0 })
  }, [])

  const location = useMemo(() => {
    if (stage === "opening") return "Uncharted"
    if (stage === "story" && selected) {
      return selected.type === "star" ? selected.constellation : selected.name
    }
    return "Cosmic Map"
  }, [stage, selected])

  // background darkens further when reading a story
  const overlay = stage === "story" ? 0.66 : stage === "opening" ? 0.52 : 0.44

  return (
    <>
      <CosmicBackground overlay={overlay} />

      {stage !== "opening" ? (
        <Navigation
          location={location}
          onSearch={() => setSearchOpen(true)}
          onMap={goToMap}
          showBack={stage === "story"}
          onBack={goToMap}
        />
      ) : null}

      <main className="relative">
        <AnimatePresence mode="wait">
          {stage === "opening" ? (
            <CinematicOpening key="opening" onEnter={() => setStage("map")} />
          ) : null}

          {stage === "map" ? <CosmicMap key="map" onSelect={openObject} /> : null}

          {stage === "story" && selected ? (
            selected.type === "star" ? (
              <StarStory key={selected.id} star={selected} />
            ) : (
              <ConstellationStory key={selected.id} constellation={selected} />
            )
          ) : null}
        </AnimatePresence>
      </main>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={openObject}
      />
    </>
  )
}
