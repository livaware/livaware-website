import { ReactNode } from 'react'

export default function VideoBackground({
  url,
  children,
}: {
  url: string
  children: ReactNode
}) {
  return (
    <div className="min-screen-minus-header relative w-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-[var(--headerHeight)] left-0 -z-10 h-screen-minus-header w-screen object-cover"
      >
        <source src={url} type="video/mp4" />
      </video>
      {children}
    </div>
  )
}
