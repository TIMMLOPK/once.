'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { CanvasBox } from './canvasBox'
import Button from '@/components/shared/button'

// ═══════════════════════ AVL Tree ═══════════════════════

interface AVLNode {
  v: number
  h: number
  l: AVLNode | null
  r: AVLNode | null
  // Render positions
  px: number
  py: number
  // Animated positions
  _ax: number | null
  _ay: number | null
  // Unique id for React
  id: string
}

function mkNode(v: number): AVLNode {
  return {
    v,
    h: 0,
    l: null,
    r: null,
    px: 0,
    py: 0,
    _ax: null,
    _ay: null,
    id: `${v}-${Date.now()}-${Math.random()}`
  }
}

function ht(n: AVLNode | null): number {
  return n ? n.h : -1
}

function bf(n: AVLNode | null): number {
  return n ? ht(n.l) - ht(n.r) : 0
}

function upd(n: AVLNode): void {
  if (n) n.h = 1 + Math.max(ht(n.l), ht(n.r))
}

function rotR(y: AVLNode): AVLNode {
  const x = y.l!
  const t = x.r
  x.r = y
  y.l = t
  upd(y)
  upd(x)
  return x
}

function rotL(x: AVLNode): AVLNode {
  const y = x.r!
  const t = y.l
  y.l = x
  x.r = t
  upd(x)
  upd(y)
  return y
}

function doBalance(n: AVLNode, v: number): AVLNode {
  upd(n)
  const b = bf(n)
  if (b > 1 && v < n.l!.v) return rotR(n)
  if (b < -1 && v > n.r!.v) return rotL(n)
  if (b > 1 && v > n.l!.v) {
    n.l = rotL(n.l!)
    return rotR(n)
  }
  if (b < -1 && v < n.r!.v) {
    n.r = rotR(n.r!)
    return rotL(n)
  }
  return n
}

function ins(n: AVLNode | null, v: number): AVLNode {
  if (!n) return mkNode(v)
  if (v < n.v) n.l = ins(n.l, v)
  else if (v > n.v) n.r = ins(n.r, v)
  else return n
  return doBalance(n, v)
}

function findMin(n: AVLNode): AVLNode {
  while (n.l) n = n.l
  return n
}

function del(n: AVLNode | null, v: number): AVLNode | null {
  if (!n) return null
  if (v < n.v) n.l = del(n.l, v)
  else if (v > n.v) n.r = del(n.r, v)
  else {
    if (!n.l || !n.r) return n.l || n.r
    const s = findMin(n.r)
    n.v = s.v
    n.r = del(n.r, s.v)
  }
  return doBalance(n, v)
}

// ═══════════════════════ Types ═══════════════════════

type PositionMap = Map<AVLNode, { x: number; y: number }>

interface AnimationState {
  t0: number
  dur: number
  from: PositionMap
  to: PositionMap
  label: string | null
  pivotVal: number | null
}

interface Highlight {
  v: number
  t: number
  dur: number
}

// ═══════════════════════ Layout ═══════════════════════

function countNodes(n: AVLNode | null): number {
  return n ? 1 + countNodes(n.l) + countNodes(n.r) : 0
}

function collectPositions(n: AVLNode | null, w: number, h: number): void {
  if (!n) return
  const padX = 36
  const padTop = 28
  const padBot = 50
  const total = countNodes(n)
  const maxD = ht(n)
  let idx = 0

  function go(node: AVLNode | null, d: number) {
    if (!node) return
    go(node.l, d + 1)
    const ratio = total > 1 ? idx / (total - 1) : 0.5
    node.px = padX + ratio * (w - 2 * padX)
    node.py = maxD > 0 ? padTop + (d / maxD) * (h - padTop - padBot) : h / 2
    idx++
    go(node.r, d + 1)
  }
  go(n, 0)
}

function snapshotPositions(n: AVLNode | null): PositionMap {
  const map = new Map<AVLNode, { x: number; y: number }>()
  ;(function go(node: AVLNode | null) {
    if (!node) return
    map.set(node, {
      x: node._ax != null ? node._ax : node.px,
      y: node._ay != null ? node._ay : node.py
    })
    go(node.l)
    go(node.r)
  })(n)
  return map
}

function findAncestorInMap(
  node: AVLNode,
  treeRoot: AVLNode,
  map: PositionMap
): { x: number; y: number } | null {
  let cur: AVLNode | null = treeRoot
  let last: { x: number; y: number } | null = null
  while (cur && cur !== node) {
    if (map.has(cur)) last = map.get(cur)!
    cur = node.v < cur.v ? cur.l : cur.r
  }
  return last
}

function findNode(n: AVLNode | null, v: number): AVLNode | null {
  while (n) {
    if (v === n.v) return n
    n = v < n.v ? n.l : n.r
  }
  return null
}

function findUnbalanced(n: AVLNode | null, v: number): AVLNode | null {
  let node = n
  let pivot: AVLNode | null = null
  while (node) {
    const b = bf(node)
    if (b > 1 || b < -1) pivot = node
    node = v < node.v ? node.l : node.r
  }
  return pivot
}

// ═══════════════════════ Animation ═══════════════════════

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function pos(node: AVLNode): { x: number; y: number } {
  return {
    x: node._ax != null ? node._ax : node.px,
    y: node._ay != null ? node._ay : node.py
  }
}

function renderNumberHighlights(text: string, keyPrefix: string) {
  return text.split(/(-?\d+)/g).map((part, idx) => {
    if (/^-?\d+$/.test(part)) {
      return (
        <span
          key={`${keyPrefix}-num-${idx}`}
          className="font-medium text-[#b05c3c]"
        >
          {part}
        </span>
      )
    }
    return part
  })
}

function renderInfoText(text: string) {
  return text
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((chunk, idx) => {
      if (/^\[[^\]]+\]$/.test(chunk)) {
        const inner = chunk.slice(1, -1)
        return (
          <span
            key={`badge-${idx}`}
            className="inline-block rounded bg-[#f0ece6] px-2 py-0.5 text-[#9a938c]"
          >
            {renderNumberHighlights(inner, `badge-${idx}`)}
          </span>
        )
      }
      return (
        <span key={`text-${idx}`}>
          {renderNumberHighlights(chunk, `text-${idx}`)}
        </span>
      )
    })
}

// ═══════════════════════ Main Component ═══════════════════════

const SPEED_DURS = [1200, 700, 400, 200, 100] // slow → fast (ms)

function getTraversalPath(
  n: AVLNode | null,
  v: number,
  includeTarget: boolean
): number[] {
  const path: number[] = []
  let cur = n
  while (cur) {
    if (v === cur.v) {
      if (includeTarget) path.push(cur.v)
      break
    }
    path.push(cur.v)
    cur = v < cur.v ? cur.l : cur.r
  }
  return path
}

interface OpEntry {
  id: number
  text: string
  kind: 'insert' | 'delete' | 'rotate' | 'clear'
}

export function AVLTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [root, setRoot] = useState<AVLNode | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [info, setInfo] = useState('Insert a number to begin')
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [animSpeed, setAnimSpeed] = useState(3)
  const [opLog, setOpLog] = useState<OpEntry[]>([])
  const opLogIdRef = useRef(0)

  const animRef = useRef<AnimationState | null>(null)
  const rafRef = useRef<number | null>(null)
  const rootRef = useRef<AVLNode | null>(null)
  const highlightsRef = useRef<Highlight[]>([])
  const animSpeedRef = useRef(3)
  const pendingOpRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep refs in sync
  useEffect(() => {
    rootRef.current = root
  }, [root])

  useEffect(() => {
    highlightsRef.current = highlights
  }, [highlights])

  useEffect(() => {
    animSpeedRef.current = animSpeed
  }, [animSpeed])

  // Get canvas dimensions
  const getDimensions = useCallback(() => {
    const container = containerRef.current
    if (!container) return { w: 400, h: 380 }
    const rect = container.getBoundingClientRect()
    return { w: rect.width, h: 380 }
  }, [])

  // Draw the scene
  const drawScene = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      label: string | null,
      pivotVal: number | null,
      animT: number | null
    ) => {
      const currentRoot = rootRef.current
      const currentHighlights = highlightsRef.current

      ctx.clearRect(0, 0, w, h)

      if (!currentRoot) {
        ctx.fillStyle = '#a09890'
        ctx.font = "300 13px 'DM Mono', monospace"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('empty tree', w / 2, h / 2)
        return
      }

      // Collect nodes via BFS
      const nodes: AVLNode[] = []
      const q: (AVLNode | null)[] = [currentRoot]
      while (q.length) {
        const n = q.shift()
        if (!n) continue
        nodes.push(n)
        if (n.l) q.push(n.l)
        if (n.r) q.push(n.r)
      }

      // Draw edges
      ctx.strokeStyle = '#d8d2ca'
      ctx.lineWidth = 1.5
      for (const n of nodes) {
        const p = pos(n)
        if (n.l) {
          const c = pos(n.l)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(c.x, c.y)
          ctx.stroke()
        }
        if (n.r) {
          const c = pos(n.r)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(c.x, c.y)
          ctx.stroke()
        }
      }

      // Rotation arc hint
      if (pivotVal != null && animT != null) {
        const pivot = findNode(currentRoot, pivotVal)
        if (pivot) {
          const pp = pos(pivot)
          const radius = 55 + 15 * Math.sin(animT * Math.PI)
          ctx.save()
          ctx.globalAlpha = 0.1 * Math.sin(animT * Math.PI)
          ctx.strokeStyle = '#b05c3c'
          ctx.lineWidth = 2
          ctx.setLineDash([4, 6])
          ctx.beginPath()
          ctx.arc(pp.x, pp.y, radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
          ctx.restore()
        }
      }

      // Draw nodes
      const now = performance.now()
      for (const n of nodes) {
        const p = pos(n)
        const r = 23
        let active = false
        for (const h of currentHighlights) {
          if (h.v === n.v && now - h.t < h.dur) {
            active = true
            break
          }
        }

        // Glow ring
        if (active) {
          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(176,92,60,0.15)'
          ctx.fill()
          ctx.restore()
        }

        // Circle
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        if (active) {
          ctx.fillStyle = '#b05c3c'
          ctx.fill()
        } else {
          ctx.fillStyle = '#fff'
          ctx.fill()
          ctx.strokeStyle = '#2c2520'
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Value
        ctx.fillStyle = active ? '#faf8f5' : '#2c2520'
        ctx.font = "500 13px 'DM Mono', monospace"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(n.v), p.x, p.y)

        // Balance factor & height
        ctx.fillStyle = active ? 'rgba(250,248,245,0.7)' : '#a09890'
        ctx.font = "300 10px 'DM Mono', monospace"
        ctx.fillText('bf=' + bf(n) + ' h=' + n.h, p.x, p.y + r + 13)
      }

      // Rotation label
      if (label) {
        const pivot =
          pivotVal != null ? findNode(currentRoot, pivotVal) : currentRoot
        const pp = pivot ? pos(pivot) : { x: w / 2, y: 40 }
        const fade = animT != null ? Math.sin(animT * Math.PI) : 0.8

        ctx.save()
        ctx.globalAlpha = fade
        ctx.font = "500 12px 'DM Mono', monospace"
        const tw = ctx.measureText(label).width + 20

        ctx.fillStyle = '#2c2520'
        roundRect(ctx, pp.x - tw / 2, pp.y - 46, tw, 24, 5)
        ctx.fill()

        ctx.fillStyle = '#faf8f5'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, pp.x, pp.y - 34)
        ctx.restore()
      }
    },
    []
  )

  // Animation loop
  const animLoop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !animRef.current) return

    const anim = animRef.current
    const elapsed = performance.now() - anim.t0
    const raw = Math.min(elapsed / anim.dur, 1)
    const t = easeInOutCubic(raw)
    const { from, to } = anim
    const { w, h } = getDimensions()

    // Interpolate positions
    const currentRoot = rootRef.current
    for (const [node, tp] of to) {
      const fp = from.get(node)
      let sx: number, sy: number
      if (fp) {
        sx = fp.x
        sy = fp.y
      } else {
        const anc = currentRoot
          ? findAncestorInMap(node, currentRoot, from)
          : null
        if (anc) {
          sx = anc.x
          sy = anc.y
        } else {
          sx = w / 2
          sy = -20
        }
      }
      node._ax = sx + (tp.x - sx) * t
      node._ay = sy + (tp.y - sy) * t
    }

    drawScene(ctx, w, h, anim.label, raw < 1 ? anim.pivotVal : null, t)

    if (raw < 1) {
      rafRef.current = requestAnimationFrame(animLoop)
    } else {
      // Clear animated positions
      for (const [node] of to) {
        node._ax = null
        node._ay = null
      }
      animRef.current = null
      render()
    }
  }, [drawScene, getDimensions])

  // Start animation
  const startAnim = useCallback(
    (
      fromMap: PositionMap,
      toMap: PositionMap,
      label: string | null,
      pivotVal: number | null
    ) => {
      if (animRef.current && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      animRef.current = {
        t0: performance.now(),
        dur: SPEED_DURS[animSpeedRef.current - 1],
        from: fromMap,
        to: toMap,
        label,
        pivotVal
      }
      animLoop()
    },
    [animLoop]
  )

  // Render static scene
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { w, h } = getDimensions()
    const dpr = typeof window !== 'undefined' && devicePixelRatio > 1 ? 2 : 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (rootRef.current) {
      collectPositions(rootRef.current, w, h)
    }
    drawScene(ctx, w, h, null, null, null)
  }, [drawScene, getDimensions])

  // Initial render and resize
  useEffect(() => {
    render()
    const handleResize = () => render()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [render])

  // Flash highlight
  const flash = useCallback((v: number, dur = 1500) => {
    setHighlights(prev => {
      const filtered = prev.filter(h => h.v !== v)
      return [...filtered, { v, t: performance.now(), dur }]
    })
  }, [])

  const setInfoWithFlash = useCallback((html: string) => {
    setInfo(html)
  }, [])

  const addLog = useCallback((text: string, kind: OpEntry['kind']) => {
    setOpLog(prev => {
      const next = [...prev, { id: ++opLogIdRef.current, text, kind }]
      return next.slice(-6)
    })
  }, [])

  // Operations
  const insertVal = useCallback(
    (v: number) => {
      if (isNaN(v)) return
      if (pendingOpRef.current) {
        clearTimeout(pendingOpRef.current)
        pendingOpRef.current = null
      }

      const path = getTraversalPath(rootRef.current, v, false)
      const nodeDelay = 150

      if (path.length > 0) {
        setInfo('Traversing...')
        path.forEach((pv, i) => {
          setTimeout(() => flash(pv, 450), i * nodeDelay)
        })
      }

      const delay = path.length * nodeDelay + (path.length > 0 ? 80 : 0)

      pendingOpRef.current = setTimeout(() => {
        pendingOpRef.current = null

        const oldMap = rootRef.current
          ? snapshotPositions(rootRef.current)
          : new Map()
        const beforeHt = ht(rootRef.current)
        const newRoot = ins(rootRef.current, v)
        setRoot(newRoot)
        rootRef.current = newRoot

        const afterHt = ht(newRoot)
        const { w, h } = getDimensions()
        collectPositions(newRoot, w, h)
        const newMap = snapshotPositions(newRoot)

        const rotated = oldMap.size > 0 && afterHt <= beforeHt

        let label: string | null = null
        let pivotVal: number | null = null
        if (rotated) {
          const pivot = findUnbalanced(newRoot, v)
          if (pivot) {
            pivotVal = pivot.v
            const b = bf(pivot)
            const cb = b > 0 ? bf(pivot.l) : bf(pivot.r)
            if (b > 0 && cb! >= 0) label = 'LL → Right Rotate'
            else if (b < 0 && cb! <= 0) label = 'RR → Left Rotate'
            else if (b > 0 && cb! < 0) label = 'LR → Left-Right Rotate'
            else label = 'RL → Right-Left Rotate'
          }
        }

        startAnim(oldMap, newMap, label, pivotVal)
        flash(v)

        const tag = `h=${afterHt} root_bf=${bf(newRoot)}`
        if (rotated && label) {
          setInfoWithFlash(`Inserted ${v} — rotation! [${tag}]`)
          addLog(`↺ insert ${v} → ${label}`, 'rotate')
        } else {
          setInfoWithFlash(`Inserted ${v} [${tag}]`)
          addLog(`+ insert ${v}`, 'insert')
        }
      }, delay)
    },
    [flash, getDimensions, setInfoWithFlash, startAnim, addLog]
  )

  const deleteVal = useCallback(
    (v: number) => {
      if (isNaN(v)) return
      if (!rootRef.current) {
        setInfoWithFlash('Tree is empty')
        return
      }
      if (!findNode(rootRef.current, v)) {
        setInfoWithFlash(`${v} not found`)
        return
      }
      if (pendingOpRef.current) {
        clearTimeout(pendingOpRef.current)
        pendingOpRef.current = null
      }

      const path = getTraversalPath(rootRef.current, v, true)
      const nodeDelay = 150

      if (path.length > 0) {
        setInfo('Traversing...')
        path.forEach((pv, i) => {
          const isTarget = i === path.length - 1
          setTimeout(() => flash(pv, isTarget ? 700 : 450), i * nodeDelay)
        })
      }

      const delay = path.length * nodeDelay + 80

      pendingOpRef.current = setTimeout(() => {
        pendingOpRef.current = null

        const oldMap = snapshotPositions(rootRef.current!)
        const newRoot = del(rootRef.current, v)
        setRoot(newRoot)
        rootRef.current = newRoot

        const { w, h } = getDimensions()
        collectPositions(newRoot, w, h)
        const newMap = newRoot ? snapshotPositions(newRoot) : new Map()

        startAnim(oldMap, newMap, null, null)
        setInfoWithFlash(`Deleted ${v} [h=${ht(newRoot)}]`)
        addLog(`− delete ${v}`, 'delete')
      }, delay)
    },
    [getDimensions, setInfoWithFlash, startAnim, flash, addLog]
  )

  const clearTree = useCallback(() => {
    if (pendingOpRef.current) {
      clearTimeout(pendingOpRef.current)
      pendingOpRef.current = null
    }
    if (animRef.current && rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    animRef.current = null
    setRoot(null)
    rootRef.current = null
    setHighlights([])
    setInfoWithFlash('Cleared')
    addLog('✕ clear', 'clear')
    setTimeout(render, 0)
  }, [render, setInfoWithFlash, addLog])

  const preset = useCallback(
    (type: 'll' | 'rr' | 'lr' | 'rl') => {
      clearTree()

      const seqs: Record<string, { vals: number[]; name: string }> = {
        ll: { vals: [30, 20, 10], name: 'LL → Right Rotate' },
        rr: { vals: [10, 20, 30], name: 'RR → Left Rotate' },
        lr: { vals: [30, 10, 20], name: 'LR → Left-Right Rotate' },
        rl: { vals: [10, 30, 20], name: 'RL → Right-Left Rotate' }
      }
      const p = seqs[type]
      if (!p) return

      const dur = SPEED_DURS[animSpeedRef.current - 1]
      const interval = dur + 250

      p.vals.forEach((v, i) => {
        setTimeout(
          () => {
            const last = i === p.vals.length - 1

            const oldMap = rootRef.current
              ? snapshotPositions(rootRef.current)
              : new Map()
            const beforeHt = ht(rootRef.current)
            const newRoot = ins(rootRef.current, v)
            setRoot(newRoot)
            rootRef.current = newRoot
            const afterHt = ht(newRoot)

            const { w, h } = getDimensions()
            collectPositions(newRoot, w, h)
            const newMap = snapshotPositions(newRoot)

            if (last) {
              startAnim(oldMap, newMap, p.name, v)
              flash(v)
              setInfoWithFlash(`${p.name} on insert ${v} [h=${afterHt}]`)
              addLog(`↺ preset ${type.toUpperCase()} → ${p.name}`, 'rotate')
            } else {
              startAnim(oldMap, newMap, null, null)
              setInfoWithFlash(`Inserted ${v}`)
            }
          },
          (i + 1) * interval
        )
      })
    },
    [clearTree, flash, getDimensions, setInfoWithFlash, startAnim, addLog]
  )

  // Event handlers
  const handleInsert = useCallback(() => {
    const v = parseInt(inputValue)
    if (isNaN(v)) return
    insertVal(v)
    setInputValue('')
  }, [inputValue, insertVal])

  const handleDelete = useCallback(() => {
    const v = parseInt(inputValue)
    if (isNaN(v)) return
    deleteVal(v)
    setInputValue('')
  }, [inputValue, deleteVal])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleInsert()
      }
    },
    [handleInsert]
  )

  const speedLabels = ['¼×', '½×', '1×', '2×', '4×']

  return (
    <div className="font-dmMono space-y-3 p-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="value"
          min="-999"
          max="999"
          className="w-20 rounded-md border border-[#d8d2ca] bg-white px-3 py-2 text-xs transition-colors outline-none placeholder:text-[#a09890] focus:border-[#b05c3c] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <Button
          onClick={handleInsert}
          className="bg-[#2c2520] px-4 py-2 text-xs text-[#faf8f5]"
        >
          insert
        </Button>
        <Button
          onClick={handleDelete}
          className="bg-[#2c2520] px-4 py-2 text-xs text-[#faf8f5]"
        >
          delete
        </Button>

        <div className="mx-1 h-6 w-px bg-[#d8d2ca] dark:bg-zinc-700" />

        <Button
          onClick={() => preset('ll')}
          className="bg-white px-4 py-2 text-xs text-[#2c2520]"
        >
          LL
        </Button>
        <Button
          onClick={() => preset('rr')}
          className="bg-white px-4 py-2 text-xs text-[#2c2520]"
        >
          RR
        </Button>
        <Button
          onClick={() => preset('lr')}
          className="bg-white px-4 py-2 text-xs text-[#2c2520]"
        >
          LR
        </Button>
        <Button
          onClick={() => preset('rl')}
          className="bg-white px-4 py-2 text-xs text-[#2c2520]"
        >
          RL
        </Button>

        <div className="mx-1 h-6 w-px bg-[#d8d2ca] dark:bg-zinc-700" />

        <Button
          onClick={clearTree}
          className="bg-white px-4 py-2 text-xs text-[#2c2520]"
        >
          clear
        </Button>
      </div>

      {/* Speed slider */}
      <div className="flex items-center gap-2.5">
        <span className="text-xs text-[#9a938c]">speed</span>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={animSpeed}
          onChange={e => {
            const v = parseInt(e.target.value)
            setAnimSpeed(v)
            animSpeedRef.current = v
          }}
          className="w-28 cursor-pointer accent-[#b05c3c]"
        />
        <span className="w-5 text-xs text-[#9a938c] tabular-nums">
          {speedLabels[animSpeed - 1]}
        </span>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg border border-[#d8d2ca] bg-white dark:border-zinc-700 dark:bg-zinc-900"
          style={{ height: '380px' }}
        />
      </div>

      {/* Info */}
      <div className="min-h-[1.4em] text-sm text-[#9a938c]">
        {renderInfoText(info)}
      </div>

      {/* Operation log */}
      {opLog.length > 0 && (
        <div className="space-y-0.5 rounded border border-[#e8e4de] bg-[#faf8f5] px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
          {[...opLog].reverse().map(entry => (
            <div
              key={entry.id}
              className={`text-xs ${
                entry.kind === 'rotate'
                  ? 'text-[#b05c3c]'
                  : entry.kind === 'delete'
                    ? 'text-[#6b6560]'
                    : entry.kind === 'clear'
                      ? 'text-[#c0b8b0]'
                      : 'text-[#2c2520] dark:text-zinc-300'
              }`}
            >
              {entry.text}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="text-xs text-[#6b6560]">
        <strong className="text-[#2c2520] italic dark:text-zinc-300">bf</strong>{' '}
        shown on each node = balance factor &nbsp;
        <strong className="text-[#2c2520] italic dark:text-zinc-300">
          h
        </strong>{' '}
        = height (leaf = 0)
      </div>
    </div>
  )
}

// ═══════════════════════ Helper ═══════════════════════

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ═══════════════════════ Balance Factor Demo ═══════════════════════

export function BalanceFactorDemo() {
  return (
    <CanvasBox>
      <div className="space-y-3 p-4">
        <p className="font-dmMono text-center text-sm font-medium text-[#2c2520] dark:text-zinc-300">
          Balance Factor = height(left) − height(right)
        </p>
        <pre className="overflow-x-auto rounded-lg border border-[#d8d2ca] bg-[#f0ece6] p-4 text-xs leading-relaxed text-[#2c2520] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {`// invariant: every node has balance factor ∈ {−1, 0, +1}
balance factor = height(left) − height(right)`}
        </pre>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-[#6b6560]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-500">0</span>
            <span>Perfectly balanced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-500">±1</span>
            <span>Acceptable imbalance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-500">±2</span>
            <span>Needs rotation</span>
          </div>
        </div>
      </div>
    </CanvasBox>
  )
}
