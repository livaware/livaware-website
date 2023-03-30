import { ReactNode, useEffect, useRef, useState } from 'react'
import LogoType from '../../LogoType'
import Menu from '../Menu'
import MenuButton from './MenuButton'

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

const MENU_HEIGHT = 76

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(MENU_HEIGHT)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMenuHeight(menuRef.current?.clientHeight ?? MENU_HEIGHT)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        headerHeight={menuHeight}
      />
      <div
        ref={menuRef}
        className="fixed w-screen [background-color:rgba(255,255,255,0.9)] [backdrop-filter:blur(10px)] grid justify-items-center z-20"
      >
        <div className="grid grid-cols-[auto_1fr] items-center md:grid-cols-3 w-full px-2 md:px-8">
          <MenuButton onClick={toggleMenu} active={menuOpen} />
          <div className="py-4 grid justify-items-end md:justify-items-center items-center">
            <LogoType variant="navy" onClick={toggleMenu} />
          </div>
        </div>
      </div>
      <div style={{ height: menuHeight }} />
    </>
  )
}
