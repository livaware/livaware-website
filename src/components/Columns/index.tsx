import { ReactNode } from 'react'
import Heading from '../Typography/Heading'

export default function Columns({
  title,
  children,
  backgroundColor,
}: {
  title?: string
  children: ReactNode
  backgroundColor?: string
}) {
  return (
    <div
      className="py-10"
      style={{
        backgroundColor,
      }}
    >
      {title && (
        <Heading variant="h3" className="mx-10 mb-40">
          {title}
        </Heading>
      )}
      <div className="m-10 grid grid-flow-row gap-4 lg:auto-cols-fr lg:grid-flow-col">
        {children}
      </div>
    </div>
  )
}
