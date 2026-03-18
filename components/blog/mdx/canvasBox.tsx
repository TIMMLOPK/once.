import { cn } from '@/lib/cn'
import { HTMLAttributes } from 'react'

export function CanvasBox({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'not-prose relative my-4 overflow-hidden rounded-xl border-t border-b border-gray-400 bg-white sm:border-r sm:border-l sm:border-none sm:shadow-sm dark:bg-[#11110E]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
