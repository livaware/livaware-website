import { ReactNode } from 'react'
import CTAButton from '../CTAButton'
import Heading from '../Typography/Heading'

export default function Column({
  title,
  content,
  cta,
  number,
}: {
  title?: string
  content: ReactNode
  cta?: {
    title: string
    url: string
  }
  number?: string
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-[8rem_1fr_auto] border-l border-black p-4">
      <div>
        {number && <span className="">{number}</span>}
        {title && (
          <Heading variant="h2" className="py-5 font-bold">
            {title}
          </Heading>
        )}
      </div>
      <div>{content}</div>
      {cta && <CTAButton className="mt-4" text={cta.title} href={cta.url} />}
    </div>
  )
}
