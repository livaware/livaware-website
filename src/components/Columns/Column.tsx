import { ReactNode } from 'react'
import CTAButton from '../CTAButton'
import Heading from '../Typography/Heading'

export default function Column({
  title,
  content,
  cta,
}: {
  title?: string
  content: ReactNode
  cta?: {
    title: string
    url: string
  }
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      {title && <Heading variant="h1">{title}</Heading>}
      <div>{content}</div>
      {cta && <CTAButton className="mt-4" text={cta.title} href={cta.url} />}
    </div>
  )
}
