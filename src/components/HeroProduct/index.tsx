import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { ReactNode } from 'react'
import CTAButton from '../CTAButton'
import Heading from '../Typography/Heading'

export default function HeroProduct({
  topText,
  mainText,
  content,
  backgroundColor,
  imageUrl,
  cta,
}: {
  topText?: string
  mainText?: string
  content?: ReactNode
  imageUrl?: string
  backgroundColor?: string
  cta?: {
    title: string
    url: string
  }
}) {
  return (
    <div className="relative grid min-h-screen-minus-header grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
      <div
        className="hidden bg-cover md:block"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div
        className=" grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] p-10 text-white"
        style={{
          backgroundColor,
        }}
      >
        <span className="text-lg font-light">{topText}</span>
        <Heading variant="h1" className="pt-20 pb-11">
          {mainText}
        </Heading>
        <div>{content}</div>
        {cta && <CTAButton text={cta.title} href={cta.url} />}
      </div>
    </div>
  )
}
