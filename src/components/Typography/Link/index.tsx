import Link from 'next/link'
import { ReactNode } from 'react'

export default function TextLink({
  url,
  children,
}: {
  url: string
  children: ReactNode
}) {
  return (
    <Link className="underline" href={url}>
      {children}
    </Link>
  )
}
