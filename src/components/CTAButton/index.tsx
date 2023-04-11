import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Chevron from '../Icons/Chevron'

export default function CTAButton({
  text,
  onClick,
  href,
  className,
}: {
  text: string
  href?: string
  onClick?: () => void
  className?: string
}) {
  const css = twMerge(
    'hover:bg-brand-green text-left w-full p-4 grid grid-cols-[1fr_auto] border-b border-b-black',
    className
  )
  const content = (
    <>
      <span>{text}</span>
      <Chevron />
    </>
  )
  if (href) {
    return (
      <Link href={href} className={css}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={css}>
      {content}
    </button>
  )
}
