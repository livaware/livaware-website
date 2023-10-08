'use client'

import PageLoadingAnimation from '@/components/PageLoadingAnimation'
import { motion, useAnimate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const MIN_ANIMATE_TIME = 1500
const ANIMATE_EXIT_DURATION = 0.5
const ANIMATE_ENTER_DURATION = 1

export default function Template({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  loading,
}: {
  children: React.ReactNode
  loading?: boolean
}) {
  const animationStartTime = useRef<Date>(new Date())
  const [internalLoading, setInternalLoading] = useState(false)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (loading === undefined) {
      return
    }

    const animateEntry = async () => {
      await animate(
        scope.current,
        {
          y: 100,
          x: 0,
          opacity: 0,
        },
        { duration: 0 }
      )
      await animate(
        scope.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
        },
        { duration: ANIMATE_ENTER_DURATION, ease: 'easeOut' }
      )
    }

    const animateExit = async () => {
      await animate(
        scope.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
        },
        { duration: 0 }
      )
      await animate(
        scope.current,
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        { duration: ANIMATE_EXIT_DURATION }
      )
    }

    if (internalLoading) {
      animateExit()
    } else {
      animateEntry()
    }
  }, [internalLoading, loading, animate, scope])

  useEffect(() => {
    if (loading === undefined) {
      return
    }

    if (!loading) {
      if (animationStartTime) {
        const timeDiff =
          new Date().getTime() - animationStartTime.current.getTime()
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
    <div>
      <PageLoadingAnimation loading={internalLoading} />
      <motion.div ref={scope} style={{ height: '100%' }}>
        {children}
      </motion.div>
    </div>
  )
}
