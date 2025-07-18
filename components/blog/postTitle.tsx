import { cn } from '@/lib/cn'

const PostTitle = ({
  title,
  className
}: {
  title: string
  id?: number
  className?: string
}) => {
  return (
    <h1 className={cn('mt-4 leading-relaxed font-bold md:mt-0', className)}>
      {title}
    </h1>
  )
}

export default PostTitle
