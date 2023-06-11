'use client'

import PageLoadingAnimation from '@/components/PageLoadingAnimation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Template({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  loading,
}: {
  children: React.ReactNode
  loading: boolean
}) {
  return (
    <>
      <PageLoadingAnimation loading={loading} />
      <motion.div
        style={{ height: '100%' }}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: loading ? 300 : 0, opacity: loading ? 0 : 1 }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
