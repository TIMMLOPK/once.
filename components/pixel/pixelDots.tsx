'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PixelDotsProps {
  src: string
  dotSize: number
  width?: number
  height?: number
  spacing: number
  onHover?: (hovered: boolean) => void
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const BATCH_SIZE = 100

export function PixelDots({
  src,
  onHover,
  dotSize: defaultDotSize,
  width = 300,
  height = 300,
  spacing: defaultSpacing
}: PixelDotsProps) {
  const [dotSize] = useState(defaultDotSize)
  const [spacing] = useState(defaultSpacing)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(
    null
  )
  const [isHovered, setIsHovered] = useState(false)

  const dots = useMemo(() => {
    if (!originalImageData) return []

    const data = originalImageData.data
    const dotsArray = []

    // Calculate step size - use 1 pixel when size/spacing is 0, otherwise use normal calculation
    const stepX = dotSize + spacing || 1
    const stepY = dotSize + spacing || 1
    const currentDotSize = dotSize || 1

    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        const i = (y * width + x) * 4
        if (data[i + 3] > 0) {
          dotsArray.push({
            x: x + currentDotSize / 2,
            y: y + currentDotSize / 2,
            color: `rgba(${data[i]},${data[i + 1]},${data[i + 2]},${data[i + 3] / 255})`
          })
        }
      }
    }

    // If dots array is too large, sample it
    const MAX_DOTS = 10000
    if (dotsArray.length > MAX_DOTS) {
      const samplingRate = Math.ceil(dotsArray.length / MAX_DOTS)
      return dotsArray.filter((_, index) => index % samplingRate === 0)
    }

    return dotsArray
  }, [originalImageData, dotSize, spacing, width, height])

  useEffect(() => {
    let mounted = true

    const initializeImage = async () => {
      try {
        const img = await loadImage(src)
        if (!mounted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        const imageData = ctx.getImageData(0, 0, width, height)
        setOriginalImageData(imageData)
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }

    initializeImage()

    return () => {
      mounted = false
    }
  }, [src, width, height])

  const renderDotsInBatches = (dots: any[]) => {
    const batches = []
    for (let i = 0; i < dots.length; i += BATCH_SIZE) {
      const batchDots = dots.slice(i, i + BATCH_SIZE)
      batches.push(
        <g key={`batch-${i}`}>
          {batchDots.map((dot, index) => (
            <motion.circle
              key={`${dot.x}-${dot.y}`}
              cx={dot.x}
              cy={dot.y}
              r={dotSize / 2}
              fill={dot.color}
              initial={false}
              animate={{
                opacity: isHovered ? (Math.random() > 0.4 ? 0.75 : 1) : 1
              }}
              transition={{
                opacity: {
                  duration: 0.8,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: Math.random() * 1,
                  ease: 'easeInOut'
                },
                duration: 0.3,
                delay: index * 0.0002
              }}
            />
          ))}
        </g>
      )
    }
    return batches
  }

  return (
    <div style={{ position: 'relative', width, height }}>
      <AnimatePresence>
        <motion.svg
          width={width}
          height={height}
          style={{ position: 'absolute', top: 0, left: 0 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => {
            setIsHovered(true)
            onHover?.(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            onHover?.(false)
          }}
        >
          {renderDotsInBatches(dots)}
        </motion.svg>
      </AnimatePresence>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
