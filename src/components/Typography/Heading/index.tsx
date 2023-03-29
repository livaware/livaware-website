import { ElementType, ReactNode } from 'react'

interface headingVariantConfig {
  element: ElementType
  tailwindStyle: string
}

const headingVariant: Record<string, headingVariantConfig> = {
  h1: {
    element: 'h1',
    tailwindStyle: 'text-4xl leading-10 py-5 my-6 font-bold',
  },
  h2: {
    element: 'h2',
    tailwindStyle: 'text-xl leading-7 pt-5 pb-2.5 my-4 font-bold',
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
    <props.element className={`${props.tailwindStyle} ${className}`}>
      {children}
    </props.element>
  )
}
