'use client'
import { useState } from 'react'

export default function Accordion({
  title,
  items,
  backgroundColor,
}: {
  title?: string
  items: { title: string; content: string }[]
  backgroundColor?: string
}) {
  const [openItems, setOpenItems] = useState<number[]>([])
  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index))
    } else {
      setOpenItems([...openItems, index])
    }
  }
  return (
    <div
      className="grid w-full justify-items-center p-10 text-white"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {title && <div className="mb-20 text-center text-2xl">{title}</div>}
      <div className="w-full max-w-3xl">
        {items.map((item, index) => (
          <div key={index} className="mt-4 border-t border-white">
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleItem(index)}
            >
              <div className="text-xl font-bold">{item.title}</div>
              <div className="text-2xl">
                {openItems.includes(index) ? '-' : '+'}
              </div>
            </div>
            {openItems.includes(index) && (
              <div className="mt-2">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
