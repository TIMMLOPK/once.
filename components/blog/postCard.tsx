'use client'

import { PostData } from '@/lib/types/post'
import PostBody from './post/postBody'

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer
} from '@/components/motions/card-layout'

export function PostCard({ post }: { post: PostData }) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24
      }}
    >
      <MorphingDialogTrigger>
        <div className="flex select-none flex-col space-y-1 p-4">
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
        <MorphingDialogContent className="relative overflow-auto rounded-lg border bg-white dark:border-zinc-800 dark:bg-black lg:w-3/4">
          <div className="relative p-6">
            <MorphingDialogTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">
              {post.title}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-sm text-zinc-600 dark:text-zinc-400">
              {post.description}
            </MorphingDialogSubtitle>
            <div className="mt-2 overflow-auto border-t border-dashed pt-2 text-sm text-zinc-700 lg:h-[450px]">
              <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-white to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,white,transparent)] dark:bg-neutral-900" />
              <PostBody content={post.content} />
            </div>
          </div>
          <MorphingDialogClose className="text-zinc-500" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
