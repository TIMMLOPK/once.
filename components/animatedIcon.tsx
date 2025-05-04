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
}

export function AnimatedIcon({
  src,
  onHover,
  width = 200,
  height = 200,
  className,
  dotSize = 5,
  spacing = 0
}: AnimatedIconProps) {
  return (
    <div className={cn('relative inline-block', className)}>
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
