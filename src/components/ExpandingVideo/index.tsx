import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ExpandingVideo() {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <motion.button
        layoutId="top-video"
        className="grid aspect-video w-full items-center justify-center bg-black text-4xl text-white"
        onClick={() => setExpanded(true)}
      >
        <span>VIDEO</span>
      </motion.button>
      {expanded && (
        <motion.div
          layoutId="top-video"
          className="fixed top-0 left-0 z-50 h-screen w-screen bg-black"
          onClick={() => setExpanded(false)}
        >
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </motion.div>
      )}
    </>
  )
}
