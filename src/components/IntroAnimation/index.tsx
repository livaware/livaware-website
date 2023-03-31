import splitCharacters from '@/lib/splitCharacters'
import { stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'
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
        className="opacity-1 fixed top-0 left-0 z-50 h-screen w-screen bg-brand-navy"
      >
        <div
          id="logo"
          className="grid h-full w-full items-center justify-center opacity-0"
        >
          <Logo variant="white" />
        </div>
        <div
          id="letterContainer"
          className="grid h-full w-full items-center justify-center text-xl text-white"
        >
          <div className="relative">
            <div id="letters" className="">
              {...splitCharacters('Your Personal Healthcare Team')}
            </div>
            <span
              id="underline"
              className="absolute top-0 left-0 origin-left scale-x-0 border-b border-b-white text-brand-navy [z-index:-1]"
            >
              Your
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
