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
        'not-prose relative my-4 overflow-hidden rounded-xl border border-[#d8d2ca] bg-[#f0ece6] text-xs leading-relaxed text-[#2c2520] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
