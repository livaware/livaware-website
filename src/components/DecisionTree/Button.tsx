import Link from 'next/link'
import Chevron from '../Icons/Chevron'

export default function DecisionTreeButton({
  text,
  onClick,
  href,
}: {
  text: string
  href?: string
  onClick?: () => void
}) {
  const css =
    'text-white bg-brand-navy hover:bg-brand-green text-left w-full p-4 rounded-sm grid grid-cols-[1fr_auto]'
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
