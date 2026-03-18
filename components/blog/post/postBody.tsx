import { ReactNode } from 'react'

const PostBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:no-underline prose-img:rounded-xl prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 max-w-full">
      {children}
    </div>
  )
}

export default PostBody
