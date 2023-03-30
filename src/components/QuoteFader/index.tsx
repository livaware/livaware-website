import Quote from '@/lib/sanityTypes/quote'
import splitCharacters from '@/lib/splitCharacters'
import { stagger, useAnimate } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { QuoteMark } from '../Typography/Quotation'

const HOLD_TIME = 10000

export default function QuoteFader({
  quotes,
  className,
}: {
  quotes: Quote[]
  className?: string
}) {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [scope, animate] = useAnimate()
  const [complete, setComplete] = useState(false)

  const clearAnimation = useCallback(async () => {
    try {
      await animate('#quote > span', { opacity: 0 }, { duration: 0.3 })
      await animate('#m1, #m2', { opacity: 0 }, { duration: 0.3 })
      await animate('#cite', { opacity: 0 }, { duration: 0.3 })
    } catch {}
  }, [animate])

  const playAnimation = useCallback(async () => {
    try {
      await animate('#m1', { opacity: 1 }, { duration: 0.1 })
      await animate(
        '#quote > span',
        { opacity: 1 },
        { duration: 0.1, delay: stagger(0.005) }
      )
      await animate('#m2', { opacity: 1 }, { duration: 0.1 })
      await animate(
        '#cite',
        {
          opacity: 1,
        },
        { duration: 0.5 }
      )
    } catch {}
    setComplete(true)
  }, [animate])

  const advance = useCallback(() => {
    const next = currentQuote + 1
    if (next === quotes.length) {
      setCurrentQuote(0)
    } else {
      setCurrentQuote(next)
    }
  }, [currentQuote, quotes.length])

  useEffect(() => {
    playAnimation()
  }, [currentQuote, playAnimation])

  useEffect(() => {
    const interval = 0
    if (complete) {
      setTimeout(async () => {
        await clearAnimation()
        setComplete(false)
        advance()
      }, HOLD_TIME)
    }
    return () => clearTimeout(interval)
  }, [advance, clearAnimation, complete])

  const quote = quotes[currentQuote]

  return (
    <blockquote className={`italic ${className}`} ref={scope}>
      <span id="m1" className="opacity-0">
        <QuoteMark />
      </span>
      <span className="px-1 [line-height:1.5]" id="quote">
        {...splitCharacters(quote.text)}
      </span>
      <span id="m2" className="opacity-0">
        <QuoteMark close />
      </span>
      <cite
        className="block mt-2 font-bold text-brand-green opacity-0"
        id="cite"
      >
        — {quote.cite}
      </cite>
    </blockquote>
  )
}
