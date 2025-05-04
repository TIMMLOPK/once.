import { htmlToReact } from '@/lib/html'

const PostBody = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-neutral max-w-full dark:prose-invert prose-a:text-blue-600 prose-img:rounded-xl">
      {htmlToReact(content)}
    </div>
  )
}

export default PostBody
