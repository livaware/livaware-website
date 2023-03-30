import splitCharacters from '@/lib/splitCharacters'
import { motionValue, stagger, useAnimate } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import Logo from '../Logo'

export default function IntroAnimation() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const playAnimation = async () => {
      await animate('#logo', { opacity: 1 }, { duration: 1 })
      await animate('#logo', { opacity: 0 }, { duration: 1 })
      await animate('#logo', { display: 'none' }, { duration: 0 })
      await animate(
        '#letters > span',
        { opacity: 1 },
        { duration: 0.1, delay: stagger(0.025) }
      )
      await animate('#underline', { scaleX: 0 }, { duration: 0 })
      await animate('#underline', { scaleX: 1 }, { duration: 1 })
      await animate('#container', { opacity: 0 }, { duration: 1, delay: 0.5 })
      await animate('#container', { display: 'none' }, { duration: 0 })
    }

    playAnimation()
  }, [animate])

  return (
    <div ref={scope}>
      <div
        id="container"
        className="w-screen h-screen z-50 fixed top-0 left-0 bg-brand-navy opacity-1"
      >
        <div
          id="logo"
          className="opacity-0 w-full h-full grid items-center justify-center"
        >
          <Logo variant="white" />
        </div>
        <div
          id="letterContainer"
          className="w-full h-full grid items-center justify-center text-white text-xl"
        >
          <div className="relative">
            <div id="letters" className="">
              {...splitCharacters('Your Personal Healthcare Team')}
            </div>
            <span
              id="underline"
              className="absolute top-0 left-0 origin-left scale-x-0 text-brand-navy border-b-white border-b [z-index:-1]"
            >
              Your
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
