import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import MenuLink from './MenuLink'

function Overlay({
  children,
  open,
  onClick,
}: {
  children: ReactNode
  open?: boolean
  onClick?: () => void
}) {
  return (
    <motion.div
      animate={{
        backgroundColor: `rgba(0,0,0,${open ? 0.8 : 0})`,
      }}
      initial={{
        backgroundColor: `rgba(0,0,0,0)`,
      }}
      transition={{
        type: 'tween',
      }}
      className={`fixed inset-0 z-10 bg-black`}
      style={{
        pointerEvents: open ? 'auto' : 'none',
      }}
      onClick={(e) => {
        onClick?.()
        e.preventDefault()
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Menu({
  open,
  headerHeight,
  onClose,
}: {
  open?: boolean
  headerHeight: number
  onClose?: () => void
}) {
  return (
    <Overlay open={open} onClick={onClose}>
      <motion.div
        animate={{
          x: open ? 0 : '-100%',
        }}
        initial={{
          x: '-100%',
        }}
        transition={{
          type: 'tween',
        }}
        className="h-screen w-screen max-w-md bg-bg-light-primary"
        style={{ marginTop: headerHeight }}
      >
        <div className="grid grid-cols-1 items-start gap-4 p-4">
          <MenuLink href="/">Home</MenuLink>
          <MenuLink href="/resources">Resources</MenuLink>
        </div>
      </motion.div>
    </Overlay>
  )
}
