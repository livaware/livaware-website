import Link from 'next/link'
import { ReactNode } from 'react'

export default function MenuLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link href={href} className="block text-lg">
      {children}
    </Link>
  )
}
