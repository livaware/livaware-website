import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function ContentToggler({
  initialContent,
  activeContent,
  active,
}: {
  initialContent: ReactNode
  activeContent: ReactNode
  active?: boolean
}) {
  return (
    <AnimatePresence mode="wait">
      {active ? (
        <motion.div
          key="active"
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -32, opacity: 0 }}
        >
          {activeContent}
        </motion.div>
      ) : (
        <motion.div
          key="initial"
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -32, opacity: 0 }}
        >
          {initialContent}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
