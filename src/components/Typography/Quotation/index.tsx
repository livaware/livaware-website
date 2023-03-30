export function QuoteMark({ close }: { close?: boolean }) {
  const char = close ? '”' : '“'
  return <span className="text-3xl [line-height:0.2]">{char}</span>
}

export default function Quotation({
  text,
  cite,
  className,
}: {
  text: string
  cite?: string
  className?: string
}) {
  return (
    <blockquote className={`italic ${className}`}>
      <QuoteMark />
      <span className="px-1 [line-height:1.5]">{text}</span>
      <QuoteMark close />
      {cite && (
        <cite className="block mt-2 font-bold text-brand-green">— {cite}</cite>
      )}
    </blockquote>
  )
}
