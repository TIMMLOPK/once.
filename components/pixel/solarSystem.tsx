'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/cn'

export interface Planet {
  id: string
  label: string
  href: string
  onClick?: () => void
  orbit: number // orbit x-radius at scale 1
  radius: number
  speed: number // rad/s
  phase: number // starting angle
  ring?: boolean
  moon?: boolean
  color?: { light: string; dark: string } // 'r,g,b'
}

interface SolarSystemProps {
  planets: Planet[]
  sunSrc?: string
  activeId?: string | null
  onActiveChange?: (id: string | null) => void
  onSunHover?: (hovered: boolean) => void
  onSunClick?: (center: { x: number; y: number }) => void // viewport coords
  sunClickLabel?: string
  sunLabel?: ReactNode // shown under the sun
  hint?: ReactNode // shown at the bottom until a planet is hovered
  className?: string
}

const BASE_RADIUS = 1.2
const SUN_RADIUS = 66
const MIN_PLANET_RADIUS = 12
const SUN_SAMPLE = 128 // px, resolution the sun image is sampled at
const MIN_TILT = 0.42 // orbit y-radius / x-radius
const MAX_TILT = 0.8
const MOUSE_RADIUS = 90
const SPARKLE_LIFE = 1400 // ms
const MAX_SPARKLES = 14
const SPARKLE_EVERY = 220 // ms between twinkles
const SHOOTING_TAIL = 10 // dots
const DESIGN_WIDTH = 740

interface Body {
  x: number
  y: number
  r: number
  depth: number
  kind: 'sun' | 'planet' | 'moon' | 'ring'
  planet?: number
  // ring only
  rx?: number
  ry?: number
}

interface Sparkle {
  c: number
  r: number
  start: number
  big: boolean
}

interface ShootingStar {
  x: number
  y: number
  vx: number // px/ms
  vy: number
  start: number
  life: number
}

interface Ripple {
  x: number
  y: number
  start: number
}

export function SolarSystem({
  planets,
  sunSrc,
  activeId = null,
  onActiveChange,
  onSunHover,
  onSunClick,
  sunClickLabel = 'Sun',
  sunLabel,
  hint,
  className
}: SolarSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const sunButtonRef = useRef<HTMLButtonElement>(null)
  const sunLabelRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  // latest props for the animation loop, which is set up once
  const themeRef = useRef(resolvedTheme)
  const externalActiveRef = useRef(activeId)
  const onActiveChangeRef = useRef(onActiveChange)
  const onSunHoverRef = useRef(onSunHover)
  const planetsRef = useRef(planets)
  const sunImageRef = useRef<Uint8ClampedArray | null>(null)
  const hoveredRef = useRef<string | null>(null)
  const focusedRef = useRef<string | null>(null)

  useEffect(() => {
    themeRef.current = resolvedTheme
    externalActiveRef.current = activeId
    onActiveChangeRef.current = onActiveChange
    onSunHoverRef.current = onSunHover
    planetsRef.current = planets
  })

  useEffect(() => {
    if (!sunSrc) return
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = SUN_SAMPLE
      canvas.height = SUN_SAMPLE
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, SUN_SAMPLE, SUN_SAMPLE)
      sunImageRef.current = ctx.getImageData(0, 0, SUN_SAMPLE, SUN_SAMPLE).data
    }
    img.src = sunSrc
    return () => {
      cancelled = true
    }
  }, [sunSrc])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!container || !canvas || !ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let offsetX = 0
    let offsetY = 0
    let spacing = 8
    let scale = 1
    let tilt = MIN_TILT
    let sunWasHovered = false
    let frame = 0
    let visible = true
    let lastTime = performance.now()
    let speedFactor = 1
    const startTime = lastTime
    const angles = planetsRef.current.map(p => p.phase)
    // last frame's planet hit circles, for cursor hit-testing
    const hits = planetsRef.current.map(() => ({ x: 0, y: 0, r: 0, depth: 0 }))
    const grow = planetsRef.current.map(() => 0)
    const mouse = { x: -9999, y: -9999, active: false }
    const ripples: Ripple[] = []
    const sparkles: Sparkle[] = []
    let nextSparkle = 1200 // after the intro
    let shooting: ShootingStar | null = null
    let nextShooting = 3000 + Math.random() * 3000
    // cell index -> sparkle intensity, rebuilt every frame
    const glow = new Map<number, number>()

    const vignette = (c: number, r: number) =>
      Math.min(
        Math.max(
          (1 -
            Math.hypot(
              (c - cols / 2) / (cols / 2),
              (r - rows / 2) / (rows / 2)
            )) *
            2.5,
          0
        ),
        1
      )

    const addGlow = (c: number, r: number, value: number) => {
      if (c < 0 || r < 0 || c >= cols || r >= rows || value <= 0) return
      const k = r * cols + c
      glow.set(k, Math.max(glow.get(k) ?? 0, value))
    }

    const updateSparkles = (t: number) => {
      glow.clear()
      if (reduceMotion) return

      // twinkles scattered across the visible part of the grid
      if (t > nextSparkle && sparkles.length < MAX_SPARKLES) {
        nextSparkle = t + SPARKLE_EVERY * (0.5 + Math.random())
        for (let tries = 0; tries < 5; tries++) {
          const c = Math.floor(Math.random() * cols)
          const r = Math.floor(Math.random() * rows)
          if (vignette(c, r) > 0.35) {
            sparkles.push({ c, r, start: t, big: Math.random() < 0.3 })
            break
          }
        }
      }
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        const age = (t - s.start) / SPARKLE_LIFE
        if (age >= 1) {
          sparkles.splice(i, 1)
          continue
        }
        if (age < 0) continue
        const env = Math.sin(Math.PI * age)
        // four-point star: bright core, fading arms
        addGlow(s.c, s.r, env)
        for (const [dc, dr] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1]
        ]) {
          addGlow(s.c + dc, s.r + dr, env * 0.55)
          if (s.big) addGlow(s.c + dc * 2, s.r + dr * 2, env * 0.22)
        }
      }

      // the occasional shooting star
      if (!shooting && t > nextShooting) {
        const fromLeft = Math.random() < 0.5
        const speed = 0.9 + Math.random() * 0.5
        const angle = 0.25 + Math.random() * 0.35
        shooting = {
          x: fromLeft ? width * 0.1 : width * 0.9,
          y: height * (0.1 + Math.random() * 0.3),
          vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
          vy: Math.sin(angle) * speed,
          start: t,
          life: 700 + Math.random() * 400
        }
      }
      if (shooting) {
        const age = (t - shooting.start) / shooting.life
        if (age >= 1) {
          shooting = null
          nextShooting = t + 5000 + Math.random() * 5000
        } else {
          const elapsed = t - shooting.start
          const hx = shooting.x + shooting.vx * elapsed
          const hy = shooting.y + shooting.vy * elapsed
          const len = Math.hypot(shooting.vx, shooting.vy)
          const env = Math.sin(Math.PI * age)
          for (let i = 0; i < SHOOTING_TAIL; i++) {
            const px = hx - (shooting.vx / len) * i * spacing
            const py = hy - (shooting.vy / len) * i * spacing
            addGlow(
              Math.round((px - offsetX) / spacing),
              Math.round((py - offsetY) / spacing),
              env * (1 - i / SHOOTING_TAIL)
            )
          }
        }
      }
    }

    const layout = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      spacing = width < 640 ? 6 : 9
      cols = Math.floor(width / spacing)
      rows = Math.floor(height / spacing)
      offsetX = (width - (cols - 1) * spacing) / 2
      offsetY = (height - (rows - 1) * spacing) / 2
      // view orbits more from above on tall (portrait) screens
      tilt = Math.min(Math.max((height / width) * MIN_TILT, MIN_TILT), MAX_TILT)
      const outer = Math.max(...planetsRef.current.map(p => p.orbit))
      scale = Math.min(
        width / DESIGN_WIDTH,
        height / (outer * 2 * tilt + 90),
        2
      )
    }

    const draw = (now: number) => {
      const t = now - startTime
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const list = planetsRef.current
      const cx = width / 2
      const cy = height / 2
      const sunR = SUN_RADIUS * scale
      const overSun =
        mouse.active && Math.hypot(mouse.x - cx, mouse.y - cy) < sunR

      // hit-test the cursor every frame: planets move under a still cursor,
      // which doesn't reliably fire mouseenter/mouseleave
      let hovered: string | null = null
      if (mouse.active) {
        let best = -Infinity
        hits.forEach((h, i) => {
          if (
            h.depth > best &&
            // planets behind the sun are hidden by it
            !(overSun && h.depth < 0) &&
            Math.hypot(mouse.x - h.x, mouse.y - h.y) < h.r
          ) {
            best = h.depth
            hovered = list[i].id
          }
        })
      }
      if (hovered !== hoveredRef.current) {
        hoveredRef.current = hovered
        if (hovered && hintRef.current) hintRef.current.style.opacity = '0'
        onActiveChangeRef.current?.(hovered)
      }
      container.style.cursor =
        hovered || (overSun && sunButtonRef.current) ? 'pointer' : ''

      const active =
        hoveredRef.current ?? focusedRef.current ?? externalActiveRef.current
      const dark = themeRef.current === 'dark'
      const litColor = dark ? '255,255,255' : '0,0,0'
      const dimColor = dark ? '63,63,70' : '212,212,216' // zinc-700 / zinc-300
      const moonColor = dark ? '212,212,216' : '161,161,170' // zinc-300 / zinc-400
      const sparkleColor = dark ? '255,241,204' : '202,138,4' // warm white / amber-600
      const planetColor = (i: number) => {
        const c = list[i].color
        return c ? (dark ? c.dark : c.light) : litColor
      }

      // orbits slow down while something is highlighted
      const targetSpeed = reduceMotion ? 0 : active ? 0.12 : 1
      speedFactor += (targetSpeed - speedFactor) * Math.min(dt * 4, 1)

      // place bodies
      const bodies: Body[] = [{ x: cx, y: cy, r: sunR, depth: 0, kind: 'sun' }]
      const orbits: { rx: number; ry: number; planet: number }[] = []

      list.forEach((p, i) => {
        angles[i] += p.speed * speedFactor * dt
        const target = active === p.id ? 1 : 0
        grow[i] += (target - grow[i]) * Math.min(dt * 8, 1)

        const rx = p.orbit * scale
        const ry = rx * tilt
        orbits.push({ rx, ry, planet: i })

        const a = angles[i]
        const depth = Math.sin(a)
        const perspective = 0.85 + 0.15 * depth
        const r =
          Math.max(p.radius * scale, MIN_PLANET_RADIUS) *
          perspective *
          (1 + grow[i] * 0.35)
        const x = cx + Math.cos(a) * rx
        const y = cy + Math.sin(a) * ry
        bodies.push({ x, y, r, depth, kind: 'planet', planet: i })

        if (p.ring) {
          bodies.push({
            x,
            y,
            r,
            rx: r * 2.1,
            ry: r * 0.7,
            depth,
            kind: 'ring',
            planet: i
          })
        }
        if (p.moon) {
          const ma = t / 700
          const md = r + 14 * scale
          bodies.push({
            x: x + Math.cos(ma) * md,
            y: y + Math.sin(ma) * md * 0.5,
            r: Math.max(6 * scale, 4),
            depth: depth + Math.sin(ma) * 0.05,
            kind: 'moon',
            planet: i
          })
        }

        // keep the link hit area on top of the planet
        const hit = Math.max(r + 8, 18)
        hits[i] = { x, y, r: hit, depth }
        const link = linkRefs.current[i]
        if (link) {
          link.style.transform = `translate(${x - hit}px, ${y - hit}px)`
          link.style.width = `${hit * 2}px`
          link.style.height = `${hit * 2}px`
          link.style.zIndex = depth > 0 ? '2' : '0'
          link.dataset.active = String(active === p.id)
        }
      })

      const sunHovered = overSun && !hoveredRef.current
      if (sunHovered !== sunWasHovered) {
        sunWasHovered = sunHovered
        onSunHoverRef.current?.(sunHovered)
      }
      if (sunButtonRef.current) {
        const b = sunButtonRef.current.style
        b.left = `${cx - sunR}px`
        b.top = `${cy - sunR}px`
        b.width = b.height = `${sunR * 2}px`
      }
      if (sunLabelRef.current) {
        sunLabelRef.current.style.left = `${cx}px`
        sunLabelRef.current.style.top = `${cy + sunR + 12}px`
      }
      const sunImage = sunImageRef.current

      for (let i = ripples.length - 1; i >= 0; i--) {
        if (t - ripples[i].start > 1600) ripples.splice(i, 1)
      }

      updateSparkles(t)
      ctx.clearRect(0, 0, width, height)

      const gcx = cols / 2
      const gcy = rows / 2
      const maxDist = Math.hypot(gcx, gcy)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing
          const y = offsetY + r * spacing

          const intro = reduceMotion
            ? 1
            : Math.min(
                Math.max(
                  (t - (Math.hypot(c - gcx, r - gcy) / maxDist) * 900) / 400,
                  0
                ),
                1
              )
          if (intro === 0) continue

          // soft elliptical vignette for the background grid
          const fade = vignette(c, r)

          // front-most body covering this dot
          let hit: Body | null = null
          let sunColor: string | null = null
          for (const b of bodies) {
            if (hit && b.depth <= hit.depth) continue
            const dx = x - b.x
            const dy = y - b.y
            if (b.kind === 'ring') {
              const e = (dx / b.rx!) ** 2 + (dy / b.ry!) ** 2
              if (e < 0.72 || e > 1.15) continue
              // the back half of the ring hides behind the planet
              const behind = dy < 0
              if (behind && dx * dx + dy * dy < b.r * b.r) continue
              hit = { ...b, depth: b.depth + (behind ? -0.001 : 0.001) }
            } else if (dx * dx + dy * dy <= b.r * b.r) {
              if (b.kind === 'sun' && sunImage) {
                const u = Math.floor(((dx / b.r + 1) / 2) * (SUN_SAMPLE - 1))
                const v = Math.floor(((dy / b.r + 1) / 2) * (SUN_SAMPLE - 1))
                const k = (v * SUN_SAMPLE + u) * 4
                if (sunImage[k + 3] < 40) continue
                sunColor = `${sunImage[k]},${sunImage[k + 1]},${sunImage[k + 2]}`
              }
              hit = b
            }
          }

          let color = dimColor
          let alpha = 0.7 * fade
          let radius = BASE_RADIUS
          let px = x
          let py = y

          if (hit) {
            const highlighted =
              hit.planet !== undefined && list[hit.planet].id === active
            color =
              hit.kind === 'moon'
                ? moonColor
                : hit.planet !== undefined
                  ? planetColor(hit.planet)
                  : litColor
            alpha = 1
            radius = BASE_RADIUS + 1.1

            if (hit.kind === 'sun') {
              if (sunColor) color = sunColor
              if (!reduceMotion) {
                // gentle shimmer, flickering while hovered
                radius += Math.sin(t / 400 + (x * 7 + y * 13) / 50) * 0.4
                if (sunHovered) {
                  const flicker = Math.sin(t / 120 + x * 12.9898 + y * 78.233)
                  alpha = flicker > 0.6 ? 0.7 : 1
                }
              }
            } else if (hit.kind === 'planet') {
              // shade the side facing away from the sun
              const toSunX = cx - hit.x
              const toSunY = cy - hit.y
              const len = Math.hypot(toSunX, toSunY) || 1
              const facing =
                ((x - hit.x) * toSunX + (y - hit.y) * toSunY) / (len * hit.r)
              if (facing < -0.2) alpha = 0.45
            } else if (hit.kind === 'ring') {
              alpha = 0.7
              radius = BASE_RADIUS + 0.5
            }
            if (highlighted) radius += 0.4
          } else {
            // orbit paths
            for (const o of orbits) {
              const dx = x - cx
              const dy = y - cy
              const f = (dx / o.rx) ** 2 + (dy / o.ry) ** 2 - 1
              const g =
                2 * Math.hypot(dx / (o.rx * o.rx), dy / (o.ry * o.ry)) || 1
              if (Math.abs(f / g) < spacing * 0.5) {
                const highlighted = list[o.planet].id === active
                color = highlighted ? planetColor(o.planet) : litColor
                alpha = (highlighted ? 0.75 : 0.28) * Math.max(fade, 0.5)
                radius = BASE_RADIUS + (highlighted ? 0.3 : 0.1)
                break
              }
            }

            const sparkle = glow.get(r * cols + c)
            if (sparkle) {
              color = sparkleColor
              alpha = Math.max(alpha, sparkle)
              radius += sparkle * 1.7
            }
          }

          if (!reduceMotion) {
            if (!hit) radius += Math.sin(t / 900 - (x + y) / 140) * 0.35

            if (mouse.active) {
              const dx = x - mouse.x
              const dy = y - mouse.y
              const dist = Math.hypot(dx, dy)
              if (dist < MOUSE_RADIUS) {
                const f = 1 - dist / MOUSE_RADIUS
                const ease = f * f
                radius += ease * (hit ? 1.6 : 1.2)
                if (hit && dist > 0) {
                  px += (dx / dist) * ease * 3
                  py += (dy / dist) * ease * 3
                }
                if (!hit && dist < MOUSE_RADIUS * 0.35) {
                  color = litColor
                  alpha = 0.35 * Math.max(fade, 0.3)
                }
              }
            }

            for (const ripple of ripples) {
              const age = (t - ripple.start) / 1600
              const dist = Math.hypot(x - ripple.x, y - ripple.y)
              const band = 1 - Math.min(Math.abs(dist - age * 420) / 24, 1)
              radius += band * 1.8 * (1 - age)
            }
          }

          if (alpha <= 0) continue
          ctx.fillStyle = `rgba(${color},${alpha * intro})`
          ctx.beginPath()
          ctx.arc(px, py, Math.max(radius, 0.3) * intro, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (now: number) => {
      draw(now)
      if (visible && !document.hidden) {
        frame = requestAnimationFrame(loop)
      } else {
        frame = 0
      }
    }

    const start = () => {
      if (!frame) {
        lastTime = performance.now()
        frame = requestAnimationFrame(loop)
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }
    const onDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const t = performance.now() - startTime
      ripples.push({ x, y, start: t })
      // a small burst of sparkles around the click
      const c = Math.round((x - offsetX) / spacing)
      const r = Math.round((y - offsetY) / spacing)
      for (let i = 0; i < 5; i++) {
        const a = Math.random() * Math.PI * 2
        const d = 3 + Math.random() * 4
        sparkles.push({
          c: c + Math.round(Math.cos(a) * d),
          r: r + Math.round(Math.sin(a) * d),
          start: t + i * 70,
          big: i === 0
        })
      }
    }
    const onVisibility = () => {
      if (!document.hidden) start()
    }

    layout()
    start()

    const resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    intersectionObserver.observe(container)

    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)
    container.addEventListener('pointerdown', onDown)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
      container.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full cursor-crosshair', className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      {sunLabel && (
        <div
          ref={sunLabelRef}
          className="pointer-events-none absolute isolate z-3 -translate-x-1/2 whitespace-nowrap"
        >
          {sunLabel}
        </div>
      )}
      {hint && (
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-6 text-center transition-opacity duration-700"
        >
          {hint}
        </div>
      )}
      {onSunClick && (
        <button
          ref={sunButtonRef}
          type="button"
          aria-label={sunClickLabel}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            onSunClick({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            })
          }}
          className="absolute z-1 cursor-pointer rounded-full outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
        />
      )}
      <nav aria-label="Solar system navigation">
        {planets.map((planet, i) => (
          <Link
            key={planet.id}
            ref={el => {
              linkRefs.current[i] = el
            }}
            href={planet.href}
            onClick={planet.onClick}
            onFocus={() => {
              focusedRef.current = planet.id
            }}
            onBlur={() => {
              focusedRef.current = null
            }}
            className="group absolute top-0 left-0 cursor-pointer rounded-full outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
          >
            <span
              className={cn(
                'font-atariClassicChunky pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 pb-1 text-xs whitespace-nowrap',
                'text-black opacity-0 transition-opacity dark:text-white',
                'group-data-[active=true]:opacity-100',
                // no hover on touch screens, so always show the names
                '[@media(hover:none)]:opacity-100'
              )}
            >
              {planet.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
