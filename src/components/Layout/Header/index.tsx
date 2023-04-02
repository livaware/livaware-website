import { ReactNode, useEffect, useRef, useState } from 'react'
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

  // This code sets the height of the SessionView component to the height of the
  // visual viewport. A resize handler is set on the resize event of the
  // visual viewport, and the height of the SessionView component is set to the
  // height of the visual viewport
  // it fixes a viewport height issue on mobile devices
  useEffect(() => {
    if (window.visualViewport) {
      const resizeHandler = () => {
        const eles = document.getElementsByClassName('SessionView')
        eles
          .item(0)
          ?.setAttribute('style', `height: ${window.visualViewport?.height}px`)
        document
          .getElementsByTagName('html')[0]
          .setAttribute('style', `height: ${window.visualViewport?.height}px`)
      }

      window.visualViewport?.addEventListener('resize', resizeHandler)

      return () => {
        window.visualViewport?.removeEventListener('resize', resizeHandler)
      }
    }
  }, [])

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
