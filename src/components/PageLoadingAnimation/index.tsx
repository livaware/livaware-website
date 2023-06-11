import { useAnimate } from 'framer-motion'
import { Logo } from 'livaware-react-components'
import { useEffect } from 'react'

export default function PageLoadingAnimation({
  loading,
  onLoadingComplete,
}: {
  loading: boolean
  onLoadingComplete?: () => void
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const startLoading = async () => {
      try {
        await animate(
          '#container',
          { display: 'block', opacity: 1 },
          { duration: 0 }
        )
        await animate('#logo', { opacity: 1 }, { duration: 1 })
      } catch {}
    }
    const stopLoading = async () => {
      try {
        await animate('#logo, #container', { opacity: 0 }, { duration: 0.2 })
        await animate('#container', { display: 'none' }, { duration: 0 })
        onLoadingComplete?.()
      } catch {}
    }

    loading ? startLoading() : stopLoading()
  }, [animate, loading, onLoadingComplete])

  return (
    <div ref={scope}>
      <div
        id="container"
        className="fixed top-[var(--headerHeight)] left-0 h-screen w-screen bg-brand-navy opacity-0"
      >
        <div
          id="logo"
          className="grid h-full w-full items-center justify-center"
        >
          <div id="spinner" className="svgSpinner relative">
            <Logo variant="white" />
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0"
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                style={{ top: -4, left: -4 }}
                className="stroke-brand-navy"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
