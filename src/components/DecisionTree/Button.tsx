import Link from 'next/link'

function Chevron() {
  return <span className="text-lg">➔</span>
}

export default function DecisionTreeButton({
  text,
  onClick,
  href,
}: {
  text: string
  href?: string
  onClick?: () => void
}) {
  const Element = onClick ? 'button' : Link
  return (
    <Element
      className="text-white bg-bg-dark hover:bg-brand-green text-left w-full p-4 border-white border-solid border rounded-sm grid grid-cols-[1fr_auto]"
      onClick={onClick}
      href={href ?? ''}
    >
      <span>{text}</span>
      <Chevron />
    </Element>
  )
}
