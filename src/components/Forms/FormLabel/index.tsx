import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function FormLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <label
      className={twMerge('block text-sm font-bold text-brand-navy', className)}
    >
      {children}
    </label>
  )
}
