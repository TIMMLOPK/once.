import { cn } from '@/lib/cn'
import { Loading } from './loading'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  loading?: boolean
  disabled?: boolean
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow transition duration-200 ease-in',
        'hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200',
        props.loading ? 'cursor-not-allowed' : '',
        props.disabled ? 'cursor-not-allowed' : '',
        props.className
      )}
      onClick={props.onClick}
      type="button"
      disabled={props.className?.includes('disabled') || props.loading}
    >
      {props.loading ? (
        <span className="flex items-center">
          <Loading className="mr-2 h-4 w-4" />
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </button>
  )
}
