import Image from 'next/image'
import { cn } from '@/lib/cn'

const Avatar = ({
  name = 'Timmy',
  picture = '/icon.webp',
  className = '',
  imageClassName = ''
}: {
  name: string
  picture: string
  className?: string
  imageClassName?: string
}) => {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className={cn('relative h-8 w-8', imageClassName)}>
        <Image
          src={picture}
          className="rounded-full"
          height={48}
          width={48}
          alt={name}
        />
      </div>
      <p
        className={cn(
          'leading-6 font-semibold text-zinc-900 dark:text-zinc-100',
          className
        )}
      >
        {name}
      </p>
    </div>
  )
}

export default Avatar
