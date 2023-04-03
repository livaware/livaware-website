import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function FormError({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={twMerge('mt-2 text-sm text-red-600', className)}>
      {children}
    </div>
  )
}
