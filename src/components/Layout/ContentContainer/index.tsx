import { ReactNode } from 'react'

export default function ContentContainer({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="grid w-full grid-cols-1 justify-items-center">
      <div className="w-full max-w-site-width px-4">{children}</div>
    </main>
  )
}
