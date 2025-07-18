import { htmlToReact } from '@/lib/html'

const PostBody = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-a:text-blue-600 prose-img:rounded-xl max-w-full">
      {htmlToReact(content)}
    </div>
  )
}

export default PostBody
