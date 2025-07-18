'use client'

import { cn } from '@/lib/cn'
import { PixelDots } from './pixel/pixelDots'

interface AnimatedIconProps {
  src: string
  width?: number
  height?: number
  className?: string
  dotSize?: number
  spacing?: number
  onHover?: (hovered: boolean) => void
  'aria-label'?: string
}

export function AnimatedIcon({
  src,
  onHover,
  width = 200,
  height = 200,
  className,
  dotSize = 5,
  spacing = 0,
  'aria-label': ariaLabel
}: AnimatedIconProps) {
  return (
    <div
      className={cn('relative inline-block', className)}
      aria-label={ariaLabel}
    >
      <PixelDots
        src={src}
        dotSize={dotSize}
        width={width}
        height={height}
        spacing={spacing}
        onHover={onHover}
      />
    </div>
  )
}
