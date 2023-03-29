import { ReactNode } from 'react'

export default function ContentContainer({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="grid grid-cols-1 w-full justify-items-center">
      <div className="w-full max-w-site-width">{children}</div>
    </main>
  )
}
