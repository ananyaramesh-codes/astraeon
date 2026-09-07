"use client"

import { useEffect, useRef, useState } from "react"

type Star = {
  x: number
  y: number
  r: number
  baseAlpha: number
  twinkle: number
  speed: number
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

/**
 * The foundational atmosphere: a fixed, slowly breathing star-chart plate with a
 * canvas particle field of tiny stars and drifting golden dust layered over it,
 * plus a faint radial glow that follows the pointer.
 */
export function CosmicBackground({ overlay = 0.5 }: { overlay?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: -1000, y: -1000, active: false })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let stars: Star[] = []
    let particles: Particle[] = []
    let raf = 0
    let t = 0

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const starCount = Math.round((width * height) / 2600)
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
      }))

      const particleCount = Math.round((width * height) / 26000)
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.3) * 0.18,
        vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.35 + 0.05,
      }))
    }

    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, width, height)

      // tiny stars
      for (const s of stars) {
        const flicker = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * s.speed + s.twinkle)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 239, 229, ${s.baseAlpha * flicker})`
        ctx.fill()
      }

      // golden drifting dust
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x > width + 10) p.x = -10
          if (p.x < -10) p.x = width + 10
          if (p.y > height + 10) p.y = -10
          if (p.y < -10) p.y = height + 10
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(162, 129, 87, ${p.alpha})`
        ctx.fill()
      }

      // pointer illumination — gently brightens dust near the cursor
      if (pointer.current.active) {
        const { x, y } = pointer.current
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 220)
        grad.addColorStop(0, "rgba(162, 129, 87, 0.12)")
        grad.addColorStop(0.5, "rgba(117, 91, 63, 0.05)")
        grad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = grad
        ctx.fillRect(x - 220, y - 220, 440, 440)
      }

      raf = requestAnimationFrame(draw)
    }

    build()
    draw()

    const onResize = () => build()
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onLeave = () => {
      pointer.current.active = false
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [reduced])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      {/* breathing star-chart plate */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${reduced ? "" : "animate-breathe"}`}
        style={{ backgroundImage: "url(/cosmos.png)" }}
        aria-hidden="true"
      />
      {/* particle + dust field */}
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      {/* dynamic darkening overlay */}
      <div
        className="absolute inset-0 transition-[background-color] duration-1000"
        style={{ backgroundColor: `rgba(7, 7, 6, ${overlay})` }}
        aria-hidden="true"
      />
      {/* vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 40%, transparent 40%, rgba(7,7,6,0.55) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  )
}
