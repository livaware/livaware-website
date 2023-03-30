'use client'

import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Template({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
      key={`p-${path}`}
    >
      <motion.div
        key={`t-${path}`}
        style={{ height: '100%' }}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
