import { ReactNode, useEffect, useRef, useState } from 'react'
import LogoType from '../../LogoType'
import Menu from '../Menu'

function HeaderButton({
  green,
  children,
}: {
  green?: boolean
  children: ReactNode
}) {
  const colours = green ? 'bg-brand-green text-white' : ''

  return (
    <div className={`grid justify-center items-center text-lg ${colours}`}>
      <span className="py-6">{children}</span>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMenuHeight(menuRef.current?.clientHeight ?? 0)
  }, [])

  return (
    <>
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        headerHeight={menuHeight}
      />
      <div
        ref={menuRef}
        className="fixed w-screen bg-bg-light-primary grid justify-items-center z-20"
      >
        <div className="grid grid-cols-[4rem_auto_4rem] md:grid-cols-3 max-w-site-width w-full">
          <div className="w-1" onClick={() => setMenuOpen(!menuOpen)}>
            Menu
          </div>
          <div className="py-4 grid justify-items-center items-center">
            <LogoType variant="navy" />
          </div>
          <div className="hidden md:grid grid-cols-2">
            <HeaderButton>Contact</HeaderButton>
            <HeaderButton green>How can we help?</HeaderButton>
          </div>
        </div>
      </div>
      <div style={{ height: menuHeight }} />
    </>
  )
}
