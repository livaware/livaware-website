import useIsMobile from '@/lib/useIsMobile'
import { ReactNode, useMemo } from 'react'

export default function VideoBackground({
  url,
  mobileUrl,
  children,
}: {
  url: string
  mobileUrl?: string
  children: ReactNode
}) {
  const isMobile = useIsMobile()

  const videoUrl = useMemo(
    () => (isMobile ? mobileUrl : url),
    [isMobile, url, mobileUrl]
  )

  return (
    <div className="min-screen-minus-header relative w-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-[var(--headerHeight)] left-0 -z-10 h-screen-minus-header w-screen object-cover"
        key={`video-bg-${videoUrl}`}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {children}
    </div>
  )
}
