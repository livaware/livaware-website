import { twMerge } from 'tailwind-merge'

export default function Chevron({ className }: { className?: string }) {
  return <span className={twMerge('text-lg', className)}>➔</span>
}
