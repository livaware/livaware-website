import SplitCharacters from '@/lib/splitCharacters'
import { stagger, useAnimate } from 'framer-motion'
import { Logo, VideoBackground } from 'livaware-react-components'
import { useEffect } from 'react'

export default function Intro() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const playAnimation = async () => {
      try {
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
        await animate(
          '#background',
          { opacity: 0 },
          { duration: 1, delay: 0.5 }
        )
      } catch {}
    }

    playAnimation()
  }, [animate])

  return (
    <VideoBackground
      url="/video/website-hero-desktop.mp4"
      mobileUrl="/video/website-hero-mobile.mp4"
    >
      <div
        className="relative h-screen-minus-header w-screen [font-size:min(3rem,6vw)]"
        ref={scope}
      >
        <div
          id="background"
          className="opacity-1 absolute top-0 left-0 h-screen w-screen bg-brand-navy"
          role="none"
        />
        <div
          id="gradient"
          className="absolute bottom-0 left-0 h-[50vh] w-screen bg-gradient-to-t from-brand-navy opacity-90"
          role="none"
        />
        <div
          id="logo"
          className="absolute top-0 left-0 grid h-full w-full items-center justify-center opacity-0"
          role="none"
        >
          <Logo variant="white" />
        </div>
        <div
          id="letterContainer"
          className="absolute top-0 left-0 grid h-full w-full items-end justify-center pb-12 text-white"
        >
          <div className="relative">
            <div
              id="letters"
              className="relative z-[11]"
              role="heading"
              aria-level={1}
            >
              <SplitCharacters input="Your Personal Healthcare Team" />
            </div>
            <span
              id="underline"
              role="none"
              className="absolute top-0 left-0 z-10 origin-left scale-x-0 border-b border-b-white text-brand-navy"
            >
              Your
            </span>
          </div>
        </div>
      </div>
    </VideoBackground>
  )
}
