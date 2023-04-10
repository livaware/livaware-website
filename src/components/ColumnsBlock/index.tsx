'use client'

import PortableTextRenderer from '@/lib/PortableTextRenderer'
import useIsMobile from '@/lib/useIsMobile'
import { twMerge } from 'tailwind-merge'
import CTAButton from '../CTAButton'

export default function ColumnsBlock({
  leftContent,
  rightContent,
  cta,
}: {
  leftContent: any
  rightContent: any
  cta?: {
    title: string
    url: string
  }
}) {
  const isMobile = useIsMobile()
  const leftContentHasImage = JSON.stringify(leftContent).includes('image')
  const rightContentHasImage = JSON.stringify(rightContent).includes('image')
  const leftComponents = (
    <div
      className={twMerge(
        'relative',
        leftContentHasImage ? '' : 'bg-brand-light-blue p-4 md:p-10'
      )}
    >
      {leftContentHasImage ? (
        <PortableTextRenderer content={leftContent} />
      ) : (
        <div className="flex h-full flex-shrink flex-col justify-between">
          <div>
            <PortableTextRenderer content={leftContent} />
          </div>
          {!leftContentHasImage && cta && (
            <CTAButton text={cta.title} href={cta.url} />
          )}
        </div>
      )}
    </div>
  )
  const rightComponents = (
    <div
      className={twMerge(
        'relative',
        rightContentHasImage ? '' : 'bg-brand-light-blue p-4 md:p-10'
      )}
    >
      {rightContentHasImage ? (
        <PortableTextRenderer content={rightContent} />
      ) : (
        <div className="flex h-full flex-shrink flex-col justify-between">
          <div>
            <PortableTextRenderer content={rightContent} />
          </div>
          {cta && <CTAButton text={cta.title} href={cta.url} />}
        </div>
      )}
    </div>
  )
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {isMobile && rightContentHasImage ? (
        <>
          {rightComponents}
          {leftComponents}
        </>
      ) : (
        <>
          {leftComponents}
          {rightComponents}
        </>
      )}
    </div>
  )
}
