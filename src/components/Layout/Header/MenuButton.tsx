import { useState } from 'react'

export default function MenuButton({
  onClick,
  active,
}: {
  onClick: () => void
  active?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const css =
    active || hovered
      ? '[background-position:100%_100%] [background-size:100%_2px] text-brand-navy'
      : '[background-position:0_100%] [background-size:0%_2px]'
  return (
    <button
      className={`h-min w-min [background-image:linear-gradient(#020121_0_0)] [transition:background-size_0.3s,background-position_0s_0.3s] [background-repeat:no-repeat] ${css}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Menu
    </button>
  )
}
