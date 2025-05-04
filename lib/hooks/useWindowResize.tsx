import { useEffect, useRef } from 'react'

export const useResizeObserver = (
  ref: React.RefObject<HTMLElement | null>,
  fn: ResizeObserverCallback
) => {
  const onResize = useRef<ResizeObserverCallback>(fn)

  useEffect(() => {
    if (!ref.current) return
    if (!onResize.current) return

    const resizeObserver = new ResizeObserver(onResize.current)
    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])
}
