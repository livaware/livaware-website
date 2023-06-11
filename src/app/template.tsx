'use client'

import PageLoadingAnimation from '@/components/PageLoadingAnimation'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const MIN_ANIMATE_TIME = 1000

export default function Template({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  loading,
}: {
  children: React.ReactNode
  loading: boolean
}) {
  const animationStartTime = useRef<Date>(new Date())
  const [internalLoading, setInternalLoading] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (animationStartTime) {
        const timeDiff =
          new Date().getTime() - animationStartTime.current.getTime()
        console.log(timeDiff)
        if (timeDiff < MIN_ANIMATE_TIME) {
          setTimeout(() => {
            setInternalLoading(false)
          }, MIN_ANIMATE_TIME - timeDiff)
        } else {
          setInternalLoading(false)
        }
      }
    } else {
      setInternalLoading(true)
      animationStartTime.current = new Date()
    }
  }, [loading, animationStartTime])

  return (
    <div className="relative -z-20 bg-brand-navy" id="cont">
      <PageLoadingAnimation loading={internalLoading} />
      <motion.div
        style={{ height: '100%' }}
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: internalLoading ? 300 : 0,
          opacity: internalLoading ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
