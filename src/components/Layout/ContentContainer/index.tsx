import { ReactNode } from 'react'

export default function ContentContainer({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="grid justify-center w-full">
      <div className="max-w-site-width">{children}</div>
    </main>
  )
}
