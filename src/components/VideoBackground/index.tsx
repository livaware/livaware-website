import { ReactNode } from 'react'

export default function VideoBackground({
  url,
  children,
}: {
  url: string
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen w-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover"
      >
        <source src={url} type="video/mp4" />
      </video>
      {children}
    </div>
  )
}
