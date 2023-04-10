import { ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
interface headingVariantConfig {
  element: ElementType
  tailwindStyle: string
}

const headingVariant: Record<string, headingVariantConfig> = {
  h1: {
    element: 'h1',
    tailwindStyle: 'font-light text-3xl leading-8 py-5',
  },
  h2: {
    element: 'h2',
    tailwindStyle: 'font-light text-2xl leading-7',
  },
  h3: {
    element: 'h3',
    tailwindStyle: 'text-xl leading-7 [&:not(:first-child)]:mt-4 font-light',
  },
  h4: {
    element: 'h4',
    tailwindStyle: 'text-xl leading-7 [&:not(:first-child)]:mt-4 font-bold',
  },
}

export default function Heading({
  variant,
  children,
  className,
}: {
  variant: keyof typeof headingVariant
  children: ReactNode
  className?: string
}) {
  const props = headingVariant[variant]
  return (
    <props.element className={twMerge(props.tailwindStyle, className)}>
      {children}
    </props.element>
  )
}
