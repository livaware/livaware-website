import { twMerge } from 'tailwind-merge'

export default function Chevron({
  className,
  reverse,
}: {
  className?: string
  reverse?: boolean
}) {
  return (
    <span
      className={twMerge(
        'inline-block text-lg',
        reverse ? '-scale-x-100' : '',
        className
      )}
    >
      ➔
    </span>
  )
}
