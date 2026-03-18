'use client'

import { cn } from '@/lib/cn'
import { caveat } from '@/app/fonts'
import Link from 'next/link'

const PostHeader = ({
  title,
  date,
  readingTime
}: {
  title: string
  date: string
  readingTime?: number
}) => {
  return (
    <div className="space-y-8">
      {/* Navigation & meta row */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex max-w-full items-center gap-1">
          <Link href="/">
            <span className="font-silkScreen text-zinc-400 dark:text-zinc-500">
              Writing/
            </span>
          </Link>
          <span className="max-w-full overflow-hidden font-serif text-ellipsis whitespace-nowrap">
            {title}
          </span>
        </div>
        <div
          className={cn(
            caveat.className,
            'flex items-center gap-3 text-base text-zinc-400 dark:text-zinc-500'
          )}
        >
          <span>{date}</span>
          {readingTime !== undefined && (
            <>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostHeader
