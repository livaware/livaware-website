import { useScroll, useTransform, motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

export default function ScrollFader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
