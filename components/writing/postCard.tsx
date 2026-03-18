'use client'

import { PostData } from '@/lib/types/post'
import Link from 'next/link'
import { ReactNode } from 'react'

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer
} from '@/components/motions/card-layout'

export function PostCard({
  post,
  content
}: {
  post: PostData
  content?: ReactNode
}) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24
      }}
    >
      <MorphingDialogTrigger>
        <div className="flex flex-col space-y-1 p-4 select-none">
          <div className="flex flex-col items-start justify-center space-y-0">
            <MorphingDialogTitle className="text-base font-medium text-zinc-800 underline decoration-zinc-400 hover:decoration-2 dark:text-zinc-50">
              {post.title}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-sm text-zinc-600 dark:text-zinc-400">
              {post.description}
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-h-[85vh] overflow-y-auto rounded-lg border bg-white lg:w-3/4 dark:border-zinc-800 dark:bg-black">
          <div className="relative p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <MorphingDialogTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">
                  {post.title}
                </MorphingDialogTitle>
                <MorphingDialogSubtitle className="text-sm text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </MorphingDialogSubtitle>
              </div>
              <Link
                href={`/writing/${post.slug}`}
                className="mt-6 shrink-0 text-sm text-zinc-400 hover:text-zinc-700 hover:underline dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                Open full page ↗
              </Link>
            </div>
            {content && (
              <div className="border-t border-dashed pt-4">{content}</div>
            )}
          </div>
          <MorphingDialogClose className="text-zinc-500" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
