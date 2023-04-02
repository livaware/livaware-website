import { useEffect, useRef, useState } from 'react'
import LogoType from '../../LogoType'
import Menu from '../Menu'
import MenuButton from './MenuButton'

const HEADER_HEIGHT = 76

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const height = menuRef.current?.clientHeight ?? HEADER_HEIGHT
    setHeaderHeight(height)
    const doc = document.querySelector<HTMLBodyElement>(':root')
    doc?.style.setProperty('--headerHeight', `${height}px`)
  }, [menuRef.current?.clientHeight])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        headerHeight={headerHeight}
      />
      <div
        ref={menuRef}
        className="fixed z-20 grid w-screen justify-items-center [background-color:rgba(255,255,255,0.9)] [backdrop-filter:blur(10px)]"
      >
        <div className="grid w-full grid-cols-[auto_1fr] items-center px-2 md:grid-cols-3 md:px-8">
          <MenuButton onClick={toggleMenu} active={menuOpen} />
          <div className="grid items-center justify-items-end py-4 md:justify-items-center">
            <LogoType variant="navy" onClick={toggleMenu} />
          </div>
        </div>
      </div>
      <div style={{ height: headerHeight }} />
    </>
  )
}
