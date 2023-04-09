import { ReactNode } from 'react'

export default function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="m-10 grid grid-flow-row gap-4 md:auto-cols-fr md:grid-flow-col">
      {children}
    </div>
  )
}
