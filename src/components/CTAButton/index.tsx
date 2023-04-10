'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Chevron from '../Icons/Chevron'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTAButton({
  text,
  onClick,
  href,
  className,
}: {
  text: string
  href?: string
  onClick?: () => void
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const css = twMerge(
    'hover:bg-brand-green text-left w-full p-4 grid grid-cols-[1fr_auto] border-b border-b-black',
    className
  )
  const content = (
    <>
      <span>{text}</span>
      <Chevron />
    </>
  )
  if (href) {
    return (
      <Link
        href={href}
        className={css}
        ref={ref}
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s',
        }}
      >
        {content}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={css}>
      {content}
    </button>
  )
}
