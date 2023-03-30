import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ExpandingVideo() {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <motion.button
        layoutId="top-video"
        className="w-full aspect-video grid items-center justify-center text-white text-4xl bg-black"
        onClick={() => setExpanded(true)}
      >
        <span>VIDEO</span>
      </motion.button>
      {expanded && (
        <motion.div
          layoutId="top-video"
          className="fixed top-0 left-0 bg-black w-screen h-screen z-50"
          onClick={() => setExpanded(false)}
        >
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </motion.div>
      )}
    </>
  )
}
