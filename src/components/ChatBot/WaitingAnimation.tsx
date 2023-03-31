import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

function AnimatedDot({ index, variant }: { index: number; variant?: string }) {
  const colour = variant === 'white' ? 'bg-white' : 'bg-brand-green'
  return (
    <motion.div
      className={twMerge('h-2 w-2 rounded-full', colour)}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        delay: index * 0.2,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1.5,
        duration: 0.5,
      }}
    />
  )
}

export default function WaitingAnimation({ variant }: { variant?: string }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      <AnimatedDot index={0} variant={variant} />
      <AnimatedDot index={1} variant={variant} />
      <AnimatedDot index={2} variant={variant} />
    </div>
  )
}
