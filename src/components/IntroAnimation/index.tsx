import SplitCharacters from '@/lib/splitCharacters'
import { stagger, useAnimate } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function IntroAnimation() {
  const [scope, animate] = useAnimate()
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    const playAnimation = async () => {
      try {
        // await animate('#logo', { opacity: 1 }, { duration: 1 })
        // await animate('#logo', { opacity: 0 }, { duration: 1 })
        // await animate('#logo', { display: 'none' }, { duration: 0 })
        await animate(
          '#letters > span',
          { opacity: 1 },
          { duration: 0.1, delay: stagger(0.025) }
        )
        await animate('#underline', { scaleX: 0 }, { duration: 0 })
        await animate('#underline', { scaleX: 1 }, { duration: 1 })
        await animate(
          '#container, #skip',
          { opacity: 0 },
          { duration: 1, delay: 0.5 }
        )
        await animate('#container, #skip', { display: 'none' }, { duration: 0 })
      } catch {}
    }

    playAnimation()
  }, [animate])

  if (cancelled) {
    return null
  }

  return (
    <div ref={scope}>
      <div
        id="container"
        className="opacity-1 fixed top-0 left-0 z-50 h-screen w-screen bg-brand-navy"
      >
        {/* <div
          id="logo"
          className="grid h-full w-full items-center justify-center opacity-0"
        >
          <Logo variant="white" />
        </div> */}
        <div
          id="letterContainer"
          className="grid h-full w-full items-center justify-center text-xl text-white"
        >
          <div className="relative">
            <div id="letters" className="">
              <SplitCharacters input="Your Personal Healthcare Team" />
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
      <button
        id="skip"
        type="button"
        className="fixed bottom-0 right-0 z-50 m-5 text-white"
        onClick={() => setCancelled(true)}
      >
        Skip ➔
      </button>
    </div>
  )
}
