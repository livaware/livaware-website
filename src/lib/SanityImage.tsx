import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import sanityClient from './sanityClient'

export default function SanityImage({
  value,
  className,
  maintainAspect,
}: {
  value: any
  className?: string
  maintainAspect?: boolean
}) {
  const { width, height } = useMemo(() => getImageDimensions(value), [value])
  const img = useMemo(
    () =>
      urlBuilder(sanityClient)
        .image(value)
        .width(1920)
        .fit('max')
        .auto('format')
        .url(),
    [value]
  )

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img}
      alt={value.alt ?? ''}
      loading="lazy"
      className={twMerge('h-full w-full object-cover', className)}
      style={{
        aspectRatio: maintainAspect ? width / height : undefined,
      }}
    />
  )
}
