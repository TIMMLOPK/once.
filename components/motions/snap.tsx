import { useState, useEffect, useRef, Children } from 'react'
import { useTouch } from '@/lib/hooks/useTouch'
import { useResizeObserver } from '@/lib/hooks/useWindowResize'
import {
  motion,
  transform,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  animate
} from 'motion/react'

export const Snap = ({
  children,
  progress
}: {
  children: React.ReactNode
  progress: any
}) => {
  const $wrapperRef = useRef<HTMLDivElement | null>(null)
  const length = Children.count(children)
  const supportTouch = useTouch()
  const dragX = useMotionValue(0)
  const [isDragActive, setIsDragActive] = useState(false)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  const { scrollYProgress, scrollXProgress } = useScroll({
    container: $wrapperRef
  })

  const onMouseDown = () => setIsDragActive(true)

  const onMouseUp = () => {
    if (dragX.getVelocity() === 0) {
      animate(dragX, getSnappedTarget(dragX.get()))
    }
  }

  useEffect(() => {
    if (isDragActive && $wrapperRef.current) {
      dragX.jump(-$wrapperRef.current.scrollTop)
    }
  }, [isDragActive, dragX])

  useMotionValueEvent(dragX, 'animationComplete', () => setIsDragActive(false))

  useMotionValueEvent(
    supportTouch ? scrollXProgress : scrollYProgress,
    'change',
    latest => {
      progress.set(transform(latest, [0, 1], [0, length - 1]))
    }
  )

  useResizeObserver($wrapperRef, () => {
    if (!$wrapperRef.current) return

    setDragConstraints({
      left: -(
        $wrapperRef.current.scrollHeight - $wrapperRef.current.clientHeight
      ),
      right: 0
    })
  })

  useMotionValueEvent(dragX, 'change', latest => {
    if (!$wrapperRef.current) return
    $wrapperRef.current.scrollTop = Math.abs(latest)
  })

  useEffect(() => {
    if (!$wrapperRef.current) return
    const { clientWidth, clientHeight } = $wrapperRef.current

    $wrapperRef.current[supportTouch ? 'scrollLeft' : 'scrollTop'] = transform(
      progress.get(),
      [0, length - 1],
      [0, (supportTouch ? clientWidth : clientHeight) * (length - 1)]
    )
  }, [length, progress, supportTouch])

  const getSnappedTarget = (value: number) => {
    if (!$wrapperRef.current) return 0

    return (
      Math.round(value / $wrapperRef.current.clientHeight) *
      $wrapperRef.current.clientHeight
    )
  }

  return (
    <motion.div
      className="h-full w-full snap-y snap-mandatory overflow-auto"
      ref={$wrapperRef}
      _dragX={dragX}
      drag={!supportTouch ? 'x' : undefined}
      dragElastic={0}
      dragConstraints={dragConstraints}
      dragTransition={{
        power: 0.4,
        timeConstant: 90,
        modifyTarget: getSnappedTarget
      }}
      onPointerDown={onMouseDown}
      onPointerUp={onMouseUp}
      style={
        isDragActive
          ? {
              overflow: 'hidden',
              scrollSnapType: 'none',
              touchAction: 'none'
            }
          : undefined
      }
    >
      {Children.map(children, (child, key) => (
        <div
          className="h-full snap-center"
          key={key}
          style={{ '--index': key } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </motion.div>
  )
}
