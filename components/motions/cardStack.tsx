'use client'

import { useState } from 'react'
import {
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  motion,
  transform
} from 'motion/react'
import { Snap } from './snap'
import { ImageCard } from '@/components/sections/about'
import { cn } from '@/lib/cn'

interface CardProps {
  index: number
  progress: any
  direction: number
  className?: string
  children: React.ReactNode
}

export const Card = ({
  index,
  progress,
  direction,
  className,
  children
}: CardProps) => {
  const distanceFromFront = useTransform(
    progress,
    (latest: number) => latest - index
  )
  const distanceFromFrontABS = useTransform(distanceFromFront, latest =>
    Math.abs(latest)
  )

  const [isFirst, setIsFirst] = useState(distanceFromFrontABS.get() < 0.5)

  useMotionValueEvent(distanceFromFront, 'change', latest => {
    const previous = distanceFromFront.getPrevious()
    if (previous === undefined) return

    /* Check when the progress sign changes */
    if (latest * previous <= 0) {
      setIsFirst(true)
    }

    /* When the progress becomes greater than 1 or less than -1 */
    if (Math.abs(latest) >= 1) {
      setIsFirst(false)
    }
  })

  const scale = useTransform(
    distanceFromFrontABS,
    [0, 0.5, 1],
    isFirst ? [1, 0.95, 1] : [1, 1, 1]
  )

  const x = useTransform(
    distanceFromFront,
    [-1, -0.5, 0, 0.5, 1],
    isFirst
      ? ['12%', '77%', '0%', '-77%', '-12%']
      : ['12%', '5%', '0%', '-5%', '-12%'],
    {
      clamp: false
    }
  )

  const z = useTransform(distanceFromFrontABS, [0, 1], [0, -170], {
    clamp: false
  })

  const rotateZ = useTransform(distanceFromFront, [0, 1], [0, -2.4], {
    clamp: false
  })

  const rotateY = useTransform(distanceFromFrontABS, value => {
    return (
      transform(value % 1, [0, 0.5, 1], isFirst ? [0, -45, 0] : [0, -20, 0]) *
      direction
    )
  })

  /* Need to keep z-index 0 for a bit more to avoid a flick */

  const zIndex = useTransform(
    distanceFromFront,
    [-2, -1, 0, 0.7, 2],
    [-2, -1, 0, 0, -2],
    {
      clamp: false
    }
  )

  return (
    <motion.article
      style={{
        scale,
        rotateZ,
        rotateY,
        zIndex,
        transformPerspective: 1000,
        x,
        z
      }}
      //   className="absolute inset-0 w-[220px] m-auto"
      className={cn('absolute inset-0 m-auto w-[220px]', className)}
    >
      {children}
    </motion.article>
  )
}

interface CardStackProps {
  items: {
    src: string
    alt: string
    text: string
  }[]
}
export function CardStack({ items }: CardStackProps) {
  const progress = useMotionValue(0)
  const progressStep = useTransform(progress, latest => Math.floor(latest))
  const [direction, setDirection] = useState(1)

  useMotionValueEvent(progressStep, 'change', latest => {
    const previous = progressStep.getPrevious()
    if (previous === undefined) return
    setDirection(previous > latest ? -1 : 1)
  })

  useMotionValueEvent(progress, 'change', latest => {
    if (latest % 1 === 0) {
      setDirection(1)
    }
  })

  return (
    <Snap progress={progress}>
      {items.map((item, index) => (
        <Card
          key={index}
          index={index}
          progress={progress}
          direction={direction}
        >
          <ImageCard src={item.src} alt={item.alt} text={item.text} />
        </Card>
      ))}
    </Snap>
  )
}
