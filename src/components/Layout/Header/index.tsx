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
        <div className="grid grid-cols-[4rem_auto_4rem] items-center md:grid-cols-3 max-w-site-width w-full px-8">
          <MenuButton onClick={toggleMenu} />
          <div className="py-4 grid justify-items-center items-center">
            <LogoType variant="navy" onClick={toggleMenu} />
          </div>
          <div className="hidden md:grid grid-cols-2">
            {/* <HeaderButton>Contact</HeaderButton>
            <HeaderButton green>How can we help?</HeaderButton> */}
          </div>
        </div>
      </div>
      <div style={{ height: menuHeight }} />
    </>
  )
}
