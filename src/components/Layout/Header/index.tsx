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

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <a
      className="w-min h-min [background-image:linear-gradient(#020121_0_0)] [background-position:0_100%] [background-size:0%_2px] [transition:background-size_0.3s,background-position_0s_0.3s] [background-repeat:no-repeat] hover:[background-position:100%_100%] hover:[background-size:100%_2px] hover:text-bg-dark"
      onClick={onClick}
    >
      Menu
    </a>
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

  return (
    <>
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        headerHeight={menuHeight}
      />
      <div
        ref={menuRef}
        className="fixed w-screen bg-white grid justify-items-center z-20"
      >
        <div className="grid grid-cols-[4rem_auto_4rem] items-center md:grid-cols-3 max-w-site-width w-full px-8">
          <MenuButton onClick={() => setMenuOpen(!menuOpen)} />
          <div className="py-4 grid justify-items-center items-center">
            <LogoType variant="navy" />
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
